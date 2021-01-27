<template>
  <v-container class="row mt-16 ma-auto">
    <BoardItem 
      v-for="(boardItem, i) in posts"
      :key="i"
      :boardItem="boardItem"
      :index="i"
      :posts="posts"
    />
  </v-container>
</template>

<script>
import BoardItem from './BoardItem.vue'
import {database} from '../../firebase'
  export default {
    components: { BoardItem },
    data: () => ({
      posts: []
    }),
    mounted() {
      database.on('value', snap => {
        let posts = []
        snap.forEach(post => {
          posts.unshift(post.val())
        })
        this.posts = posts
      })
    }
  }
</script>
