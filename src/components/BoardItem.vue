<template>
  <v-container class="col-12 col-sm-6 col-lg-4 col-xl-3">
    <v-card color="transparent" :class="randomColor" class="pa-7" height="auto" width="400px">
        <v-card-title class="justify-center pa-10">
          <h3>{{boardItem.title}}</h3>
        </v-card-title>
        <v-card-text style="font-size:1rem">
          <p>{{boardItem.text}}</p>
        </v-card-text>
        <v-card-actions style="font-size:0.85rem">
          <p>posted by:<br><span class="pl-2">{{boardItem.userEmail}}</span><br><span class="pl-2">{{boardItem.timeStamp}}</span></p>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="290"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" color="red darken-3" v-show="isUser && user.email == boardItem.userEmail" ><v-icon>mdi-delete</v-icon></v-btn>
            </template>
            <v-card>
              <v-card-title>
                Are You Sure
              </v-card-title>
              <v-card-text>
                Are you sure you want to delete this post?
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  @click="deletePost(index)"
                >
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
  </v-container>
</template>

<script>
  import {auth} from '../../firebase'

  export default {
    props: [
      'boardItem',
      'posts',
      'index'
    ],
    data: () => ({
      user: '',
      dialog: false,
    }),
    computed: {
      randomColor() {
        let randomNum = Math.floor(Math.random() * 3) + 1
        return "item-card-"+randomNum
      },
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
      deletePost(index) {
        console.log(index);
        this.posts.splice(index, 1);
        this.dialog = false;
      }
    }
  }
</script>
