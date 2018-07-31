import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, setUsername, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'


const user = {
  state: {
    token: getToken(),
    name: '',
    //avatar: '',
    //roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    //SET_AVATAR: (state, avatar) => {
    //  state.avatar = avatar
    //},
    //SET_ROLES: (state, roles) => {
    //  state.roles = roles
    //}
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data;
          if(data.msg && data.msg !== ''){
            Message.info(data.msg);
          }
          if(data.token){
            setToken(data.token);
            setUsername(username);
            commit('SET_TOKEN', data.token)
            commit('SET_NAME', username);
            resolve();
          }else {
            if(!data.id){
              Message.error('无效的服务器')
            }
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          //commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          //commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then((response) => {
          var data = response.data;
          if(data.msg && data.msg !== ''){
            Message.info(data.msg);
          }
          commit('SET_TOKEN', '');
          commit('SET_NAME', '');
          //commit('SET_ROLES', []);
          window.sessionStorage.clear();
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
