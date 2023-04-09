import axios from "axios";
// 根据环境不同引入不同api地址

// create an axios instance
const service = axios.create({
    baseURL: "/gpyj", // url = base api url + request url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 300000, // request timeout
});

// request拦截器 request interceptor
service.interceptors.request.use(
    (config) => {
        // 不传递默认开启loading
        if (!config.hideloading) {
            // loading
            // Toast.loading({
            //     forbidClick: true,
            //     duration: 300000,
            // });
        }
        if (config.method === "get" && config.params?.accessToken) {
            config.headers["accessToken"] = config.params.accessToken;
        } else if (config.method === "post" && config.data?.accessToken) {
            config.headers["accessToken"] = config.data.accessToken;
        } else {
            // if (getItem("accessToken")) {
            //     config.headers["accessToken"] = getItem("accessToken");
            // }
        }
        config.headers["platform"] = "web";

        // console.log('config===' + JSON.stringify(config))
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// respone拦截器
service.interceptors.response.use(
    (response) => {
        try {
            const res = response.data;
            if (res.code && res.code !== 200) {
                if (res.code === 401) {
                    // store.dispatch("FedLogOut").then(() => {
                    //     location.reload();
                    // });
                    // 401
                }
                // Toast(res.errorMessage)
                return Promise.reject(res || "error");
            } else {
                console.log("123");
                console.log(response);
                return Promise.resolve(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    },
    (error) => {
        try {
            // console.log(error.response)
            if (error?.response?.status === 401) {
                // router.push({ path: '/login/emailLogin' })
                // Toast({
                //   message: error?.response?.data?.errorMessage
                // })
                return Promise.reject(error);
            }

            const errorMessage = error?.response?.data?.errorMessage;
            return Promise.reject(error);
        } catch (err) {
            // Toast.clear();
            console.log(err);
        }
    }
);

export default service;
