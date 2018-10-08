import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
Vue.use(Vuex)

const types = {
  SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED', // 是否认证通过
  SET_USER: 'SET_USER' // 用户信息
}

const state = { // 需要维护的状态
  isAutnenticated: false, // 是否认证
  user: {}, // 存储用户信息
  sidebar: {
    opened: !+Cookies.get('sidebarStatus'),
    withoutAnimation: false
  },
  device: 'desktop'
}

const getters = {
  isAutnenticated: state => state.isAutnenticated,
  user: state => state.user,
  sidebar: state => state.sidebar,

}

const mutations = {
  [types.SET_IS_AUTNENTIATED](state, isAutnenticated) {
    if (isAutnenticated)
      state.isAutnenticated = isAutnenticated
    else
      state.isAutnenticated = false
  },
  [types.SET_USER](state, user) {
    if (user)
      state.user = user
    else
      state.user = {}
  },
  // 侧边栏操作
  TOGGLE_SIDEBAR: state => {
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 1)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  setIsAutnenticated: ({
    commit
  }, isAutnenticated) => {
    commit(types.SET_IS_AUTNENTIATED, isAutnenticated)
  },
  setUser: ({
    commit
  }, user) => {
    commit(types.SET_USER, user)
  },
  clearCurrentState: ({
    commit
  }) => {
    commit(types.SET_IS_AUTNENTIATED, false)
    commit(types.SET_USER, null)
  },
  // 侧边栏关闭
  ToggleSideBar: ({
    commit
  }) => {
    commit('TOGGLE_SIDEBAR')
  },
  CloseSideBar({
    commit
  }, {
    withoutAnimation
  }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  ToggleDevice({
    commit
  }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})