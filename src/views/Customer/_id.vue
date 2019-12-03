  
<template>
  <div>
  
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('fetchCustomer', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch event #' + params.id
      })
    }
  },
  computed: mapState({
    task: state => state.board
    
  })
}
</script>
