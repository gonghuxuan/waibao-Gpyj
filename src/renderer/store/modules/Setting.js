import { remote } from "electron";
let state = {
    downloadSongsFolders: [`${remote.app.getPath("music")}`],
    swiper: 0,
};

let mutations = {
    add(state, folders) {
        state.downloadSongsFolders = state.downloadSongsFolders.concat(folders);
    },
    SET_FOLDERS(state, folders) {
        console.log(folders);
        state.downloadSongsFolders = state.downloadSongsFolders.concat(folders);
    },
    mutateState(state, payload) {
        state.swiper = payload;
        console.warn(payload);
        console.warn("chufaaaaaaaaaaaaaaaaaaa");
    },
};

const getters = {
    swiper: (state) => (state) => state.swiper,
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
};
