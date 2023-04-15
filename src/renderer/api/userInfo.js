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

export function getLetfStocks(params) {
    return request({
        url: "/stockAlert/overallMarketStocks/getLetfStocks",
        method: "get",
        params,
    });
}

export function getStockDataLine(params) {
    return request({
        url: "/stockAlert/overallMarketStocks/getStockDataLine",
        method: "get",
        params,
    });
}
