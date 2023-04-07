import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import db from "./datastore";
import "./plugins/andt-design-vue";
import "./plugins/vue-lazyload";
import "./plugins/infinite-loading";
import "./filters";
import "./directives";
import createdInit from "./core/createdInit";
import "./styles/index.less";
import { errorCaptured } from "./utils/assist";
import vueParticles from "vue-particles";
import Vcomp from "./components/dataV/index";
import Toast from "./components/dataV/toast";

import "@/assets/styles/base.scss";
import "@/assets/styles/common.scss";
import "@/assets/iconfont/iconfont.css";

Vue.use(vueParticles);
Vue.use(Vcomp);
Vue.prototype.$Toast = Toast;
Vue.prototype.$db = db;
Vue.prototype.$errorCaptured = errorCaptured;
if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    created() {
        createdInit();
    },
    template: "<App/>",
}).$mount("#app");
