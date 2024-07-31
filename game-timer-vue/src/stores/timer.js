import {ref} from "vue";
import axios from "axios";

const timerState= false

const elapsedTime= ref(0);

let startTime= ref()
function initializeTime(){
    startTime= Date.now()
}
function getState(){
    axios.get("http://localhost:8088/state",{

    })
    .then((response) => {
        console.log("Response received:", response.data);
    })
    .catch((error) => {
        console.error("Error fetching table data:", error);
    })
}

function startTimer(gameName) {
    axios
        .post("http://localhost:8088/start", {
            gameName: gameName, // or any other key you want to use to send the gameName
            startTime: startTime
        })
        .then((response) => {
            console.log("Response received:", response.data);
        })
        .catch((error) => {
            console.error("Error fetching table data:", error);
        });
}

function stopTimer(gameName) {
    axios.post("http://localhost:8088/stop", {

    })
}
