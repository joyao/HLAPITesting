import { writeApiLog } from "../logs/writeLog";
import { ApiResult, ApiStatus } from "../models/ApiClass";
import { HLOtherJsonRequest, HLOtherXmlRequest, HLOtherImageRequest } from "../services/otherApi";
import { testResultUpdate } from "../services/updateDb";

const TYPE: string = "OtherAPI";
const ADDWSURL: string = "https://map.hl.gov.tw/hlgis/map_comp/widgets/ADDWS/ADDWS.ashx";
const HLGISWS: string = "https://map.hl.gov.tw/HLGIS/ws";

const getRainFallStations: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = ADDWSURL;
    const data: Object = {
        type: "rainfall",
        org: "中央氣象局",
    };
    const param: string = "type=rainfall&org=中央氣象局";
    return await new HLOtherJsonRequest(url, "", data, "GET").RunRequest().then((res: ApiResult) => {
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data);
                const firstLocationData: any = resdata.records.location[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
                if (resdata.success !== "true") {
                    message += "getDataError; ";
                    dataverified = false;
                }
                if (firstLocationData.lat.trim() === "") {
                    message += "nolat; ";
                    dataverified = false;
                }
                if (firstLocationData.lon.trim() === "") {
                    message += "nolon; ";
                    dataverified = false;
                }
                if (firstLocationData.locationName.trim() === "") {
                    message += "nolocationName; ";
                    dataverified = false;
                }
                if (firstLocationData.stationId.trim() === "") {
                    message += "nostationId; ";
                    dataverified = false;
                }
                if (firstLocationData.time.obsTime.trim() === "") {
                    message += "noobsTime; ";
                    dataverified = false;
                }
                if (firstLocationData.weatherElement.length === 0) {
                    message += "noweatherElement; ";
                    dataverified = false;
                }
                if (firstLocationData.parameter.length === 0) {
                    message += "noparameter; ";
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
            "取得雨量站所有測站資料",
            "/ADDWS.ashx?" + param,
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

const getRainFallImage: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = ADDWSURL;
    const data: Object = {
        type: "rainfall",
        org: "中央氣象局",
        format: "image",
    };
    const param: string = "type=rainfall&org=中央氣象局&format=image";
    return await new HLOtherJsonRequest(url, "", data, "GET").RunRequest().then((res: ApiResult) => {
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data);
                const resourceData: any = resdata.resource;
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
                if (resdata.datasetinfo.parameterset.length === 0) {
                    message += "nodatasetinfo; ";
                    dataverified = false;
                }
                if (resdata.time.obsTime.trim() === "") {
                    message += "noobsTime; ";
                    dataverified = false;
                }
                if (resourceData.resourceDesc.trim() === "") {
                    message += "noresourceDesc; ";
                    dataverified = false;
                }
                if (resourceData.mimeType.trim() === "") {
                    message += "nomimeType; ";
                    dataverified = false;
                }
                if (resourceData.uri.trim() === "") {
                    message += "nouri; ";
                    dataverified = false;
                }
                if (resourceData.base64Str.trim() === "") {
                    message += "nobase64Str; ";
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
            "取得雨量站影像",
            "/ADDWS.ashx?" + param,
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

const getRainFallOne: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = ADDWSURL;
    const data: Object = {
        type: "rainfall",
        org: "中央氣象局",
        stid: "C0T9M0",
    };
    const param: string = "type=rainfall&org=中央氣象局&stid=C0T9M0";
    return await new HLOtherJsonRequest(url, "", data, "GET").RunRequest().then((res: ApiResult) => {
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data);
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
                if (resdata.lat.trim() === "") {
                    message += "nolat; ";
                    dataverified = false;
                }
                if (resdata.lon.trim() === "") {
                    message += "nolon; ";
                    dataverified = false;
                }
                if (resdata.locationName.trim() === "") {
                    message += "nolocationName; ";
                    dataverified = false;
                }
                if (resdata.stationId.trim() === "") {
                    message += "nostationId; ";
                    dataverified = false;
                }
                if (resdata.time.obsTime.trim() === "") {
                    message += "noobsTime; ";
                    dataverified = false;
                }
                if (resdata.weatherElement.length === 0) {
                    message += "noweatherElement; ";
                    dataverified = false;
                }
                if (resdata.parameter.length === 0) {
                    message += "noparameter; ";
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
            "取得雨量站單一測站資料",
            "/ADDWS.ashx?" + param,
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

const getRiverWaterWRA: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = ADDWSURL;
    const data: Object = {
        type: "riverwater",
        org: "水利署",
    };
    const param: string = "type=riverwater&org=水利署";
    return await new HLOtherJsonRequest(url, "", data, "GET").RunRequest().then((res: ApiResult) => {
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data)[0];
                if (JSON.parse(res.Data).length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
                if (resdata.Measurement.length === 0) {
                    message += "noMeasurement; ";
                    dataverified = false;
                }
                if (resdata.CrossRiverStructuresNameOfEquipment.trim() === "") {
                    message += "noCrossRiverStructuresNameOfEquipment; ";
                    dataverified = false;
                }
                if (resdata.LocationByTWD97_XY.trim() === "") {
                    message += "noLocationByTWD97_XY; ";
                    dataverified = false;
                }
                if (resdata.BasinIdentifier.trim() === "") {
                    message += "noBasinIdentifier; ";
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
            "取得水利署水情資料",
            "/ADDWS.ashx?" + param,
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

const getRiverWaterHL: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = ADDWSURL;
    const data: Object = {
        type: "riverwater",
        org: "花蓮水利科",
        stid: "ed32abd2-72a5-4830-8668-4f2366dc4506",
    };
    const param: string = "type=riverwater&org=花蓮水利科&stid=ed32abd2-72a5-4830-8668-4f2366dc4506";
    return await new HLOtherJsonRequest(url, "", data, "GET").RunRequest().then((res: ApiResult) => {
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data)[0];
                const PQFullsData: any = resdata.PQFulls;
                if (JSON.parse(res.Data).length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
                if (resdata.STInfo.LatitudeWGS84 === null) {
                    message += "noLatitudeWGS84; ";
                    dataverified = false;
                }
                if (resdata.STInfo.LongitudeWGS84 === null) {
                    message += "noLongitudeWGS84; ";
                    dataverified = false;
                }
                if (resdata.STInfo.Name === null) {
                    message += "noName; ";
                    dataverified = false;
                }
                if (PQFullsData.length === 0) {
                    message += "noParamData; ";
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
            "取得花蓮水利科水情資料",
            "/ADDWS.ashx?" + param,
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

const getCCTVStations: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = ADDWSURL;
    const data: Object = {
        type: "cctv",
        org: "公路總局",
    };
    const param: string = "type=cctv&org=公路總局";
    return await new HLOtherJsonRequest(url, "", data, "GET").RunRequest().then((res: ApiResult) => {
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data)[0];
                if (JSON.parse(res.Data).length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
                if (resdata.CCTVID.trim() === "") {
                    message += "noCCTVID; ";
                    dataverified = false;
                }
                if (resdata.VideoStreamURL.trim() === "") {
                    message += "noVideoStreamURL; ";
                    dataverified = false;
                }
                if (resdata.PositionLon.trim() === "") {
                    message += "noPositionLon; ";
                    dataverified = false;
                }
                if (resdata.PositionLat.trim() === "") {
                    message += "noPositionLat; ";
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
            "取得公路總局CCTV列表",
            "/ADDWS.ashx?" + param,
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

const getCCTVSnapShot: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = "https://thbcctv16.thb.gov.tw/T9-198K+750/snapshot";
    const data: Object = {
        t: Date.now().toString(),
    };
    const param: string = "t=" + Date.now().toString();
    return await new HLOtherImageRequest(url, "", data, "GET").RunRequest().then((res: ApiResult) => {
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                if (res.Data.trim() === "") {
                    message += "noImage; ";
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
            "取得公路總局CCTV即時影像",
            url.replace("https://", "/"),
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

const getRadarInfo: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = ADDWSURL;
    const data: Object = {
        type: "radar",
        org: "中央氣象局",
        format: "image",
    };
    const param: string = "type=radar&org=中央氣象局&format=image";
    return await new HLOtherJsonRequest(url, "", data, "GET").RunRequest().then((res: ApiResult) => {
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data);
                const resourcedata: any = resdata.resource;
                if (JSON.parse(res.Data).length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
                if (resourcedata.mimeType.trim() !== "image/png") {
                    message += "nomimeType; ";
                    dataverified = false;
                }
                if (resourcedata.uri.trim() === "") {
                    message += "nouri; ";
                    dataverified = false;
                }
                if (resourcedata.base64Str.trim() === "") {
                    message += "nobase64Str; ";
                    dataverified = false;
                }
                if (resdata.time.obsTime.trim() === "") {
                    message += "noobsTime; ";
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
            "取得雷達回波圖",
            "/ADDWS.ashx?" + param,
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

//#region 社會經濟資料庫
const GetSTATCode: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = "/GetStatCode.asmx/GetSTATCode";
    const post_data: Object = { x: "313211.265055945", y: "2654232.473498736" };
    return await new HLOtherJsonRequest(HLGISWS + url, "", post_data, "POST").RunRequest().then((res: ApiResult) => {
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                resdata = JSON.parse(JSON.parse(res.Data).d)[0];
                if (resdata === undefined) {
                    message += "noData; ";
                    dataverified = false;
                }
                if (resdata.CODE1.trim() === "") {
                    message += "noCODE1; ";
                    dataverified = false;
                }
                if (resdata.CODE2.trim() === "") {
                    message += "noCODE2; ";
                    dataverified = false;
                }
                if (resdata.CODEBASE.trim() === "") {
                    message += "noCODEBASE; ";
                    dataverified = false;
                }
                if (resdata.COUNTY_ID.trim() === "") {
                    message += "noCOUNTY_ID; ";
                    dataverified = false;
                }
                if (resdata.TOWN_ID.trim() === "") {
                    message += "noTOWN_ID; ";
                    dataverified = false;
                }
                if (resdata.TOWN_NAME.trim() !== "花蓮市") {
                    message += "TOWN_NAMEError; ";
                    dataverified = false;
                }
                if (resdata.VILLAGE_ID.trim() === "") {
                    message += "noVILLAGE_ID; ";
                    dataverified = false;
                }
                if (resdata.VILLAGE_NAME.trim() === "") {
                    message += "noVILLAGE_NAME; ";
                    dataverified = false;
                }
                if (resdata.VILLAGE_SYMBLE.trim() === "") {
                    message += "noVILLAGE_SYMBLE; ";
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
            "取得行政區代碼",
            url,
            res.Status,
            new Date(Date.now()).toLocaleString(),
            message,
            dataverified,
            (new Date().getTime() - start_time) / 1000,
            TYPE
        );
        writeApiLog(data);
        return data;
    });
};

const GetColumnList: (oTargetService: string, oMetaDatCode: string, oSTUnitCode: string) => Promise<ApiStatus> = async (
    oTargetService: string,
    oMetaDatCode: string,
    oSTUnitCode: string
): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = "/GetStatData.ashx";
    const post_data: Object =
        "oTargetService=" +
        oTargetService +
        "&oMethod=GetColumnList&oResultDataType=json&oMetaDatCode=" +
        oMetaDatCode +
        "&oSTUnitCode=" +
        oSTUnitCode;
    const data: Object = {
        oTargetService: oTargetService,
        oMethod: "GetColumnList",
        oResultDataType: "json",
        oMetaDatCode: oMetaDatCode,
        oSTUnitCode: oSTUnitCode,
    };
    return await new HLOtherXmlRequest(HLGISWS + url, "", data, "POST").RunRequest().then((res: ApiResult) => {
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data);
                let onedata: any = resdata.ColumnList[7];
                if (resdata.ColumnList.length < 7) {
                    message += "noData; ";
                    dataverified = false;
                }
                if (onedata.COLUMN_DESC.trim() === "") {
                    message += "noCOLUMN_DESC; ";
                    dataverified = false;
                }
                if (onedata.COLUMN_NAME.trim() === "") {
                    message += "noCOLUMN_NAME; ";
                    dataverified = false;
                }
                if (onedata.DATA_TYPE.trim() === "") {
                    message += "noDATA_TYPE; ";
                    dataverified = false;
                }
                if (onedata.DISPLAY_UNIT.trim() === "") {
                    message += "noDISPLAY_UNIT; ";
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
            "取得人口指標代碼",
            url + "/GetColumnList",
            res.Status,
            new Date(Date.now()).toLocaleString(),
            message,
            dataverified,
            (new Date().getTime() - start_time) / 1000,
            TYPE
        );
        writeApiLog(data);
        return data;
    });
};

const GetSTData: (
    oTargetService: string,
    oMethod: string,
    oMetaDatCode: string,
    oSTUnitCode: string,
    oSelectColumns: string
) => Promise<ApiStatus> = async (
    oTargetService: string,
    oMethod: string,
    oMetaDatCode: string,
    oSTUnitCode: string,
    oSelectColumns: string
): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = "/GetStatData.ashx";
    const post_data: Object =
        "oTargetService=" +
        oTargetService +
        "&oMethod=" +
        oMethod +
        "&oResultDataType=json&oMetaDatCode=" +
        oMetaDatCode +
        "&oSTUnitCode=" +
        oSTUnitCode +
        "&oSelectColumns=" +
        oSelectColumns +
        "&oFilterSTTimes=109Y06M&oCountyId=10015&oFilterCountys=10015&oFilterTowns=10015010&oFilterVillages=10015010-018&oFilterCode2s=A1501-11&oFilterCode1s=A1501-11-013&oFilterCodeBases=A1501-0326-00";
    return await new HLOtherXmlRequest(HLGISWS + url, "", post_data, "POST").RunRequest().then((res: ApiResult) => {
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data);
                let onedata: any = resdata.RowDataList[0];
                if (onedata[oSelectColumns] === null) {
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
            "取得人口指標代碼",
            url + "/" + oMethod,
            res.Status,
            new Date(Date.now()).toLocaleString(),
            message,
            dataverified,
            (new Date().getTime() - start_time) / 1000,
            TYPE
        );
        writeApiLog(data);
        return data;
    });
};

const getStatInfo: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    let message: string = "";
    let dataverified: boolean = true;
    let data: ApiStatus;
    const start_time: number = new Date().getTime();
    await GetSTATCode().then((res: ApiStatus) => {
        if (res.Status !== 200 || res.Memo !== "") {
            dataverified = false;
            message += "GetSTATCode(" + res.Memo + ")";
        }
    });

    await GetColumnList("Admin", "3A1FA_A1C3", "U01VI").then((res: ApiStatus) => {
        if (res.Status !== 200 || res.Memo !== "") {
            dataverified = false;
            message += "GetAdminColumnList(" + res.Memo + ")";
        }
    });

    await GetSTData("Admin", "GetVillageSTData", "3A1FA_A1C1", "U01VI", "P_CNT").then((res: ApiStatus) => {
        if (res.Status !== 200 || res.Memo !== "") {
            dataverified = false;
            message += "GetVillageSTData(" + res.Memo + ")";
        }
    });

    await GetSTData("Stat", "GetCode1STData", "3A1FA_A1C2", "U0201", "P_CNT").then((res: ApiStatus) => {
        if (res.Status !== 200 || res.Memo !== "") {
            dataverified = false;
            message += "GetCode1STData(" + res.Memo + ")";
        }
    });

    data = new ApiStatus(
        "取得社會經濟資料",
        "/HLGIS/WS/GetStatData.ashx",
        message !== "" ? -1 : 200,
        new Date(Date.now()).toLocaleString(),
        message,
        dataverified,
        (new Date().getTime() - start_time) / 1000,
        TYPE
    );
    testResultUpdate(data);
    writeApiLog(data);
    return data;
};
//#endregion

export {
    getRainFallStations,
    getRainFallImage,
    getRainFallOne,
    getRiverWaterWRA,
    getRiverWaterHL,
    getCCTVStations,
    getCCTVSnapShot,
    getRadarInfo,
    getStatInfo,
};
