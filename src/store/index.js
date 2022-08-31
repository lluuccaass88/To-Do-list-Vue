import axios from 'axios';
import { createStore } from 'vuex'

export default createStore({
  state: {
    todos: []
  },
  getters: {
  },
  mutations: {
    storeTodos(state, payload){
      state.todos = payload;
    },

    storeTodo(state, payload){
      const index = state.todos.findIndex(todo => todo.id === payload.id)

      console.log(index)

      if(index >= 0){
        state.todos.splice(index, 1, payload)
      }else{
        state.todos.push(payload)
      }
    }, 

    deleteTodo(state, id){
      const index = state.todos.findIndex(todo => todo.id === id)

      if(index >= 0){
        state.todos.splice(index, 1)
      }
    }
  },
  actions: {
    
    getTodos({commit}){
      return axios.get('http://localhost:3000/todos').then((resp) =>{
        commit('storeTodos', resp.data)
        this.todos = resp.data;
      })
    },

    addTodo({commit}, data){
      return axios.post('http://localhost:3000/todos', data).then((resp)=>{
        commit('storeTodo', resp.data)
      })
    },

    updateTodo({commit}, {id, data}){
      console.log(id)
      return axios.put(`http://localhost:3000/todos/${id}`, data).then((resp)=>{
        commit('storeTodo', resp.data)
      })
    },

    deleteTodo({commit}, id){
      return axios.delete(`http://localhost:3000/todos/${id}`).then(()=>{
        commit('deleteTodo', id)
      })
    },

  },
  modules: {
  }
})
