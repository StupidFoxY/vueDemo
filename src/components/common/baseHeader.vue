<template lang="html">
  <div class="header-container"
       :style="{background: currentModuleType.backgroundColor}">
    <div class="header-content">
      <div class="logo" :class="currentModuleType.logo"></div>
      <div class="search-bar">
        <input type="text" class="search-input"
               :placeholder="currentModuleType.placeholder">
        <button type="button" class="search-button"
                :style="{background: currentModuleType.searchIcon}">
          <span class="fa fa-search"></span>
        </button>
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
export default {
  name: 'baseHeader',
  data () {
    return {
      moduleTypes: [
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
      ],
      currentModuleType: {},
    }
  },
  computed: {

  },
  methods: {
    onHeaderChange (PathName) {
      // 监听PathName值的变化，比如说从读书界面跳转到电影界面时，会因此调整搜索界面的背景颜色，文字等信息
      if (PathName.indexOf(this.currentModuleType.value) === -1) {
        for (let i = 0, length = this.moduleTypes.length; i < length; i++) {
          if (PathName.indexOf(this.moduleTypes[i].value) !== -1) {
            this.currentModuleType = this.moduleTypes[i];
            break;
          }
        }
      }
    },
  },
  beforeMount(){
    this.currentModuleType = this.moduleTypes[0];
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
