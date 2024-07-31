<script setup>

</script>

<template>
  <div class="header header-fixed u-unselectable header-animated">
    <div class="header-brand">
      <div class="nav-item no-hover">
        <router-link to="/"><h6 class="title">GamingTimer</h6></router-link>
      </div>
      <div class="nav-item nav-btn" id="header-btn">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="header-nav" id="header-menu" role="button">
      <div class="nav-left">
        <div class="nav-item text-center">
          <a href="https://github.com/Keyneswu">
                    <span class="icon">
                        <i class="fab fa-wrapper fa-github" aria-hidden="true">
                          <img src="../static/img/githubLogo.png" alt="githubLink">
                        </i>
                    </span>
          </a>
        </div>
        <div class="nav-item">
          <router-link to="/clock">Clock</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/timer">Timer</router-link>
        </div>
        <div class="nav-item has-sub toggle-hover" id="left-dropdown">
          <a class="nav-dropdown-link">Past</a>
          <ul class="dropdown-menu dropdown-animated" role="menu">
            <li role="menuitem"><router-link to="/past">All Records</router-link></li>
            <li role="menuitem"><router-link to="/byday">Daily Time</router-link></li>
          </ul>
        </div>
      </div>

      <div class="nav-right">

      </div>
    </div>
  </div>
</template>
<style scoped>

</style>
