<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сума</th>
        <th>Дата</th>
        <th>Категорія</th>
        <th>Тип</th>
        <th>Детальніше</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, index) of records" :key="index">
        <td>{{ index+1 }}</td>
        <td>{{ record.amount | currency('UAH')}}</td>
        <td>{{ record.date | date('datetime') }}</td>
        <td>{{ record.CategoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{ record.typeText }}</span>
        </td>
        <td>
          <button
            v-tooltip="'Переглянути запис'"
            class="btn-small btn"
            @click="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  }
};
</script>

