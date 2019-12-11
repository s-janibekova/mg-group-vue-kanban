<template>
    <div>
            <div class="customer-header">
              <span class="eyebrow">Вид помощи {{customer.helpType}}
              </span>
              <h1 class="title"> ФИО</h1>
            </div>
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

<style scoped>
   .location {
      margin-bottom: 0;
    }
    .location > .icon {
      margin-left: 10px;
    }
    .customer-header > .title {
      margin: 0;
    }
    .list-group {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .list-group > .list-item {
      padding: 1em 0;
      border-bottom: solid 1px #e5e5e5;
    }

</style>
