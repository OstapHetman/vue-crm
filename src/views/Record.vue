<template>
  <div>
    <div class="page-title">
      <h3>Добавити запис</h3>
    </div>
    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      Категорій не знайдено!
      <router-link to="/categories">Добавити категорію</router-link>
    </p>

    <form @submit.prevent="onSubmit" v-else class="form">
      <div class="input-field">
        <select ref="cat" v-model="category">
          <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.title }}</option>
        </select>
        <label>Виберіть категорію</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" v-model="type" value="income" />
          <span>Дохід</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" v-model="type" value="outcome" />
          <span>Витрати</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        />
        <label for="amount">Сума</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
        >Мінімальне значення {{ $v.limit.$params.minValue.min }} грн</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        />
        <label for="description">Опис</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
        >Поле є обов"язковим</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Добавити
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  name: "record",
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: "outcome",
    amount: 15,
    description: ""
  }),
  validations: {
    amount: { minValue: minValue(15) },
    description: { required }
  },
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }

      return this.info.bill >= this.amount;
    }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        if (this.canCreateRecord) {
          await this.$store.dispatch("createRecord", {
            catId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          });
          const bill =
            this.type === "income"
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;
          await this.$store.dispatch("updateInfo", { bill });
          this.$message("Новий запис добавлено");
          this.$v.$reset();
          this.amount = 15;
          this.description = "";
        } else {
          this.$message(
            `Недостатньо коштів на рахунку (${this.amount -
              this.info.bill} грн)`
          );
        }
      } catch (e) {}
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.cat);
      M.updateTextFields();
    }, 0);
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
};
</script>
