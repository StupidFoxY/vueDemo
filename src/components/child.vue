<template lang="html">
  <span>{{ childLabel }}:{{ childValue }}</span>
</template>

<script>
export default {
  name:'vueChild',
  props:['childValue','childLabel'],
}
</script>

<style lang="css">
</style>
