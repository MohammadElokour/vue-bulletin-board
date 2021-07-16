<template>
  <v-container fill-height="fill-height">
    <v-layout align-center="align-center" justify-center="justify-center">
      <v-card color="transparent" class="custom-card custom-card-shadow signup-card">
        <v-card-title class="justify-center pt-10 pb-0" style="font-size:1rem">
          <p class="text-center mt-10 mb-1 red--text text-break mx-5">{{error.message}}</p>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="email" prepend-icon="mdi-email" label="Email" type="email"></v-text-field>
            <v-text-field v-model="password" prepend-icon="mdi-lock" 
              :append-icon="showPassword? 'mdi-eye-outline' : 'mdi-eye-off-outline'"  
              @click:append="() => (showPassword = !showPassword)" label="Password"  
              :type="showPassword ? 'text' : 'password'"
            >
            </v-text-field>
            <v-card-actions class="justify-center">
              <v-btn @click="signup" color="green" class="px-5 white--text">Sign Up</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
          <p class="text-center">Already have an account? <router-link to="/login">Login</router-link></p>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
  import {auth} from '../../firebase'
  export default {
    data: () => ({
      email: '',
      password: '',
      error: {
        message: ''
      },
      showPassword: false,
    }),
    methods: {
      signup() {
        auth.createUserWithEmailAndPassword(this.email, this.password)
          .catch(error => {
            this.error = error
          })
      }
    },
  }
</script>

