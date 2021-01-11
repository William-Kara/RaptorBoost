<template>
  <div class="topBar">
    <div v-if="getCurrentUser.isLogged">
      <span>
        {{ getCurrentUser.data.email }}
      </span>
    </div>
    <div v-if="!getCurrentUser.isLogged">
      <router-link
        to="/login"
        v-slot="{ href, route, navigate, isActive }"
      >
        <a 
          :active="isActive" 
          :href="href" 
          @click="navigate"
        >
          Log In
        </a>
      </router-link>
      <router-link
        to="/register"
        v-slot="{ href, route, navigate, isActive }"
      >
        <a 
          :active="isActive" 
          :href="href" 
          @click="navigate"
        >
          Register
        </a>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "TopBar",
    data() {
      return {
        user: {}
      }
    },
    computed: {
      ...mapGetters([
        'getCurrentUser'
      ])
    },
    methods: {
    }
  }
</script>

<style scoped>
 .topBar{
   height: 50px;
   display: flex;
   align-items: center;
   justify-content: flex-end;
 }
</style>