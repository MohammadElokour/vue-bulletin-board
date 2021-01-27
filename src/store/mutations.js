import * as types from './mutationTypes'

export const mutations = {
  [types.LOGIN] (state, user_payload) {
    state.user = user_payload
  },
  [types.SIGN_OUT] (state) {
    state.user = {}
  },
  [types.SET_POSTS] (state, posts_payload) {
    state.posts = posts_payload
  }
}