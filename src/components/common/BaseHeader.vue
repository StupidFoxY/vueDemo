<template lang="html">
  <div class="header-container"
       :style="{background: currentModuleType.backgroundColor}">
    <div class="header-content">
      <div class="logo" :class="currentModuleType.logo"></div>
      <div class="search-bar">
        <input type="text" class="search-input"
               :placeholder="currentModuleType.placeholder"
               v-model='searchText'
               @keyup='getSearchBooks()'
               @blur='onBlurInput()'>
        <button type="button" class="search-button"
                :style="{background: currentModuleType.searchIcon}">
          <span class="fa fa-search"></span>
        </button>
        <ul class="search-content" v-if='search' @click="onfocusList()">
          <li class="search-item" v-for='searchBook in searchBooks'>
            <a :href="searchBook.alt">
              <img :src="searchBook.image" :alt="searchBook.alt_title">
              <h3>{{searchBook.title}}<span>{{searchBook.pubdate}}</span></h3>
              <p>{{searchBook.author.join()}}</p>
            </a>
          </li>
        </ul>
      </div>
      <ul class="list">
        <li v-for="type in moduleTypes" class="list-item">
          <span>{{type.text}}</span>
          <ul class="dropdown">
            <li v-for="subType in type.subTypes" class="dropdown-item">
              <router-link :to="subType.path" :key="subType.path">{{subType.text}}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BaseHeader',
  data () {
    return {
      searchText: '',
      search: false,
    }
  },
  computed: {
    moduleTypes() {
      return this.$store.state.moduleTypes;
    },
    currentModuleType() {
      return this.$store.state.currentModuleType;
    },
    searchBooks() {
      return this.$store.state.searchBooks;
    }
  },
  // computed: mapState(
  //   ['moduleTypes','currentModuleType']
  // ),//与上面等价，当计算属性的名称与 state 的子节点名称相同时，才可以这样使用
  methods: {
    onHeaderChange (PathName) {
      // 监听PathName值的变化，比如说从读书界面跳转到电影界面时，会因此调整搜索界面的背景颜色，文字等信息
      if (PathName.indexOf(this.currentModuleType.value) === -1) {
        for (let i = 0, length = this.moduleTypes.length; i < length; i++) {
          if (PathName.indexOf(this.moduleTypes[i].value) !== -1) {
            this.$store.commit('CHANGE_CURRENT_MODULE_TYPE',this.moduleTypes[i]);
            return;
          }
        }
      }
    },
    getSearchBooks () {
      if(this.searchText){
        this.$store.dispatch('getSearchBooks',{count: 6, searchText: this.searchText});
        setTimeout(()=>{
          if(this.$store.state.searchBooks.length !==0){
            this.search = true;
          }else{
            this.search = false;
          }
        },300)
      }else{
        this.onBlurInput();
      }
    },
    onBlurInput() {
      this.search = false;
      this.$store.commit('CLEAR_SEARCH_DATA');
    }
  },
  beforeRouteLeave (to, from, next) {
    this.onHeaderChange(to.name);
    next();
  },
}
</script>

<style lang="css" scoped>
.header-container{
  width: 100%;
  height: 70px;
  min-width: 936px;
  background: #f6f6f1;
  margin-bottom: 40px;
  transition: background .5s ease-in-out
}
.header-content{
  width: 936px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo{
  width: 120px;
  height: 40px;
}
.book-logo{
  background: url("./../../assets/book.png") no-repeat center
}
.city-logo{
  background: url("./../../assets/city.png") no-repeat center
}
.movie-logo{
  background: url("./../../assets/movie.png") no-repeat center
}
.music-logo{
  background: url("./../../assets/music.png") no-repeat center
}
.search-button{
  margin-left: -4px;
  border-radius: 0px 5px 5px 0px;
  outline: 0px;
  box-shadow: 0px 0px 0px;
  border: 0px;
  padding: 8px 12px 9px;
  color: #fff;
}
.search-input{
  border: 0px;
  padding: 8px 8px;
  border-radius: 0px;
  outline: 0px;
  width: 360px;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.16);
  box-sizing: border-box;
}
.search-content{
  position: absolute;
  width: 360px;
  z-index: 99;
  margin-top: 6px;
  background: #fff;
  border: 1px solid #ddd;
}
.search-item{
  border-bottom: 1px solid #eee;
  overflow: hidden;
  color: #999;
  cursor: pointer;
  padding: 6px;
}
.search-item:hover{
  background: #F9F9F9;
}
.search-item a{
  display: block;
}
.search-item img{
  width: 40px;
  height: 56px;
  float: left;
  margin-right: 8px;
  margin-top: 3px;
}
.search-item h3{
  font-weight: normal;
  color: #369;
  font-size: 13px;
}
.search-item p{
  margin-top: 10px;
}
.list{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
}
.list-item{
  color: #333;
  position: relative;
  padding: 2px 5px;
}
.list-item:hover{
  background: #3377aa;
  cursor: pointer;
}
.list-item:hover .dropdown{
  display: block;
}
.list-item:hover>span{
  color: #fff;
}
.list-item .dropdown{
  width: 100px;
  position: absolute;
  background: #fff;
  box-shadow: 0 5px 20px rgba(0,34,77,.1);
  margin-left: -37px;
  top: 30px;
  display: none;
}
.list-item .dropdown::before{
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  margin-top: -10px;
  margin-left: calc(50% - 10px);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid white;
}
.list-item .dropdown .dropdown-item{
  padding: 10px;
  text-align: center;
}
.list-item .dropdown .dropdown-item:hover{
  background: #F4F8FB;
}
</style>
