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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatInfo = exports.getRadarInfo = exports.getCCTVSnapShot = exports.getCCTVStations = exports.getRiverWaterHL = exports.getRiverWaterWRA = exports.getRainFallOne = exports.getRainFallImage = exports.getRainFallStations = void 0;
const writeLog_1 = require("../logs/writeLog");
const ApiClass_1 = require("../models/ApiClass");
const otherApi_1 = require("../services/otherApi");
const updateDb_1 = require("../services/updateDb");
const TYPE = "OtherAPI";
const ADDWSURL = "https://map.hl.gov.tw/hlgis/map_comp/widgets/ADDWS/ADDWS.ashx";
const HLGISWS = "https://map.hl.gov.tw/HLGIS/ws";
const getRainFallStations = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = ADDWSURL;
    const data = {
        type: "rainfall",
        org: "中央氣象局",
    };
    const param = "type=rainfall&org=中央氣象局";
    return yield new otherApi_1.HLOtherJsonRequest(url, "", data, "GET").RunRequest().then((res) => {
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data);
                const firstLocationData = resdata.records.location[0];
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
            }
            catch (_a) {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        }
        else {
            dataverified = false;
        }
        data = new ApiClass_1.ApiStatus("取得雨量站所有測站資料", "/ADDWS.ashx?" + param, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getRainFallStations = getRainFallStations;
const getRainFallImage = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = ADDWSURL;
    const data = {
        type: "rainfall",
        org: "中央氣象局",
        format: "image",
    };
    const param = "type=rainfall&org=中央氣象局&format=image";
    return yield new otherApi_1.HLOtherJsonRequest(url, "", data, "GET").RunRequest().then((res) => {
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data);
                const resourceData = resdata.resource;
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
            }
            catch (_a) {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        }
        else {
            dataverified = false;
        }
        data = new ApiClass_1.ApiStatus("取得雨量站影像", "/ADDWS.ashx?" + param, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getRainFallImage = getRainFallImage;
const getRainFallOne = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = ADDWSURL;
    const data = {
        type: "rainfall",
        org: "中央氣象局",
        stid: "C0T9M0",
    };
    const param = "type=rainfall&org=中央氣象局&stid=C0T9M0";
    return yield new otherApi_1.HLOtherJsonRequest(url, "", data, "GET").RunRequest().then((res) => {
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
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
            }
            catch (_a) {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        }
        else {
            dataverified = false;
        }
        data = new ApiClass_1.ApiStatus("取得雨量站單一測站資料", "/ADDWS.ashx?" + param, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getRainFallOne = getRainFallOne;
const getRiverWaterWRA = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = ADDWSURL;
    const data = {
        type: "riverwater",
        org: "水利署",
    };
    const param = "type=riverwater&org=水利署";
    return yield new otherApi_1.HLOtherJsonRequest(url, "", data, "GET").RunRequest().then((res) => {
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
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
            }
            catch (_a) {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        }
        else {
            dataverified = false;
        }
        data = new ApiClass_1.ApiStatus("取得水利署水情資料", "/ADDWS.ashx?" + param, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getRiverWaterWRA = getRiverWaterWRA;
const getRiverWaterHL = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = ADDWSURL;
    const data = {
        type: "riverwater",
        org: "花蓮水利科",
        stid: "ed32abd2-72a5-4830-8668-4f2366dc4506",
    };
    const param = "type=riverwater&org=花蓮水利科&stid=ed32abd2-72a5-4830-8668-4f2366dc4506";
    return yield new otherApi_1.HLOtherJsonRequest(url, "", data, "GET").RunRequest().then((res) => {
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data)[0];
                const PQFullsData = resdata.PQFulls;
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
            }
            catch (_a) {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        }
        else {
            dataverified = false;
        }
        data = new ApiClass_1.ApiStatus("取得花蓮水利科水情資料", "/ADDWS.ashx?" + param, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getRiverWaterHL = getRiverWaterHL;
const getCCTVStations = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = ADDWSURL;
    const data = {
        type: "cctv",
        org: "公路總局",
    };
    const param = "type=cctv&org=公路總局";
    return yield new otherApi_1.HLOtherJsonRequest(url, "", data, "GET").RunRequest().then((res) => {
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
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
            }
            catch (_a) {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        }
        else {
            dataverified = false;
        }
        data = new ApiClass_1.ApiStatus("取得公路總局CCTV列表", "/ADDWS.ashx?" + param, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getCCTVStations = getCCTVStations;
const getCCTVSnapShot = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "https://thbcctv16.thb.gov.tw/T9-198K+750/snapshot";
    const data = {
        t: Date.now().toString(),
    };
    const param = "t=" + Date.now().toString();
    return yield new otherApi_1.HLOtherImageRequest(url, "", data, "GET").RunRequest().then((res) => {
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                if (res.Data.trim() === "") {
                    message += "noImage; ";
                    dataverified = false;
                }
            }
            catch (_a) {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        }
        else {
            dataverified = false;
        }
        data = new ApiClass_1.ApiStatus("取得公路總局CCTV即時影像", url.replace("https://", "/"), res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getCCTVSnapShot = getCCTVSnapShot;
const getRadarInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = ADDWSURL;
    const data = {
        type: "radar",
        org: "中央氣象局",
        format: "image",
    };
    const param = "type=radar&org=中央氣象局&format=image";
    return yield new otherApi_1.HLOtherJsonRequest(url, "", data, "GET").RunRequest().then((res) => {
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data);
                const resourcedata = resdata.resource;
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
            }
            catch (_a) {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        }
        else {
            dataverified = false;
        }
        data = new ApiClass_1.ApiStatus("取得雷達回波圖", "/ADDWS.ashx?" + param, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getRadarInfo = getRadarInfo;
//#region 社會經濟資料庫
const GetSTATCode = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "/GetStatCode.asmx/GetSTATCode";
    const post_data = { x: "313211.265055945", y: "2654232.473498736" };
    return yield new otherApi_1.HLOtherJsonRequest(HLGISWS + url, "", post_data, "POST").RunRequest().then((res) => {
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
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
            }
            catch (_a) {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        }
        else {
            dataverified = false;
        }
        data = new ApiClass_1.ApiStatus("取得行政區代碼", url, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
const GetColumnList = (oTargetService, oMetaDatCode, oSTUnitCode) => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "/GetStatData.ashx";
    const post_data = "oTargetService=" +
        oTargetService +
        "&oMethod=GetColumnList&oResultDataType=json&oMetaDatCode=" +
        oMetaDatCode +
        "&oSTUnitCode=" +
        oSTUnitCode;
    const data = {
        oTargetService: oTargetService,
        oMethod: "GetColumnList",
        oResultDataType: "json",
        oMetaDatCode: oMetaDatCode,
        oSTUnitCode: oSTUnitCode,
    };
    return yield new otherApi_1.HLOtherXmlRequest(HLGISWS + url, "", data, "POST").RunRequest().then((res) => {
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data);
                let onedata = resdata.ColumnList[7];
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
            }
            catch (_a) {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        }
        else {
            dataverified = false;
        }
        data = new ApiClass_1.ApiStatus("取得人口指標代碼", url + "/GetColumnList", res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
const GetSTData = (oTargetService, oMethod, oMetaDatCode, oSTUnitCode, oSelectColumns) => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "/GetStatData.ashx";
    const post_data = "oTargetService=" +
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
    return yield new otherApi_1.HLOtherXmlRequest(HLGISWS + url, "", post_data, "POST").RunRequest().then((res) => {
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data);
                let onedata = resdata.RowDataList[0];
                if (onedata[oSelectColumns] === null) {
                    message += "noData; ";
                    dataverified = false;
                }
            }
            catch (_a) {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        }
        else {
            dataverified = false;
        }
        data = new ApiClass_1.ApiStatus("取得人口指標代碼", url + "/" + oMethod, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
const getStatInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    let message = "";
    let dataverified = true;
    let data;
    const start_time = new Date().getTime();
    yield GetSTATCode().then((res) => {
        if (res.Status !== 200 || res.Memo !== "") {
            dataverified = false;
            message += "GetSTATCode(" + res.Memo + ")";
        }
    });
    yield GetColumnList("Admin", "3A1FA_A1C3", "U01VI").then((res) => {
        if (res.Status !== 200 || res.Memo !== "") {
            dataverified = false;
            message += "GetAdminColumnList(" + res.Memo + ")";
        }
    });
    yield GetSTData("Admin", "GetVillageSTData", "3A1FA_A1C1", "U01VI", "P_CNT").then((res) => {
        if (res.Status !== 200 || res.Memo !== "") {
            dataverified = false;
            message += "GetVillageSTData(" + res.Memo + ")";
        }
    });
    yield GetSTData("Stat", "GetCode1STData", "3A1FA_A1C2", "U0201", "P_CNT").then((res) => {
        if (res.Status !== 200 || res.Memo !== "") {
            dataverified = false;
            message += "GetCode1STData(" + res.Memo + ")";
        }
    });
    data = new ApiClass_1.ApiStatus("取得社會經濟資料", "/HLGIS/WS/GetStatData.ashx", message !== "" ? -1 : 200, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
    updateDb_1.testResultUpdate(data);
    writeLog_1.writeApiLog(data);
    return data;
});
exports.getStatInfo = getStatInfo;
