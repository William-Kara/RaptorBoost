<template>
 <div>
    <Register />
 </div>
</template>

<script>
import Register from "../components/Register"
export default {
  name: 'RegisterPage',
  components: {
      Register
  },
  props: [],
  data() {
    return {
      name: '',
      password: '',
    }
  },
  mounted: function () {}
}
</script>

<style scoped lang="scss">
  .ui-sortable {
    flex-direction: row;
  }
</style>