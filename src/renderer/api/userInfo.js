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

export function get2MarketAmount(params) {
    return request({
        url: "/stockAlert/overallMarket/get2MarketAmount",
        method: "get",
        params,
    });
}

export function getAmountDirection(params) {
    return request({
        url: "/stockAlert/overallMarket/getAmountDirection",
        method: "get",
        params,
    });
}

export function getPlateStockUpstop(params) {
    return request({
        url: "/stockAlert/overallMarketStocks/getPlateStockUpstop",
        method: "get",
        params,
    });
}

export function getContinuousStockUpstop(params) {
    return request({
        url: "/stockAlert/overallMarketStocks/getContinuousStockUpstop",
        method: "get",
        params,
    });
}

export function getHitStocks(params) {
    return request({
        url: "/stockAlert/overallMarket/getHitStocks",
        method: "get",
        params,
    });
}
export function getStockChangePercentAction(params) {
    return request({
        url: "/stockAlert/partStocks/getStockChangePercentAction",
        method: "get",
        params,
    });
}
export function getStockAmountAction(params) {
    return request({
        url: "/stockAlert/partStocks/getStockAmountAction",
        method: "get",
        params,
    });
}
export function getStockChangePercentActionZhong(params) {
    return request({
        url: "/stockAlert/importantStocks/getStockChangePercentAction",
        method: "get",
        params,
    });
}
export function getStockAmountActionZhong(params) {
    return request({
        url: "/stockAlert/importantStocks/getStockAmountAction",
        method: "get",
        params,
    });
}
