import { PRIVATEAPI_TOKEN } from "../config/config";
import { GoRequest, ReqOption } from "../models/Request";

const TOKEN: string = PRIVATEAPI_TOKEN;
const API_HOST: string = "https://map.hl.gov.tw/HLUPAPI";

const headerAuthorization: string = "HLAPIToken " + TOKEN;

class HLPrivRequest extends GoRequest {
    constructor(url: string, pathParam: string, data: Object, method: string) {
        const reqOption: ReqOption = new ReqOption("JSON", API_HOST + url, pathParam, data, headerAuthorization);
        super(reqOption, method);
    }
}

export { HLPrivRequest };
