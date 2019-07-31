<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Добавити категорію</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          />
          <label for="name">Назва категорії</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >Поле є обов"язковим</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          />
          <label for="limit">Ліміт</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >Мінімальне значення {{ $v.limit.$params.minValue.min }} грн</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Добавити
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";

export default {
  data: () => ({
    title: "",
    limit: 15
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(15) }
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const cat = await this.$store.dispatch("createCategory", {
          title: this.title,
          limit: this.limit
        });
        this.$message("Категорія успішно добавлена");
        this.title = "";
        this.limit = 15;
        this.$v.reset();
        this.$emit("created", cat);
      } catch (e) {}
    }
  }
};
</script>

