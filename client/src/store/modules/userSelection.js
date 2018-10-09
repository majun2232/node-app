const userSelection = {
    state: {
      yearselect: '',
    //   monthselect: '',
    //   companyselect:''
    },
    mutations: {
        YearSelect (state, year) {
            state.yearselect = year
          }
    },
    actions: {
      // 侧边栏关闭
      YearSelect: ({ commit }) => {
        commit('Year_Select')
      },
     
    }
  }
  
  export default userSelection