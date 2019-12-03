 <template>
       <div class="task-view">
         <div class="flex flex-col flex-grow items-start justify-between px-4">
         <input
           class="p-2 w-full mr-2 block text-xl font-bold"
           :value="task.name"
           @keyup.enter="updateTaskProperty($event, 'name')"
           @change="
           updateTaskProperty($event, 'name')"
         />

         <textarea
           placeholder="Enter task description"
           class="relative w-full bg-transparent px-2 border mt-2 h-64 border-none leading-normal"
           :value="task.helpType"
           @change="updateTaskProperty($event, 'description')"
         />

           <textarea

           :value="task.lastname"
           @keyup.enter="updateTaskProperty($event, 'lastname')"
           @change="updateTaskProperty($event, 'lastname')"
         />

         </div>
         <button>{{ task.status}}</button>
       </div>
     </template>

<script>
import { mapGetters } from 'vuex'
import apiClient from '@/apiHelper.js'

export default {

  // отправить в store чтобы он глобально видел !11
  computed: {
    ...mapGetters(['getTask']),
    task () {
      return this.getTask(this.$route.params.id)
    }
  },

  methods: {
    updateTaskProperty (e, key) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key,
        value: e.target.value
      })
    }
  }
}
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
