"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HLPrivRequest = void 0;
const config_1 = require("../config/config");
const Request_1 = require("../models/Request");
const TOKEN = config_1.PRIVATEAPI_TOKEN;
const API_HOST = "https://map.hl.gov.tw/HLUPAPI";
const headerAuthorization = "HLAPIToken " + TOKEN;
class HLPrivRequest extends Request_1.GoRequest {
    constructor(url, pathParam, data, method) {
        const reqOption = new Request_1.ReqOption("JSON", API_HOST + url, pathParam, data, headerAuthorization);
        super(reqOption, method);
    }
}
exports.HLPrivRequest = HLPrivRequest;
