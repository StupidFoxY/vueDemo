import axios from 'axios'
import * as types from '../mutation-types'


const state = {
  currentTypeBooks: []
}
const mutations = {
  [types.SET_CURRENT_TYPE_BOOKS] (state, books){
    state.currentTypeBooks = books;
  }
}
const actions = {
  getTypeBooks ({commit, state}, {start = 0, count = 10, currentBookType}) {
    axios.get('./api/book/search', {
      params: {
        q: currentBookType, //douban api 提供的接口 q查询关键字
        start,
        count,
      }
    }).then(response => {
      commit(types.SET_CURRENT_TYPE_BOOKS, response.data.books)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
