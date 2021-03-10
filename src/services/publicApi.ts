import { PUBLICAPI_TOKEN } from "../config/config";
import { GoRequest, ReqOption } from "../models/Request";

const TOKEN: string = PUBLICAPI_TOKEN;
const API_HOST: string = "https://map.hl.gov.tw/HLOpenDataAPI";

const headerAuthorization: string = "HLAPIToken " + TOKEN;

class HLPubRequest extends GoRequest {
    constructor(url: string, pathParam: string, data: Object, method: string) {
        const reqOption: ReqOption = new ReqOption("JSON", API_HOST + url, pathParam, data, headerAuthorization);
        super(reqOption, method);
    }
}

export { HLPubRequest };
