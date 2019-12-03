<template>
  <div id="nav">
    <router-link v-if="loggedIn" to="/board">
      Главная
    </router-link>
    <router-link v-if="!loggedIn" to="/login" class="button">
      Login
    </router-link>
    <button v-else type="button" class="logoutButton" @click="logout">
      Logout
    </button>
  </div>
</template>

<script>
import { authComputed } from '../helpers'
export default {
  computed: {
    ...authComputed
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style coped>

button {
  padding: 10px;
}

</style>
