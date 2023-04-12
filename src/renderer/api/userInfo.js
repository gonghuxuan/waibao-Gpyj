import request from "@/utils/httputils.js";

export function login123(data) {
    return request({
        url: "/share/user/login_auth_check",
        method: "post",
        data,
    });
}

export function getExponentNames(params) {
    return request({
        url: "/stockAlert/overallMarket/getExponentNames",
        method: "get",
        params,
    });
}

export function getExponentDivergeSignal(params) {
    return request({
        url: "/stockAlert/overallMarket/getExponentDivergeSignal",
        method: "get",
        params,
    });
}
