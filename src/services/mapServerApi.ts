import axios from "axios";
import https from "https";
import { ApiResult } from "../models/ApiClass";
import { writeFile, readFileSync } from "fs";
import { MAPSERVICE_USER_NAME, MAPSERVICE_PASSWORD } from "../config/config";

const PROXY: string = "https://map.hl.gov.tw/HLUPWeb/proxy_arcgis/proxy.ashx?";
const API_HOST: string = PROXY + "https://map.hl.gov.tw/arcgis/rest/services";
const USER_NAME: string = MAPSERVICE_USER_NAME;
const PASSWORD: string = MAPSERVICE_PASSWORD;
let TOKEN: string = "";
const httpsAgent: object = new https.Agent({
    rejectUnauthorized: false,
});

const readTokenfromFile: () => Promise<any> = async (): Promise<any> => {
    let token: any;
    const tokenstring: any = () => readFileSync("./token.json", { encoding: "utf8" });
    try {
        token = JSON.parse(tokenstring());
    } catch {
        token = {
            token: "",
            expires: 0,
            ssl: true,
        };
    }
    return Promise.resolve(token);
};

const writeToken2File: (tokenInfo: any) => void = (tokenInfo: any): void => {
    writeFile("token.json", tokenInfo, "utf8", function (err: any): void {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });
};

const hlGenerateToken: () => Promise<any> = async () => {
    const options: object = {
        url: "https://map.hl.gov.tw/arcgis/sharing/rest/generateToken",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data:
            "username=" + USER_NAME + "&password=" + PASSWORD + "&ip=&referer=&client=requestip&expiration=60&f=pjson",
        httpsAgent: httpsAgent,
    };
    await readTokenfromFile().then(async (res) => {
        let lastTokenInfo: any = res;
        // let result: ApiResult = new ApiResult(-1, "{}");
        try {
            if (Date.now() >= lastTokenInfo.expires || res.token === "" || res.token === undefined) {
                return await axios(options)
                    .then(function (response: any): void {
                        console.log(response.data);
                        // result = new ApiResult(response.status, JSON.stringify(response.data));
                        // return result;
                        TOKEN = response.data.token;
                        writeToken2File(JSON.stringify(response.data));
                    })
                    .catch(function (error: any): void {
                        // console.log(error.toJSON());
                        // result = new ApiResult(error.response.status, "{}");
                        // return result;
                    });
            } else {
                lastTokenInfo = res;
                TOKEN = res.token;
            }
        } catch (error) {
            TOKEN = "";
            writeToken2File("");
        }
    });
    return Promise.resolve(TOKEN);
};

const hlMapServerRequestRun: (options: any) => Promise<any> = async (options: any) => {
    // await hlGenerateToken();
    options.httpsAgent = httpsAgent;
    let result: ApiResult = new ApiResult(-1, "{}");
    return await hlGenerateToken().then(async (token) => {
        // console.log(options);
        if (!token || token === "") {
            return result;
        } else {
            return await axios(options)
                .then(function (response: any): ApiResult {
                    // console.log(response.data);
                    result = new ApiResult(response.status, JSON.stringify(response.data));
                    return result;
                })
                .catch(function (error: any): ApiResult {
                    try {
                        // console.log(error.toJSON());
                        result = new ApiResult(error.response.status, "{}");
                    } catch {
                        result = new ApiResult(-1, "{}");
                    }
                    return result;
                });
        }
    });
};

const submitJob: (url: string, data: object) => Promise<any> = async (url: string, data: object): Promise<any> => {
    const options: any = {
        url: API_HOST + url,
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: TOKEN,
        },
        data: data,
    };
    const result: ApiResult = await hlMapServerRequestRun(options);
    return result;
};

const getJobResultStatus: (submitJobResult: any) => Promise<any> = async (submitJobResult: any): Promise<any> => {
    const JobOptions: any = {
        url:
            API_HOST +
            "/GP/ExportWebMap/GPServer/Export%20Web%20Map/jobs/" +
            JSON.parse(submitJobResult.Data).jobId +
            "?f=json",
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            token: TOKEN,
        },
    };
    let JobResult: ApiResult = await hlMapServerRequestRun(JobOptions);
    let count: number = 1;
    const interval: (JobOptions: any) => Promise<ApiResult> = async (JobOptions: any): Promise<ApiResult> => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                let tempJobResult: ApiResult = await hlMapServerRequestRun(JobOptions);
                resolve(tempJobResult);
            }, 1000);
        });
    };

    for (let i: number = 0; i < 30; i += 1) {
        let r: ApiResult = await interval(JobOptions).then((jbr) => {
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
};

const getJobResultUrl: (JobStatueResult: any) => Promise<any> = async (JobStatueResult: any): Promise<any> => {
    const JobUrlOptions: any = {
        url:
            API_HOST +
            "/GP/ExportWebMap/GPServer/Export%20Web%20Map/jobs/" +
            JSON.parse(JobStatueResult.Data).jobId +
            "/results/Output_File?f=json&returnType=data",
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            token: TOKEN,
        },
    };
    let JobUrlResult: ApiResult;
    if (JSON.parse(JobStatueResult.Data).jobStatus === "esriJobSucceeded") {
        JobUrlResult = await hlMapServerRequestRun(JobUrlOptions);
    } else {
        JobUrlResult = new ApiResult(-1, "{}");
    }
    return JobUrlResult;
};

const hlMapServerPostRequest: (url: string, data: Object) => Promise<ApiResult> = async (url: string, data: Object) => {
    const submitJobResult: ApiResult = await submitJob(url, data);
    const JobResultStatus: ApiResult =
        submitJobResult.Status === 200 ? await getJobResultStatus(submitJobResult) : submitJobResult;
    const JobResultUrl: ApiResult =
        JobResultStatus.Status === 200 ? await getJobResultUrl(JobResultStatus) : JobResultStatus;

    return JobResultUrl;
};

export { hlMapServerPostRequest };
