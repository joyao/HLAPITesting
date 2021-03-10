"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const alert_1 = require("./emails/alert");
const privateApi = __importStar(require("./loaders/privateApi"));
const publicApi = __importStar(require("./loaders/publicApi"));
const mapServerApi = __importStar(require("./loaders/mapServerApi"));
const otherApi = __importStar(require("./loaders/otherApi"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    let resArray = [];
    // otherApi
    yield otherApi.getRainFallStations().then((res) => {
        resArray.push(res);
    });
    yield otherApi.getRainFallImage().then((res) => {
        resArray.push(res);
    });
    yield otherApi.getRainFallOne().then((res) => {
        resArray.push(res);
    });
    yield otherApi.getRiverWaterWRA().then((res) => {
        resArray.push(res);
    });
    yield otherApi.getRiverWaterHL().then((res) => {
        resArray.push(res);
    });
    yield otherApi.getCCTVStations().then((res) => {
        resArray.push(res);
    });
    yield otherApi.getCCTVSnapShot().then((res) => {
        resArray.push(res);
    });
    yield otherApi.getRadarInfo().then((res) => {
        resArray.push(res);
    });
    yield otherApi.getStatInfo().then((res) => {
        resArray.push(res);
    });
    // privateApi
    yield privateApi.getLandsbySecID().then((res) => {
        resArray.push(res);
    });
    yield privateApi.id_getLandInfobySecLand().then((res) => {
        resArray.push(res);
    });
    yield privateApi.id_getUPInfobySecLand().then((res) => {
        resArray.push(res);
    });
    // publicApi
    yield publicApi.getDoorplate().then((res) => {
        resArray.push(res);
    });
    yield publicApi.getLandPropertyInfo().then((res) => {
        resArray.push(res);
    });
    yield publicApi.getNewOldSecLandIDMapping().then((res) => {
        resArray.push(res);
    });
    yield publicApi.getParcel().then((res) => {
        resArray.push(res);
    });
    yield publicApi.getParcelSpatialQueryNSEPSG3826Point().then((res) => {
        resArray.push(res);
    });
    yield publicApi.getParcelSpatialQueryNSEPSG4326Point().then((res) => {
        resArray.push(res);
    });
    yield publicApi.getParcelSpatialQueryNSSelectByDoorPlate().then((res) => {
        resArray.push(res);
    });
    yield publicApi.getTown().then((res) => {
        resArray.push(res);
    });
    yield publicApi.getUrbanPlanArea().then((res) => {
        resArray.push(res);
    });
    yield publicApi.getUPAreaSpatialQueryNSEPSG3826Point().then((res) => {
        resArray.push(res);
    });
    yield publicApi.getUPAreaSpatialQueryNSEPSG4326Point().then((res) => {
        resArray.push(res);
    });
    yield publicApi.getUPAreaSpatialQueryNSSelectByDoorPlate().then((res) => {
        resArray.push(res);
    });
    // mapServerApi
    yield mapServerApi.ExportWebMap().then((res) => __awaiter(void 0, void 0, void 0, function* () {
        // retry
        if (res.Status !== 200 || res.DataVerified === false) {
            yield mapServerApi.ExportWebMap().then((res_re) => {
                resArray.push(res_re);
            });
        }
        else {
            resArray.push(res);
        }
    }));
    yield alert_1.sendErrorMail(resArray);
}))();
