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
exports.getUPAreaSpatialQueryNSSelectByDoorPlate = exports.getUPAreaSpatialQueryNSEPSG4326Point = exports.getUPAreaSpatialQueryNSEPSG3826Point = exports.getUrbanPlanArea = exports.getTown = exports.getParcelSpatialQueryNSSelectByDoorPlate = exports.getParcelSpatialQueryNSEPSG4326Point = exports.getParcelSpatialQueryNSEPSG3826Point = exports.getParcel = exports.getNewOldSecLandIDMapping = exports.getLandPropertyInfo = exports.getDoorplate = void 0;
const writeLog_1 = require("../logs/writeLog");
const ApiClass_1 = require("../models/ApiClass");
const publicApi_1 = require("../services/publicApi");
const updateDb_1 = require("../services/updateDb");
const TYPE = "oDataAPI";
const getDoorplate = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "/odata/v1/Doorplate";
    const data = {
        $filter: "COUN_ID eq '花蓮市'",
        $orderby: "GIS_AD",
    };
    return yield new publicApi_1.HLPubRequest(url, "", data, "GET").RunRequest().then((res) => {
        let alldata;
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
                else {
                    if (alldata.filter((o) => o.COUN_ID !== "花蓮市").length !== 0) {
                        message += "filterError; ";
                        dataverified = false;
                    }
                    if (resdata.X === "" || resdata.Y === "") {
                        message += "noGeometry; ";
                        dataverified = false;
                    }
                    if (resdata.GIS_AD.trim() === "") {
                        message += "noGIS_AD; ";
                        dataverified = false;
                    }
                    if (resdata.COUN_ID.trim() === "") {
                        message += "noCOUN_ID; ";
                        dataverified = false;
                    }
                    if (resdata.NEW_ID.trim() === "") {
                        message += "noNEW_ID; ";
                        dataverified = false;
                    }
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
        data = new ApiClass_1.ApiStatus("取得門牌資料", url, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getDoorplate = getDoorplate;
const getLandPropertyInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "/odata/v1/LandPropertyInfo";
    const data = {
        $filter: "LNAMNGR ne null",
    };
    return yield new publicApi_1.HLPubRequest(url, "", data, "GET").RunRequest().then((res) => {
        let alldata;
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
                else {
                    if (alldata.filter((o) => o.LNAMNGR === null).length !== 0) {
                        message += "filterError; ";
                        dataverified = false;
                    }
                    if (resdata.SecLandID.trim() === "") {
                        message += "noSecLandID; ";
                        dataverified = false;
                    }
                    if (resdata.LNAM.trim() === "") {
                        message += "noLNAM; ";
                        dataverified = false;
                    }
                    if (resdata.PropertyType.trim() === "") {
                        message += "noPropertyType; ";
                        dataverified = false;
                    }
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
        data = new ApiClass_1.ApiStatus("取得土地權屬資訊", url, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getLandPropertyInfo = getLandPropertyInfo;
const getNewOldSecLandIDMapping = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "/odata/v1/NewOldSecLandIDMapping";
    const data = {
        $skip: "5",
    };
    return yield new publicApi_1.HLPubRequest(url, "", data, "GET").RunRequest().then((res) => {
        let alldata;
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
                else {
                    if (resdata.NewSecNum.trim() === "") {
                        message += "noNewSecNum; ";
                        dataverified = false;
                    }
                    if (resdata.NewLandNum.trim() === "") {
                        message += "noNewLandNum; ";
                        dataverified = false;
                    }
                    if (resdata.OldSecNum.trim() === "") {
                        message += "noOldSecNum; ";
                        dataverified = false;
                    }
                    if (resdata.OldLandNum.trim() === "") {
                        message += "noOldLandNum; ";
                        dataverified = false;
                    }
                    if (resdata.SecLandID.trim() === "") {
                        message += "noSecLandID; ";
                        dataverified = false;
                    }
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
        data = new ApiClass_1.ApiStatus("新舊地號轉換", url, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getNewOldSecLandIDMapping = getNewOldSecLandIDMapping;
const getParcel = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "/odata/v1/Parcel";
    return yield new publicApi_1.HLPubRequest(url, "", "", "GET").RunRequest().then((res) => {
        let alldata;
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
                else {
                    if (resdata.Shape.Geometry.WellKnownText === "") {
                        message += "noGeometry; ";
                        dataverified = false;
                    }
                    if (resdata.F_NAME.trim() === "") {
                        message += "noF_NAME; ";
                        dataverified = false;
                    }
                    if (resdata.鄉鎮別.trim() === "") {
                        message += "no鄉鎮別; ";
                        dataverified = false;
                    }
                    if (resdata.段代碼.trim() === "") {
                        message += "no段代碼; ";
                        dataverified = false;
                    }
                    if (resdata.LAND_ID.trim() === "") {
                        message += "noLAND_ID; ";
                        dataverified = false;
                    }
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
        data = new ApiClass_1.ApiStatus("取得地籍資料", url, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getParcel = getParcel;
const getParcelSpatialQueryNSEPSG3826Point = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "/odata/v1/Parcel/SpatialQueryNS.EPSG3826Point";
    const post_data = {
        x: "311841.175",
        y: "2652260.122",
    };
    return yield new publicApi_1.HLPubRequest(url, "", post_data, "POST").RunRequest().then((res) => {
        let alldata;
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
                else {
                    if (resdata.Shape.Geometry.WellKnownText === "") {
                        message += "noGeometry; ";
                        dataverified = false;
                    }
                    if (resdata.F_NAME.trim() === "") {
                        message += "noF_NAME; ";
                        dataverified = false;
                    }
                    if (resdata.鄉鎮別.trim() === "") {
                        message += "no鄉鎮別; ";
                        dataverified = false;
                    }
                    if (resdata.段代碼.trim() === "") {
                        message += "no段代碼; ";
                        dataverified = false;
                    }
                    if (resdata.LAND_ID.trim() === "") {
                        message += "noLAND_ID; ";
                        dataverified = false;
                    }
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
        data = new ApiClass_1.ApiStatus("以 EPSG3826點坐標 取得空間交集之地籍資料", url, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getParcelSpatialQueryNSEPSG3826Point = getParcelSpatialQueryNSEPSG3826Point;
const getParcelSpatialQueryNSEPSG4326Point = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "/odata/v1/Parcel/SpatialQueryNS.EPSG4326Point";
    const post_data = {
        x: "121.615457",
        y: "23.991747",
    };
    return yield new publicApi_1.HLPubRequest(url, "", post_data, "POST").RunRequest().then((res) => {
        let alldata;
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
                else {
                    if (resdata.Shape.Geometry.WellKnownText === "") {
                        message += "noGeometry; ";
                        dataverified = false;
                    }
                    if (resdata.F_NAME.trim() === "") {
                        message += "noF_NAME; ";
                        dataverified = false;
                    }
                    if (resdata.鄉鎮別.trim() === "") {
                        message += "no鄉鎮別; ";
                        dataverified = false;
                    }
                    if (resdata.段代碼.trim() === "") {
                        message += "no段代碼; ";
                        dataverified = false;
                    }
                    if (resdata.LAND_ID.trim() === "") {
                        message += "noLAND_ID; ";
                        dataverified = false;
                    }
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
        data = new ApiClass_1.ApiStatus("以 EPSG4326點坐標 取得空間交集之地籍資料", url, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getParcelSpatialQueryNSEPSG4326Point = getParcelSpatialQueryNSEPSG4326Point;
const getParcelSpatialQueryNSSelectByDoorPlate = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "/odata/v1/Parcel/SpatialQueryNS.SelectByDoorPlate";
    const post_data = {
        County: "花蓮市",
        Village: "主力里",
        Address: "主力里10鄰和平路447號",
    };
    return yield new publicApi_1.HLPubRequest(url, "", post_data, "POST").RunRequest().then((res) => {
        let alldata;
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
                else {
                    if (resdata.Shape.Geometry.WellKnownText === "") {
                        message += "noGeometry; ";
                        dataverified = false;
                    }
                    if (resdata.F_NAME.trim() === "") {
                        message += "noF_NAME; ";
                        dataverified = false;
                    }
                    if (resdata.鄉鎮別.trim() === "") {
                        message += "no鄉鎮別; ";
                        dataverified = false;
                    }
                    if (resdata.段代碼.trim() === "") {
                        message += "no段代碼; ";
                        dataverified = false;
                    }
                    if (resdata.LAND_ID.trim() === "") {
                        message += "noLAND_ID; ";
                        dataverified = false;
                    }
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
        data = new ApiClass_1.ApiStatus("以 門牌 取得空間交集之地籍資料", url, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getParcelSpatialQueryNSSelectByDoorPlate = getParcelSpatialQueryNSSelectByDoorPlate;
const getTown = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "/odata/v1/Town";
    const town = "吉安鄉";
    const data = {
        $filter: "TOWN1 eq '" + town + "'",
    };
    return yield new publicApi_1.HLPubRequest(url, "", data, "GET").RunRequest().then((res) => {
        let alldata;
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
                else {
                    if (resdata.VILL.trim() === "") {
                        message += "noVILL; ";
                        dataverified = false;
                    }
                    if (resdata.TOWN1.trim() !== town) {
                        message += "TOWN1Error; ";
                        dataverified = false;
                    }
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
        data = new ApiClass_1.ApiStatus("取得花蓮縣鄉鎮市資訊", url, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getTown = getTown;
const getUrbanPlanArea = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "/odata/v1/UrbanPlanArea";
    const top = 2;
    const data = {
        $orderby: "ZONENAME desc",
        $top: top.toString(),
    };
    return yield new publicApi_1.HLPubRequest(url, "", data, "GET").RunRequest().then((res) => {
        let alldata;
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
                else {
                    if (alldata.length !== top) {
                        message += "dataCountError; ";
                        dataverified = false;
                    }
                    if (resdata.Shape.Geometry.WellKnownText === "") {
                        message += "noGeometry; ";
                        dataverified = false;
                    }
                    if (resdata.ZONENAME.trim() === "") {
                        message += "noZONENAME; ";
                        dataverified = false;
                    }
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
        data = new ApiClass_1.ApiStatus("取得都市計畫整合分區資訊", url, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getUrbanPlanArea = getUrbanPlanArea;
const getUPAreaSpatialQueryNSEPSG3826Point = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "/odata/v1/UrbanPlanArea/SpatialQueryNS.EPSG3826Point";
    const post_data = {
        x: "311479.978",
        y: "2654225.638",
    };
    return yield new publicApi_1.HLPubRequest(url, "", post_data, "POST").RunRequest().then((res) => {
        let alldata;
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
                else {
                    if (resdata.Shape.Geometry.WellKnownText === "") {
                        message += "noGeometry; ";
                        dataverified = false;
                    }
                    if (resdata.ZONENAME.trim() === "") {
                        message += "noZONENAME; ";
                        dataverified = false;
                    }
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
        data = new ApiClass_1.ApiStatus("以 EPSG3826點坐標 取得空間交集之都市計畫整合分區資訊", url, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getUPAreaSpatialQueryNSEPSG3826Point = getUPAreaSpatialQueryNSEPSG3826Point;
const getUPAreaSpatialQueryNSEPSG4326Point = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "/odata/v1/UrbanPlanArea/SpatialQueryNS.EPSG4326Point";
    const post_data = {
        x: "121.615457",
        y: "23.991747",
    };
    return yield new publicApi_1.HLPubRequest(url, "", post_data, "POST").RunRequest().then((res) => {
        let alldata;
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
                else {
                    if (resdata.Shape.Geometry.WellKnownText === "") {
                        message += "noGeometry; ";
                        dataverified = false;
                    }
                    if (resdata.ZONENAME.trim() === "") {
                        message += "noZONENAME; ";
                        dataverified = false;
                    }
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
        data = new ApiClass_1.ApiStatus("以 EPSG4326點坐標 取得空間交集之都市計畫整合分區資訊", url, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getUPAreaSpatialQueryNSEPSG4326Point = getUPAreaSpatialQueryNSEPSG4326Point;
const getUPAreaSpatialQueryNSSelectByDoorPlate = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "/odata/v1/UrbanPlanArea/SpatialQueryNS.SelectByDoorPlate";
    const post_data = {
        County: "花蓮市",
        Village: "主力里",
        Address: "主力里10鄰和平路447號",
    };
    return yield new publicApi_1.HLPubRequest(url, "", post_data, "POST").RunRequest().then((res) => {
        let alldata;
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                }
                else {
                    if (resdata.Shape.Geometry.WellKnownText === "") {
                        message += "noGeometry; ";
                        dataverified = false;
                    }
                    if (resdata.ZONENAME.trim() === "") {
                        message += "noZONENAME; ";
                        dataverified = false;
                    }
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
        data = new ApiClass_1.ApiStatus("以 門牌 取得空間交集之都市計畫整合分區資訊", url, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getUPAreaSpatialQueryNSSelectByDoorPlate = getUPAreaSpatialQueryNSSelectByDoorPlate;
