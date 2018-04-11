<template lang="html">
  <div>
    <p>{{ msg }}</p>
    <p>{{ reversedMessage }}</p>
    <p>{{ reversedMsg() }}</p>
    <button @click="msg = Date.now()">change it</button>
    <p>{{ firstName }}</p>
    <p>{{ lastName }}</p>
    <p>{{ fullName }}</p>
    <button @click="fullName = 'z f'">set name</button>
    <ul>
      <li v-for="(item,index) of items">
        {{index + 1}}-{{ item.message }}
      </li>
    </ul>
    <ul>
      <li v-for="item of itemsFilter">
        {{ item.message }}
      </li>
    </ul>
    <vueChild v-bind='childData'></vueChild>
  </div>
</template>

<script>
import vueChild from './child';
export default {
  name: 'freezeDemo',
  data () {
    return {
      msg: Date.now(),
      firstName: 'l',
      lastName: 'yy',
      items:[
        { message:'aa' },
        { message:'bb' },
        { message:'cc' },
        { message:'dd' },
        { message:'ee' },
      ],
      childData:{
        childLabel:'name',
        childValue:'Tom'
      }
    }
  },
  computed: {
    reversedMessage () {
      return Date.now()
    },
    fullName:{
      get (){
        return this.firstName + ' ' + this.lastName;
      },
      set (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    },
    itemsFilter (){
      return this.items.filter(function (item) {
        return item.message==='a'
      })
    }
  },
  methods:{
    reversedMsg () {
      return Date.now()
    }
  },
  components: {
    vueChild
  }
}
</script>

<style lang="css">
</style>
