"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HLOtherImageRequest = exports.HLOtherXmlRequest = exports.HLOtherJsonRequest = void 0;
const Request_1 = require("../models/Request");
class HLOtherJsonRequest extends Request_1.GoRequest {
    constructor(url, pathParam, data, method) {
        const reqOption = new Request_1.ReqOption("JSON", url, pathParam, data, "");
        super(reqOption, method);
    }
}
exports.HLOtherJsonRequest = HLOtherJsonRequest;
class HLOtherXmlRequest extends Request_1.GoRequest {
    constructor(url, pathParam, data, method) {
        const xmldata = decodeURI(new URLSearchParams(data).toString());
        const reqOption = new Request_1.ReqOption("XML", url, pathParam, xmldata, "");
        super(reqOption, method);
    }
}
exports.HLOtherXmlRequest = HLOtherXmlRequest;
class HLOtherImageRequest extends Request_1.GoRequest {
    constructor(url, pathParam, data, method) {
        const reqOption = new Request_1.ReqOption("IMAGE-jpeg", url, pathParam, data, "");
        super(reqOption, method);
    }
}
exports.HLOtherImageRequest = HLOtherImageRequest;
