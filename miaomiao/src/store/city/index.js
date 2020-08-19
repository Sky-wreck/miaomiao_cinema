const state = {
    name : window.localStorage.getItem('nowName') || '北京',
    cityId : window.localStorage.getItem('nowId') || 110110
};

const action = {

};

const mutations = {
    CITY_INFO(state, payload){
        state.name = payload.name
        state.cityId = payload.cityId
    }
};

export default{
    namespaced : true,
    state,
    action,
    mutations
}