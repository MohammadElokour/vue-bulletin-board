<template>
  <v-app>
    <v-app-bar
      app
      color="transparent"
      absolute="absolute"
      height="150px"
      elevation="0"
      class="d-flex justify-center"
    >
      <div class="d-flex align-center flex-column flex-sm-row mt-16">
          
          <v-btn @click="logout" v-if="isUser" color="error" x-large="x-large" class="mx-3 my-3">
            <span>Logout</span>        
          </v-btn>

          <v-app-bar-title class="header px-6 py-3 px-sm-16">
            <h1 class="text-h3 text-sm-h2 text-lg-h1">Bulletin Board</h1>
          </v-app-bar-title>  

          <router-link v-if="!isUser" class="text-decoration-none ml-3 mt-3" :to="atLoginPath? '/bulletin-board':'/login'">
            <v-btn :color="atLoginPath? 'primary' : 'error'" x-large="x-large">
              <span>{{btnLable}}</span>        
            </v-btn>
          </router-link>
          
          <v-btn v-else @click="showAddPost = !showAddPost" :color="showAddPost? 'blue':'green'" class="white--text mx-3 my-3" x-large="x-large">
            <span v-if="!showAddPost">Add Bulletin</span>
            <span v-else>Cancel</span>        
          </v-btn>

      </div>
    </v-app-bar>

    <v-main>
        <v-container v-if="showAddPost">
          <v-card color="transparent" class="item-card-1 elevation-0 pa-7 mx-auto my-16 my-sm-7" height="auto" width="400px">
          <v-card-title class="justify-center pa-10">
            Add a Post
          </v-card-title>
          <v-card-text style="font-size:1rem">
            Title:<v-text-field type="text" v-model="post.title"></v-text-field>
            Body:<v-textarea type="text" auto-grow="auto-grow" rows="3" v-model="post.text"></v-textarea>
          </v-card-text>
          <v-card-actions class="justify-center" style="font-size:0.85rem">
            <v-btn color="primary" @click="addPost">Add Post</v-btn>
          </v-card-actions>
        </v-card>
        </v-container>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
  import {auth, database} from '../firebase'
  import firebase from "firebase";

  export default {
    name: 'App',

    components: {

    },

    data: () => ({
      btnLable: 'Login',
      post: {
        title: '',
        text: '',
        userEmail: '',
        timeStamp: '',
      },
      atLoginPath: false,
      showAddPost: false,
      user: ''
    }),

    computed: {
      isUser() {
        auth.onAuthStateChanged(user => {
          if(user) {
            this.user = user;
          } else {
            this.user = '';
          }
        })
        if(this.user) {
          return true
        } else {
          return false
        }
      },
    },

    methods: {
      logout() {
        auth.signOut();
      },
      addPost() {
        this.post.userEmail = this.user.email;
        this.post.timeStamp = firebase.firestore.FieldValue.serverTimestamp();
        database.collection("posts").add(this.post);
        this.post.title = '';
        this.post.text = '';
        this.showAddPost = false;
      }
    },

    watch: {                            
      $route(to) {
        if (to.path == '/login' || to.path == '/signup') {
          this.atLoginPath = true
          this.btnLable = 'Back'
        } else {
          this.atLoginPath = false
          this.btnLable = 'Login'
        }
      },
    },

    filters: {
      // formatDate(value) {
      //   if (value) {
      //     return moment(String(value)).format('MM/DD/YYYY hh:mm')
      //   }
      // }  
    }
  }
</script>
