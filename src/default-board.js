import axios from 'axios'

const board = {

  name: 'workshop',
  _columns: [
    {
      name: 'необработаные',
      tasks: [
        {
          'firstName': 'Saltanat',
          'lastName': 'Janybekova'
        }]
    },
    {
      name: 'В процессе',
      tasks: []
    },
    {
      name: 'Помогли',
      tasks: []
    }
  ],

  get columns () {
    return this._columns
  },

  set columns (data) {
    this._columns[0].tasks = this.value
  }
}

const token = localStorage.getItem('user')
axios.defaults.headers.common['authorization'] = JSON.parse(token)

function getBoardData () {
  return axios
    .get('http://107.175.113.196:8080/api/v1/customers')
    .then(data => {
      data.data.forEach(element => {
        element.isChecked
          ? board.columns[0].tasks.push(element)
          : board.columns[1].tasks.push(element)
      })
      // if (data.data[0].isChecked === true) {
      //   board.columns[0].tasks.push(data.data[0])
      // } else {
      //   board.columns[1].tasks.push(data.data[0])
      // }
      // // board.columns[0].tasks[0].name = data.data[0].firstName
      // // board.columns[0].tasks[0].iin = data.data[0].iin
      // // board.columns[0].tasks[0].helpType = data.data[0].helpType
      // // board.columns[0].tasks[0].status = data.data[0].status
      // console.log(board.columns)
      return board
    })
}

getBoardData()

export default board
