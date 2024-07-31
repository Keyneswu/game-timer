import {ref} from "vue";
import axios from "axios";

const localTime = ref('');

const fetchTime = async () => {
    try {
        // Get the user's IP address
        const response = await axios.get('https://api.ipify.org?format=json');
        const ip = response.data.ip;

        // Get the user's timezone based on their IP address
        const timezoneResponse = await axios.get(`https://worldtimeapi.org/api/ip/${ip}`);
        const timezone = timezoneResponse.data.timezone;

        // Set an interval to update the time every second
        setInterval(() => {
            localTime.value = new Date().toLocaleTimeString('en-US', {
                timeZone: timezone,
            });
        }, 1000);
    } catch (error) {
        console.error('Error fetching time:', error);
    }
};

export default {
    localTime,
    fetchTime,
}
