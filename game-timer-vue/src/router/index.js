import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/components/body/HomeView.vue";
import TimerView from "@/components/body/TimerView.vue";
import PastView from "@/components/body/PastView.vue";
import WorldClock from "@/components/body/WorldClock.vue";
import TimeByDay from "@/components/body/TimeByDay.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },{
      path: '/timer',
      name: 'TimerView',
      component:TimerView
    },{
      path: '/past',
      name: 'PastView',
      component: PastView
    },{
      path:'/clock',
      name: 'ClockView',
      component: WorldClock,
    },{
      path:'/byday',
      name: 'ByDay',
      component: TimeByDay
    }
  ]
})

export default router
