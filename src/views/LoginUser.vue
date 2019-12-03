<template>
  <form @submit.prevent="login">
    <div class="row">
      <div class="col my-3">
            <input
            type="text"
            v-model="username"
            :rules="nameRules"
            placeholder="username"
            required
          />
        </div>
      <div class="col my-3">
          <input
            v-model="password"
            :type="'password'"
            placeholder="password"
            required
          />
      </div>
          <div class="col">
          <button type="submit" name="button">
              Login
            </button>
          </div>
      </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      error: null,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ]
    }
  },
  methods: {
    login () {
      var formData = new FormData()
      formData.append('username', this.username)
      formData.append('password', this.password)
      this.$store
        .dispatch('login', formData)
        .then(() => {
          this.$router.push({ name: 'board' })
        })
        .catch(err => {
          this.error = err.response.data.error
        })
    }
  }
}
</script>

<style scoped>

input {
  border: solid 1px black;
}

button {
  border: solid 1px;
  background-color: rgb(110, 170, 238);
}

</style>
