import request from "@/utils/httputils.js";

export function login123(data) {
    console.log(" ininnnnnnnnnnnn");
    return request({
        url: "/share/user/login_auth_check",
        method: "post",
        data,
    });
}
