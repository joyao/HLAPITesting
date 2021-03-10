import { writeApiLog } from "../logs/writeLog";
import { ApiResult, ApiStatus } from "../models/ApiClass";
import { HLPrivRequest } from "../services/privateApi";
import { testResultUpdate } from "../services/updateDb";

const TYPE: string = "HLUPAPI";

const getLandsbySecID: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = "/api/BasicInfo/getLandsbySecID";
    const post_data: Object = {
        Town: "花蓮市",
        SecNum: "0017",
    };
    return await new HLPrivRequest(url, "", post_data, "POST").RunRequest().then((res: ApiResult) => {
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data)[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
            } catch {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        } else {
            dataverified = false;
        }
        data = new ApiStatus(
            "取得土地資料(利用段號)",
            url,
            res.Status,
            new Date(Date.now()).toLocaleString(),
            message,
            dataverified,
            (new Date().getTime() - start_time) / 1000,
            TYPE
        );
        testResultUpdate(data);
        writeApiLog(data);
        return data;
    });
};

const id_getLandInfobySecLand: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = "/api/Identify/id_getLandInfobySecLand";
    const get_data: string = "007200550000";

    return await new HLPrivRequest(url, get_data, {}, "GET").RunRequest().then((res: ApiResult) => {
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data)[0];
                if (resdata.Geometry === "") {
                    message += "noGeometry; ";
                    dataverified = false;
                }
                if (resdata.LNAM.trim() === "") {
                    message += "noLNAM; ";
                    dataverified = false;
                }
                if (resdata.AA05.trim() === "") {
                    message += "noAA05; ";
                    dataverified = false;
                }
            } catch {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        } else {
            dataverified = false;
        }
        data = new ApiStatus(
            "取得土地資料(利用地段號)",
            url,
            res.Status,
            new Date(Date.now()).toLocaleString(),
            message,
            dataverified,
            (new Date().getTime() - start_time) / 1000,
            TYPE
        );
        testResultUpdate(data);
        writeApiLog(data);
        return data;
    });
};

const id_getUPInfobySecLand: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = "/api/Identify/id_getUPInfobySecLand";
    const get_data: string = "000413190000";

    return await new HLPrivRequest(url, get_data, {}, "GET").RunRequest().then((res: ApiResult) => {
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;
        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data)[0];
                if (resdata.Geometry === "") {
                    message += "noGeometry; ";
                    dataverified = false;
                }
                if (resdata.UPZone.trim() === "") {
                    message += "noUPZone; ";
                    dataverified = false;
                }
                if (resdata.UPCaseName.trim() === "") {
                    message += "noUPCaseName; ";
                    dataverified = false;
                }
            } catch {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        } else {
            dataverified = false;
        }
        data = new ApiStatus(
            "取得都計資料(利用地段號)",
            url,
            res.Status,
            new Date(Date.now()).toLocaleString(),
            message,
            dataverified,
            (new Date().getTime() - start_time) / 1000,
            TYPE
        );
        testResultUpdate(data);
        writeApiLog(data);
        return data;
    });
};

export { getLandsbySecID, id_getLandInfobySecLand, id_getUPInfobySecLand };
