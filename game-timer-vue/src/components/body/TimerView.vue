<template>
  <div class="timer-container">
    <div id="splash-img" class="hero bg-gray-200">
    <div class="hero-body">
    <div class="content u-text-center">
              <h1>Game Timer</h1>
              <input v-if="timerState === 0" type="name" placeholder="your game name" v-model="gameName" id="game_name_box" />
              <div>
                <p id="game_name" v-if="timerState===1">Current Game: {{ gameName }}</p>
                <p id="timer">{{ formattedElapsedTime }}</p>
              </div>
              <div id="buttons">
                <button v-if="timerState === 0" class="btn-success btn-animated btn--lg" @click="startTimer()">Start Timer</button>
                <button v-if="timerState === 1" class="btn-danger btn-animated btn--lg" @click="stopTimer()">Stop Timer</button>
              </div>

    </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed, onUnmounted} from 'vue';
import axios from 'axios';

const elapsedTime = ref(0);
const startTime = ref(null);
const timerState = ref(0);
const gameName = ref('');
let timerInterval = null;

const formattedElapsedTime = computed(() => {
  const hours = Math.floor(elapsedTime.value / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((elapsedTime.value % 3600) / 60).toString().padStart(2, '0');
  const seconds = (elapsedTime.value % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
});

function startTimer() {
  axios.post('http://localhost:8088/timer/start', {
    name: gameName.value
  })
      .then(function (response) {
        console.log('Timer started:', response.data);
        elapsedTime.value = 0; // Reset elapsed time to zero
        timerState.value = 1;
        startTime.value = Date.now(); // Set start time to current time
        startInterval();
      })
      .catch(function (error) {
        console.log(error);
      });
}

function stopTimer() {
  axios.post('http://localhost:8088/timer/stop')
      .then(function (response) {
        console.log('Timer stopped:', response.data);
        timerState.value = 0;
        clearInterval(timerInterval);
        elapsedTime.value = 0; // Reset elapsed time to zero
      })
      .catch(function (error) {
        console.log(error);
      });
}

function startInterval() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const now = Date.now();
    if (startTime.value) {
      elapsedTime.value = Math.floor((now - startTime.value) / 1000);
    }
  }, 1000);
}

onMounted(function () {
  axios.get('http://localhost:8088/timer/state')
      .then(function (response) {
        timerState.value = response.data.state;
        startTime.value = response.data.startTime;
        if (timerState.value === 1 && startTime.value) {
          startInterval();
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
});

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
});
</script>

<style scoped>
#timer {
  font-size: 3rem;
}

#game_name_box {
  width: 12rem;
}
.card {
  margin: 0 auto; /* Center the card horizontally */
  height: 420px;
  width: 700px;
}

.card__title-container {
  padding: 20px;
}

.hero {
  height: 40rem;
}

</style>
