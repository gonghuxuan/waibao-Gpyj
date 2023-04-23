const state = {
    statusSwiper: 0,
};

const mutations = {
    SET_SWIPER(state, statusSwiper) {
        state.statusSwiper = statusSwiper;
    },
};

const actions = {
    // 设置name
    setSwiper({ commit }, statusSwiper) {
        commit("SET_SWIPER", statusSwiper);
        console.warn("123SET_SWIPER");
    },
};

let getters = {
    statusSwiper: (state) => state.statusSwiper,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
