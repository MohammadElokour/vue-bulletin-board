import * as types from './mutationTypes'

export const login = ({commit}, user_payload) => {
    commit(types.LOGIN, user_payload)
}

export const signup = ({commit}) => {
  commit(types.SIGN_OUT)
}

export const setPosts = ({commit}, posts_payload) => {
  commit(types.SET_POSTS, posts_payload)
}