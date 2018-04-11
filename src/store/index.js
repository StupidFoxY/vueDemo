import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as types from './mutation-types'
import book from './module/book'

Vue.use(Vuex)

const moduleTypes = [
  {
    value: 'book',
    text: '读书',
    field: 'books',
    logo: 'book-logo',
    searchIcon: '#9d9c92',
    placeholder: '书名、作者、ISBN',
    backgroundColor: '#f6f6f1',
    subTypes: [{
      text: '按标签分类',
      path: 'book-tag'
    }, {
      text: '按类型分类',
      path: 'book-type'
    }]
  },
  {
    value: 'movie',
    text: '电影',
    field: 'subjects',
    logo: 'movie-logo',
    searchIcon: '#9099a1',
    placeholder: '电影、影人、影院、电视剧',
    backgroundColor: '#f0f3f5',
    subTypes: [{
      text: '按时间分类',
      path: 'movie-time'
    }, {
      text: '按标签分类',
      path: 'movie-tag'
    }]
  },
  {
    value: 'music',
    text: '音乐',
    field: 'musics',
    logo: 'music-logo',
    searchIcon: '#9ca49a',
    placeholder: '唱片名、表演者、条码、ISRC',
    backgroundColor: '#f0f3ef',
    subTypes: [{
      text: '按标签分类',
      path: 'music-tag'
    }]
  },
  {
    value: 'city',
    text: '同城',
    logo: 'city-logo',
    searchIcon: '#8f98a0',
    placeholder: 'sorry, 同城活动暂无搜索功能',
    backgroundColor: '#f6f5f2',
    subTypes: [{
      text: '按城市分类',
      path: 'city'
    }]
  }
];

const state = {
  moduleTypes,
  currentModuleType: moduleTypes[0],
  searchBooks: [],
}
const mutations = {
  [types.CHANGE_CURRENT_MODULE_TYPE] (state, moduleType) {
    state.currentModuleType = moduleType;
  },
  [types.SET_SEARCH_DATA] (state, searchBooks) {
    state.searchBooks = searchBooks;
  },
  [types.CLEAR_SEARCH_DATA] (state) {
    state.searchBooks = [];
  }
}
const actions = {
  getSearchBooks ({commit, state}, {start = 0, count = 10, searchText}) {
    axios.get('./api/book/search', {
      params: {
        q: searchText, //douban api 提供的接口 q查询关键字
        start,
        count,
      }
    }).then(response => {
      commit(types.SET_SEARCH_DATA, response.data.books)
    })
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    book,
  }
})
