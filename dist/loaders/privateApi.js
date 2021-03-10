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
exports.id_getUPInfobySecLand = exports.id_getLandInfobySecLand = exports.getLandsbySecID = void 0;
const writeLog_1 = require("../logs/writeLog");
const ApiClass_1 = require("../models/ApiClass");
const privateApi_1 = require("../services/privateApi");
const updateDb_1 = require("../services/updateDb");
const TYPE = "HLUPAPI";
const getLandsbySecID = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "/api/BasicInfo/getLandsbySecID";
    const post_data = {
        Town: "花蓮市",
        SecNum: "0017",
    };
    return yield new privateApi_1.HLPrivRequest(url, "", post_data, "POST").RunRequest().then((res) => {
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data)[0];
                if (resdata.length === 0) {
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
        data = new ApiClass_1.ApiStatus("取得土地資料(利用段號)", url, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.getLandsbySecID = getLandsbySecID;
const id_getLandInfobySecLand = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "/api/Identify/id_getLandInfobySecLand";
    const get_data = "007200550000";
    return yield new privateApi_1.HLPrivRequest(url, get_data, {}, "GET").RunRequest().then((res) => {
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
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
        data = new ApiClass_1.ApiStatus("取得土地資料(利用地段號)", url, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.id_getLandInfobySecLand = id_getLandInfobySecLand;
const id_getUPInfobySecLand = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "/api/Identify/id_getUPInfobySecLand";
    const get_data = "000413190000";
    return yield new privateApi_1.HLPrivRequest(url, get_data, {}, "GET").RunRequest().then((res) => {
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
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
        data = new ApiClass_1.ApiStatus("取得都計資料(利用地段號)", url, res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.id_getUPInfobySecLand = id_getUPInfobySecLand;
