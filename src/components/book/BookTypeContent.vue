<template lang="html">
  <div class="book-type-content">
    <header class="content-header">
      <h2>最受关注图书榜</h2>
      <a href="javascript:void(0);" @click="getTypeBooks('虚构类')">虚构类</a>
      <a href="javascript:void(0);" @click="getTypeBooks('非虚构类')">非虚构类</a>
    </header>
    <ul class="book-list">
      <li class="book-item" v-for='typeBook in currentTypeBooks'>
        <a :href="typeBook.alt" class="book-image" :title="typeBook.title">
          <img :src="typeBook.image" :alt="typeBook.alt_title">
        </a>
        <h3 class="basc-info book-title"><a :href="typeBook.alt">{{typeBook.title}}</a></h3>
        <p class="basc-info"> {{typeBook.rating.average}}</p>
        <p class="basc-info">作者 : {{typeBook.author.join()}}</p>
        <p class="basc-info">{{typeBook.publisher}} / {{typeBook.pubdate}}</p>
        <p class="book-price">{{typeBook.pages}}页 / ￥{{typeBook.price}} / {{typeBook.binding}}</p>
        <p>标签 : <span v-for='tag in typeBook.tags'>{{tag.title}} / </span></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BookTypeContent',
  data (){
    return {

    }
  },
  computed: {
    currentTypeBooks (){
      return this.$store.state.book.currentTypeBooks;
    }
  },
  methods: {
    getTypeBooks(currentBookType) {
      // 默认一页显示12本书
      this.$store.dispatch('getTypeBooks', {count: 12, currentBookType: currentBookType})
    }
  },
  mounted () {
    if (this.currentTypeBooks.length === 0) {
      this.getTypeBooks('虚构类');
    }
  },
}
</script>

<style lang="css" scoped>
.content-header{
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
  color: #333;
}
.content-header h2{
  display: inline-block;
}
.content-header a{
  margin-left: 10px;
  font-weight: normal;
  font-size: 13px;
  color: #37a;
}
.book-list{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-self:center;
  flex-wrap: wrap;
  margin-top: 16px;
}
.book-item{
  width: 290px;
  margin-bottom: 30px;
  overflow: hidden;
}
.book-item p{
  margin: 3px 0px;
}
.book-item .book-title{
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  margin-bottom: 6px;
}
.book-item .basc-info{
  margin-left: 115px;
}
.book-item .book-price{
  clear: both;
  padding: 15px 0 3px;
}
.book-item .book-image{
  width: 95px;
  height: 137px;
  float: left;
  margin-right: 18px;
}
.book-item .book-image img{
  width: 100%;
  height: 100%;
}
</style>
