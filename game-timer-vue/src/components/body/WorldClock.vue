<template>
  <div class="container">
    <div id="splash-img" class="hero bg-gray-200">
      <div class="hero-body">
        <div class="content u-text-center">
          <div class="card">
            <div class="card__container">
              <div class="card__title-container">
                <p class="card-title">World Clock</p>
                <span class="card-subtitle">{{ currentTime.localTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import currentTime from "@/stores/currentTime.js";

onMounted(() => {
  currentTime.fetchTime();
});
</script>

<style scoped>
.hero {
  height: 40rem;
}
.content {
  text-align: center;
}

.card {
  margin: 0 auto; /* Center the card horizontally */
  height: 420px;
  width: 700px;
}

.card__title-container {
  padding: 20px;
}

.card-title {
  font-size: 3rem; /* Adjust font size for the card title */
  margin: 0;
  font-family: 'Brush Script MT', cursive;
  color: gray;
}

.card-subtitle {
  font-size: 7rem; /* Adjust font size for the card subtitle */
  font-family: 'Brush Script MT', cursive;
  color: black;
}
</style>
