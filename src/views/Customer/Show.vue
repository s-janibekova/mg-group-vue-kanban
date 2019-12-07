<template>
    <div>
            {{ customer }}
            </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['id'],
  mounted () {
    this.$store.dispatch('fetchCustomer', this.$route.params.id)
  },
  computed: {
    ...mapState(['customer'])
  }
}

</script>

<style lang="scss" scoped>

</style>
