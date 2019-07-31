<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">Історія</router-link>
        <a class="breadcrumb" @click.prevent>{{ record.type === 'income' ? 'Дохід' : 'Витрати' }}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.type === 'income' ? 'green' : 'red'">
            <div class="card-content white-text">
              <p>Опис: {{ record.description }}</p>
              <p>Сума: {{ record.amount | currency('UAH') }}</p>
              <p>Категорія: {{ record.catName }}</p>

              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Запис з id={{ $route.params.id }} не знайдено</p>
  </div>
</template>

<script>
export default {
  name: "detail",
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordById", id);
    const category = await this.$store.dispatch("fetchCategoryById", id);

    this.record = {
      ...record,
      catName: category.title
    };

    this.loading = false;
  }
};
</script>

