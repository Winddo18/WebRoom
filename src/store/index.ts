import { createStore } from 'vuex'

export default createStore({
  state: {
    userID: '',
  },
  mutations: {
    updateID(state, id){
      state.userID = id
    }
  },
  actions: {
	  update(context, id){
      context.commit('updateID', id)
    }
  },
  modules: {
	  
  }
})
