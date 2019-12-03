import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import defaultBoard from './default-board'
import { uuid } from './utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    board: defaultBoard
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
    }
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

    fetchCustomer ({ commit, state }, id) {
      const onlyColumns = state.board.columns
      // console.log(onlyColumns)
      onlyColumns.map(el => {
        el.tasks.forEach(el =>{
          if (el.id === id) {
            const task = el
            return task
          }
        })
        
      })
    }
  },

  // eslint-disable-next-line no-dupe-keys
  getters: {
    loggedIn (state) {
      return !!state.user
    }
  }

})
