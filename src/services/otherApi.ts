import { GoRequest, ReqOption } from "../models/Request";

class HLOtherJsonRequest extends GoRequest {
    constructor(url: string, pathParam: string, data: Object, method: string) {
        const reqOption: ReqOption = new ReqOption("JSON", url, pathParam, data, "");
        super(reqOption, method);
    }
}

class HLOtherXmlRequest extends GoRequest {
    constructor(url: string, pathParam: string, data: Object, method: string) {
        const xmldata: string = decodeURI(new URLSearchParams(data as any).toString());
        const reqOption: ReqOption = new ReqOption("XML", url, pathParam, xmldata, "");
        super(reqOption, method);
    }
}

class HLOtherImageRequest extends GoRequest {
    constructor(url: string, pathParam: string, data: Object, method: string) {
        const reqOption: ReqOption = new ReqOption("IMAGE-jpeg", url, pathParam, data, "");
        super(reqOption, method);
    }
}

export { HLOtherJsonRequest, HLOtherXmlRequest, HLOtherImageRequest };
