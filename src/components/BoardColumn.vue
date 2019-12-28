<template>
  <AppDrop
    @drop="moveTaskOrColumn"
  >
    <AppDrag
      class="column"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex
      }"
    >
      <div class="flex items-center mb-2 font-bold">
        {{ column.name }}
      </div>
      <div class="list-reset">
        <ColumnTask
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          :task="task"
          :taskIndex="$taskIndex"
          :column="column"
          :columnIndex="columnIndex"
          :board="board"
        />
        <!-- @click="hide =!hide" -->
      <button @click="hide =!hide" id="add"  class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Добавить
      </button>
        <div v-if="hide">
    <form class="w-full max-w-lg" @submit.prevent="onSubmit(column.tasks)">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
          Имя
          </label>
          <input v-model="firstName" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="nick" type="text">
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
          Фамилия
          </label>
          <input v-model="lastName" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="nick" type="text">
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            ИИН
          </label>
          <input v-model="iin" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="nick" type="text">
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            E-mail
          </label>
          <input v-model="email" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email">
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Описание
          </label>
          <textarea v-model="desciption" class=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" id="message"></textarea>
               </div>
      </div>
      <div class="md:flex md:items-center submit-btn">
        <div class="md:w-1/3">
          <!-- <button  @click="createTask($event, column.tasks)" class="shadow bg-indigo hover:bg-blue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button"> -->
            <button type="submit" class="shadow bg-indigo hover:bg-blue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
              Send
          </button>
        </div>
        <div class="md:w-2/3"></div>
      </div>
        </form>
    </div>

        <!-- <input
          type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Enter new task"
          @keyup.enter="createTask($event, column.tasks)"
        /> -->
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import ColumnTask from './ColumnTask'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'
import { uuid } from '../utils.js'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'

export default {
  data () {
    return {
      hide: false,
      firstName: '',
      lastName: '',
      iin: '',
      email: '',
      desciption: ''

    }
  },
  components: {
    ColumnTask,
    AppDrag,
    AppDrop
  },
  mixins: [movingTasksAndColumnsMixin],
  methods: {
    pickupColumn (e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    },
    getColId (e, tasks) {
      console.log(tasks)
    },
    // createTask (e, tasks) {
    //   this.$store.commit('CREATE_TASK', {
    //     tasks,
    //     // здесь будет объект который будет отправлять форму о customer
    //     name: e.target.value
    //   })
    //   e.target.value = ''
    // },
    onSubmit (tasks) {
      this.hide = true
      const newTask = {
        firstName: this.firstName,
        lastName: this.lastName,
        iin: this.iin,
        description: this.desciption,
        id: uuid()
      }
      this.$store.commit('CREATE_TASK', [newTask, tasks])
      this.firstName = ''
      this.lastName = ''
      this.iin = ''
      this.desciption = ''
      console.log(newTask)
    }
  }
}
</script>

<style lang="css">
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

form {
  padding-top: 10px;
   text-align: center;
}
#add {
  position: relative;
  margin-left: 10em;
  font-size: 12px;
  border: solid 1px;
  cursor: pointer;
}
</style>
