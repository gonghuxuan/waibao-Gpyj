import ls from "store";
const state = {
    primaryColor: "",
    isChangingColor: false,
    redirect: "/home2",
    partRefreshFlag: false,
    isShowVisual: false,
    isOnline: navigator.onLine,
    noLimitRoutes: ["music_local", "music_download", "setting"],
    platform: process.platform,
    swiper: 0,
};

const mutations = {
    CHANGE_COLOR(state, color) {
        state.primaryColor = color;
        ls.set("DEFAULT_COLOR", color);
    },
    SET_IS_CHANGING_COLOR(state, status) {
        state.isChangingColor = status;
    },
    SET_REDIRECT(state, url) {
        state.redirect = url;
    },
    SHOW_VIEW(state, flag) {
        // console.warn(flag);
        state.isShowVisual = flag;
    },
    SHOW_SWIPER(state, flag) {
        // console.warn(flag);
        state.swiper = flag;
    },
    SET_ONLINE(state, flag) {
        state.isOnline = flag;
    },
};

const actions = {
    toggleColor({ commit }, color) {
        commit("CHANGE_COLOR", color);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
