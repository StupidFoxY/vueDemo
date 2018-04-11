import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import baseHeader from '@/components/common/baseHeader'
import BaseHeader from '@/components/common/BaseHeader'
import BookTypeContent from '@/components/book/BookTypeContent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'bookHome',
      components: {
        header: BaseHeader,
        content: HelloWorld
      }
    },
    {
      path: '/book-tag',
      name: 'bookTag',
      components: {
        header: BaseHeader,
        content: HelloWorld
      }
    },
    {
      path: '/book-type',
      name: 'bookType',
      components: {
        header: BaseHeader,
        content: BookTypeContent,
      }
    },
    {
      path: '/movie-time',
      name: 'movieTime',
      components: {
        header: BaseHeader,
        content: HelloWorld
      }
    },
    {
      path: '/movie-tag',
      name: 'movieTag',
      components: {
        header: BaseHeader,
        content: HelloWorld
      }
    },
    {
      path: '/music-tag',
      name: 'musicTag',
      components: {
        header: BaseHeader,
        content: HelloWorld
      }
    },
    {
      path: '/city',
      name: 'city',
      components: {
        header: BaseHeader,
        content: HelloWorld
      }
    },
  ]
})
