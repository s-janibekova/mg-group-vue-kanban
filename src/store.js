import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import defaultBoard from './default-board'
import { uuid } from './utils'
import apiClient from './apiHelper.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    board: defaultBoard,
    customer: {}
  },
  mutations: {
    SET_USER_DATA (state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['authorization'] = userData
    },
    CLEAR_USER_DATA () {
      localStorage.removeItem('user')
      location.reload()
    },
    SET_TASK (state, customer) {
      state.customer = customer
    },
    CREATE_TASK (state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },

    CREATE_COLUMN (state, { name }) {
      state.board.columns.push({
        name,
        tasks: []
      })
    },

    // eslint-disable-next-line standard/object-curly-even-spacing
    UPDATE_TASK (state, { task, key, value }) {
      task[key] = value
      // Vue.set(task, key, value)
    },
    MOVE_TASK (state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },
    MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
    },
    SET_CUSTOMER (state, el) {
      console.log(el)
      state.customer = el
    }

  },
  actions: {
    register ({ commit }, credentials) {
      return axios
        .post('http://107.175.113.196:8080/login', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    },
    login ({ commit }, credentials) {
      return axios
        .post('http://107.175.113.196:8080/login', credentials)
        .then(data => {
          commit('SET_USER_DATA', data.headers.authorization)
        })
    },
    logout ({ commit }) {
      commit('CLEAR_USER_DATA')
    },

    fetchCustomer ({ commit }, id) {
      // const onlyColumns = state.board.columns
      apiClient.getCustomer(id)
        .then(res => {
          const data = res.data
          const result = data.find(x => x.id)
          console.log(result)
          // eslint-disable-next-line no-undef
          commit('SET_CUSTOMER', result)
        })
      // // eslint-disable-next-line no-undef
      // var customer = getters.getEventById(id)
      // if (customer) {
      //   commit('SET_TASK', customer)
      // } else {

      // }

      // console.log(onlyColumns)
      // onlyColumns.map(el => {
      //   el.tasks.forEach(el => {
      //     if (el.id === id) {
      //       const customer = el
      //       commit('SET_TASK', customer)
      //     }
      // })
      // })
    }
  },

  getters: { // <-- Add a getter
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    },
    loggedIn (state) {
      return !!state.user
    },

    // Исправить ! - не работает
    getEventById: state => id => {
      return state.board.find(customer => customer.id === id)
    }
  }
})
