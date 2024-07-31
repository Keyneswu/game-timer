<template>
  <el-table
      :data="aggregatedData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
  >
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="totalDuration" label="Total Duration (hours)" />
  </el-table>
</template>

<script lang="ts" setup>
import axios from "axios";
import { onMounted, ref, computed } from "vue";

interface TableItem {
  date: string
  totalDuration: string // Total duration in hours as a string
}

const tableData = ref([]); // Initialize the reactive variable
const aggregatedData = computed<TableItem[]>(() => {
  const aggregation: { [key: string]: number } = {};
  tableData.value.forEach((item: any) => {
    if (aggregation[item.formattedDate]) {
      aggregation[item.formattedDate] += item.duration;
    } else {
      aggregation[item.formattedDate] = item.duration;
    }
  });
  return Object.entries(aggregation).map(([date, totalDuration]) => ({
    date,
    totalDuration: (totalDuration / 3600).toFixed(2), // Convert to hours and format to 2 decimal places
  }));
});

const tableRowClassName = ({
                             row,
                           }: {
  row: TableItem
}) => {
  const durationInHours = parseFloat(row.totalDuration);
  if (durationInHours > 2) {
    return 'warning-row';
  } else if (durationInHours < 1) {
    return 'success-row';
  }
  return '';
}

function formatDateFromStamp(stamp: number): { date: string, time: string } {
  const date = new Date(stamp);
  return {
    date: date.toLocaleDateString(), // Format the date part
    time: date.toLocaleTimeString(), // Format the time part
  };
}

function getTableData() {
  axios
      .get("http://localhost:8088/timer/past")
      .then((response) => {
        tableData.value = response.data.map((item: any) => {
          const { date, time } = formatDateFromStamp(item.stamp);
          return {
            ...item,
            formattedDate: date,
            formattedTime: time,
          };
        });
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
      });
}

onMounted(() => {
  getTableData(); // Fetch data when the component is mounted
  console.log("mounted");
});
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
