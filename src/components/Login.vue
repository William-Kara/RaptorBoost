<template>
  <b-row class="justify-content-md-center">
    <b-col col lg="5">
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-1"
          label="Email address"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group 
          id="input-group-2"
          label="Password"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            placeholder="Enter password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button block type="submit" variant="primary">Log In</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import firebase from 'firebase/app'
import 'firebase/auth'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  props: [],
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errors: null
    }
  },
  mounted: function () {
    console.log("Login component mounted")
  },
  methods: {
    ...mapActions([
      'setCurrentUser', // map `this.increment()` to `this.$store.dispatch('increment')`
    ]),
    onSubmit: function (e) {
      e.preventDefault()
      if(this.form.email && this.form.password) {
        console.log("Trying auth to firebase")
        firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
        .then((data) => {
          console.log(data.user)
          this.setCurrentUser(data.user)
          console.log(this.$store.state.user)
        })
        .catch((error) => {
          var errorCode = error.code
          console.log(errorCode)
          var errorMessage = error.message
          this.errors = errorMessage
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .ui-sortable {
    flex-direction: row;
  }
</style>
