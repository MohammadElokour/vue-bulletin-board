<template>
  <v-container fill-height="fill-height">
    <v-layout align-center="align-center" justify-center="justify-center">
      <v-card
        color="transparent"
        class="custom-card custom-card-shadow login-card"
      >
        <v-card-title class="justify-center pt-10 pb-0" style="font-size: 1rem">
          <p class="text-center mt-10 mb-1 red--text mx-5 text-break">
            {{ error.message }}
          </p>
        </v-card-title>
        <v-card-text>
          <v-form class="px-5">
            <v-text-field
              v-model="email"
              prepend-icon="mdi-email"
              label="Email"
              type="email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              prepend-icon="mdi-lock"
              :append-icon="
                showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
              "
              @click:append="() => (showPassword = !showPassword)"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
            >
            </v-text-field>
            <v-card-actions class="justify-center">
              <v-btn @click="login" color="error" class="px-5">Login</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
        <p class="text-center">
          Don't have an account? <router-link to="/signup">Sign Up</router-link>
        </p>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { auth } from "../../firebase";
export default {
  data: () => ({
    email: "",
    password: "",
    error: {
      message: "",
    },
    showPassword: false,
  }),
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .catch((error) => {
          this.error = error;
        });
    },
  },
};
</script>
