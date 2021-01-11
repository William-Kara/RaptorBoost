<template>
 <div>
    <Login />
 </div>
</template>

<script>
import Login from "../components/Login";
export default {
  name: 'LoginPage',
  components: {
      Login
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