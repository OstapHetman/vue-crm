<template>
  <div>
    <div class="page-title">
      <h3>Історія записів</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!records.length" class="center">Записів не знайдено!</p>
    <section v-else>
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";

export default {
  name: "history",
  components: {
    HistoryTable
  },
  data: () => ({
    loading: true,
    record: [],
    categories: []
  }),
  async mounted() {
    // this.records = await this.$store.dispatch("fetchRecords");
    const records = await this.$store.dispatch("fetchRecords");
    this.categories = await this.$store.dispatch("fetchCategories");
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.catId).title,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "Прибуток" : "Витрати"
      };
    });
    this.loading = false;
  }
};
</script>

