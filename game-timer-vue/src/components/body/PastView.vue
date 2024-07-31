<template>
  <div id="splash-img" class="hero bg-gray-200">
    <div class="hero-body">
      <div class="content">
        <div>
          <el-table :data="tableData" stripe style="width: 100%" height="250">
            <el-table-column prop="id" label="ID"  />
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="duration" label="Duration"  />
            <el-table-column prop="formattedDate" label="Date"  />
            <el-table-column prop="formattedTime" label="Starting Time" />
          </el-table>
        </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { onMounted, ref } from "vue";
const tableData = ref([]); // Initialize the reactive variable

function formatDateFromStamp(stamp: number): { date: string, time: string } {
  const date = new Date(stamp);
  return {
    date: date.toLocaleDateString(), // Format the date part
    time: date.toLocaleTimeString()  // Format the time part
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
            formattedTime: time
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

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; /* Adjust based on header/footer height */
}
.content{
  font-size: 5rem;
}
.hero {
  height: 40rem;
}
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
