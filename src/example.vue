<template>
  <div>
    My Example Component


    <button @click="count++">Increase</button>
    <div>{{ count }}</div>
    <button @click="count--">Decrease</button>
  </div>
</template>

<script>
export default {
  name: 'my-example',
  data () {
    return {
      count: 0
    }
  },
}
</script>

<style>

</style>