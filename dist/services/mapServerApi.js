"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hlMapServerPostRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const ApiClass_1 = require("../models/ApiClass");
const fs_1 = require("fs");
const config_1 = require("../config/config");
const PROXY = "https://map.hl.gov.tw/HLUPWeb/proxy_arcgis/proxy.ashx?";
const API_HOST = PROXY + "https://map.hl.gov.tw/arcgis/rest/services";
const USER_NAME = config_1.MAPSERVICE_USER_NAME;
const PASSWORD = config_1.MAPSERVICE_PASSWORD;
let TOKEN = "";
const httpsAgent = new https_1.default.Agent({
    rejectUnauthorized: false,
});
const readTokenfromFile = () => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    const tokenstring = () => fs_1.readFileSync("./token.json", { encoding: "utf8" });
    try {
        token = JSON.parse(tokenstring());
    }
    catch (_a) {
        token = {
            token: "",
            expires: 0,
            ssl: true,
        };
    }
    return Promise.resolve(token);
});
const writeToken2File = (tokenInfo) => {
    fs_1.writeFile("token.json", tokenInfo, "utf8", function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });
};
const hlGenerateToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        url: "https://map.hl.gov.tw/arcgis/sharing/rest/generateToken",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: "username=" + USER_NAME + "&password=" + PASSWORD + "&ip=&referer=&client=requestip&expiration=60&f=pjson",
        httpsAgent: httpsAgent,
    };
    yield readTokenfromFile().then((res) => __awaiter(void 0, void 0, void 0, function* () {
        let lastTokenInfo = res;
        // let result: ApiResult = new ApiResult(-1, "{}");
        try {
            if (Date.now() >= lastTokenInfo.expires || res.token === "" || res.token === undefined) {
                return yield axios_1.default(options)
                    .then(function (response) {
                    console.log(response.data);
                    // result = new ApiResult(response.status, JSON.stringify(response.data));
                    // return result;
                    TOKEN = response.data.token;
                    writeToken2File(JSON.stringify(response.data));
                })
                    .catch(function (error) {
                    // console.log(error.toJSON());
                    // result = new ApiResult(error.response.status, "{}");
                    // return result;
                });
            }
            else {
                lastTokenInfo = res;
                TOKEN = res.token;
            }
        }
        catch (error) {
            TOKEN = "";
            writeToken2File("");
        }
    }));
    return Promise.resolve(TOKEN);
});
const hlMapServerRequestRun = (options) => __awaiter(void 0, void 0, void 0, function* () {
    // await hlGenerateToken();
    options.httpsAgent = httpsAgent;
    let result = new ApiClass_1.ApiResult(-1, "{}");
    return yield hlGenerateToken().then((token) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(options);
        if (!token || token === "") {
            return result;
        }
        else {
            return yield axios_1.default(options)
                .then(function (response) {
                // console.log(response.data);
                result = new ApiClass_1.ApiResult(response.status, JSON.stringify(response.data));
                return result;
            })
                .catch(function (error) {
                try {
                    // console.log(error.toJSON());
                    result = new ApiClass_1.ApiResult(error.response.status, "{}");
                }
                catch (_a) {
                    result = new ApiClass_1.ApiResult(-1, "{}");
                }
                return result;
            });
        }
    }));
});
const submitJob = (url, data) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        url: API_HOST + url,
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: TOKEN,
        },
        data: data,
    };
    const result = yield hlMapServerRequestRun(options);
    return result;
});
const getJobResultStatus = (submitJobResult) => __awaiter(void 0, void 0, void 0, function* () {
    const JobOptions = {
        url: API_HOST +
            "/GP/ExportWebMap/GPServer/Export%20Web%20Map/jobs/" +
            JSON.parse(submitJobResult.Data).jobId +
            "?f=json",
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            token: TOKEN,
        },
    };
    let JobResult = yield hlMapServerRequestRun(JobOptions);
    let count = 1;
    const interval = (JobOptions) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                let tempJobResult = yield hlMapServerRequestRun(JobOptions);
                resolve(tempJobResult);
            }), 1000);
        });
    });
    for (let i = 0; i < 30; i += 1) {
        let r = yield interval(JobOptions).then((jbr) => {
            // if (count !== 0 && JSON.parse(JobResult.Data).jobStatus === "esriJobSucceeded") {
            //     return JobResult;
            // }
            return jbr;
        });
        JobResult = r;
        if (i !== 0 && JSON.parse(r.Data).jobStatus === "esriJobSucceeded") {
            break;
        }
        count += 1;
        // console.log(JobResult);
    }
    return JobResult;
});
const getJobResultUrl = (JobStatueResult) => __awaiter(void 0, void 0, void 0, function* () {
    const JobUrlOptions = {
        url: API_HOST +
            "/GP/ExportWebMap/GPServer/Export%20Web%20Map/jobs/" +
            JSON.parse(JobStatueResult.Data).jobId +
            "/results/Output_File?f=json&returnType=data",
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            token: TOKEN,
        },
    };
    let JobUrlResult;
    if (JSON.parse(JobStatueResult.Data).jobStatus === "esriJobSucceeded") {
        JobUrlResult = yield hlMapServerRequestRun(JobUrlOptions);
    }
    else {
        JobUrlResult = new ApiClass_1.ApiResult(-1, "{}");
    }
    return JobUrlResult;
});
const hlMapServerPostRequest = (url, data) => __awaiter(void 0, void 0, void 0, function* () {
    const submitJobResult = yield submitJob(url, data);
    const JobResultStatus = submitJobResult.Status === 200 ? yield getJobResultStatus(submitJobResult) : submitJobResult;
    const JobResultUrl = JobResultStatus.Status === 200 ? yield getJobResultUrl(JobResultStatus) : JobResultStatus;
    return JobResultUrl;
});
exports.hlMapServerPostRequest = hlMapServerPostRequest;
