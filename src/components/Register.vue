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
            :state="passwordState"
          ></b-form-input>
          <b-form-invalid-feedback id="input-2-feedback">
            Passwords input must match
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group 
          id="input-group-3"
          label="Confirm Password"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="form.confirmPassword"
            type="password"
            placeholder="Confirm password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button block type="submit" variant="primary">Register</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import firebase from "firebase/app"
import "firebase/auth"

export default {
  name: 'Register',
  props: [],
  data() {
    return {
      form: {
        email: '',
        password: '',
        confirmPassword: '',
      },
    }
  },
  computed: {
    passwordState() {
      if(this.form.password){
        return this.form.password === this.form.confirmPassword
      } else {
        return null
      }
    }
  },
  mounted: function () {
    console.log("Register component mounted")
    console.log(this.$store.state.user)
  },
  methods: {
    onSubmit: function (e) {
      e.preventDefault()
      if(this.passwordState){
        console.log('register form is valid')
        firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then((user) => {
            // Signed in 
            console.log(user)
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            // ..
          });
      } else {
        console.log('errors in register form')
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
