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
exports.ExportWebMap = void 0;
const writeLog_1 = require("../logs/writeLog");
const ApiClass_1 = require("../models/ApiClass");
const mapServerApi_1 = require("../services/mapServerApi");
const updateDb_1 = require("../services/updateDb");
const TYPE = "ArcGISServer";
const ExportWebMap = () => __awaiter(void 0, void 0, void 0, function* () {
    const start_time = new Date().getTime();
    const url = "/GP/ExportWebMap/GPServer/Export%20Web%20Map/submitJob";
    const post_data = "f=json&Web_Map_as_JSON=%7B%22mapOptions%22%3A%7B%22showAttribution%22%3Atrue%2C%22extent%22%3A%7B%22xmin%22%3A311204.6630118131%2C%22ymin%22%3A2654023.855012591%2C%22xmax%22%3A311513.9615470769%2C%22ymax%22%3A2654261.1867372543%2C%22spatialReference%22%3A%7B%22wkid%22%3A3826%7D%7D%2C%22spatialReference%22%3A%7B%22wkid%22%3A3826%7D%2C%22scale%22%3A1000%7D%2C%22operationalLayers%22%3A%5B%7B%22id%22%3A%22basemap%22%2C%22title%22%3A%22basemap%22%2C%22opacity%22%3A1%2C%22minScale%22%3A0%2C%22maxScale%22%3A0%2C%22url%22%3A%22https%3A%2F%2Fmap.hl.gov.tw%2Farcgis%2Frest%2Fservices%2FHuBaseMap%2FMapServer%22%7D%2C%7B%22id%22%3A%22Civil_9%22%2C%22title%22%3A%22Civil_9%22%2C%22opacity%22%3A1%2C%22minScale%22%3A0%2C%22maxScale%22%3A0%2C%22url%22%3A%22https%3A%2F%2Fmap.hl.gov.tw%2Farcgis%2Frest%2Fservices%2FHLWarehouse%2FCivil%2FMapServer%22%2C%22visibleLayers%22%3A%5B-1%5D%7D%2C%7B%22id%22%3A%22Civil_8%22%2C%22title%22%3A%22Civil_8%22%2C%22opacity%22%3A1%2C%22minScale%22%3A0%2C%22maxScale%22%3A0%2C%22url%22%3A%22https%3A%2F%2Fmap.hl.gov.tw%2Farcgis%2Frest%2Fservices%2FHLWarehouse%2FCivil%2FMapServer%22%2C%22visibleLayers%22%3A%5B-1%5D%7D%2C%7B%22id%22%3A%22Civil_1%22%2C%22title%22%3A%22Civil_1%22%2C%22opacity%22%3A1%2C%22minScale%22%3A0%2C%22maxScale%22%3A0%2C%22url%22%3A%22https%3A%2F%2Fmap.hl.gov.tw%2Farcgis%2Frest%2Fservices%2FHLWarehouse%2FCivil%2FMapServer%22%2C%22layers%22%3A%5B%7B%22id%22%3A1%2C%22layerDefinition%22%3A%7B%22source%22%3A%7B%22type%22%3A%22mapLayer%22%2C%22mapLayerId%22%3A1%7D%7D%7D%5D%7D%2C%7B%22id%22%3A%22Land_1%22%2C%22title%22%3A%22Land_1%22%2C%22opacity%22%3A1%2C%22minScale%22%3A0%2C%22maxScale%22%3A0%2C%22url%22%3A%22https%3A%2F%2Fmap.hl.gov.tw%2Farcgis%2Frest%2Fservices%2FHLLAND%2FLandDep%2FMapServer%22%2C%22layers%22%3A%5B%7B%22id%22%3A0%2C%22layerDefinition%22%3A%7B%22source%22%3A%7B%22type%22%3A%22mapLayer%22%2C%22mapLayerId%22%3A0%7D%7D%7D%5D%7D%2C%7B%22id%22%3A%22gStreetView%22%2C%22opacity%22%3A0%2C%22minScale%22%3A0%2C%22maxScale%22%3A0%2C%22featureCollection%22%3A%7B%22layers%22%3A%5B%7B%22layerDefinition%22%3A%7B%22name%22%3A%22pointLayer%22%2C%22geometryType%22%3A%22esriGeometryPoint%22%7D%2C%22featureSet%22%3A%7B%22geometryType%22%3A%22esriGeometryPoint%22%2C%22features%22%3A%5B%7B%22geometry%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%2C%22spatialReference%22%3A%7B%22wkid%22%3A3826%7D%7D%2C%22symbol%22%3A%7B%22angle%22%3A0%2C%22xoffset%22%3A0%2C%22yoffset%22%3A0%2C%22type%22%3A%22esriPMS%22%2C%22url%22%3A%22https%3A%2F%2Fmap.hl.gov.tw%2FHLGIS%2Fmap_comp%2F..%2Fimages%2FstreetView%2Fdeg0.png%22%2C%22width%22%3A56.25%2C%22height%22%3A56.25%7D%7D%5D%7D%7D%5D%7D%7D%5D%2C%22exportOptions%22%3A%7B%22outputSize%22%3A%5Bnull%2Cnull%5D%2C%22dpi%22%3A200%7D%2C%22layoutOptions%22%3A%7B%22titleText%22%3A%22APITesting%22%2C%22authorText%22%3A%22%22%2C%22copyrightText%22%3A%22%22%2C%22scaleBarOptions%22%3A%7B%22metricUnit%22%3A%22esriKilometers%22%2C%22metricLabel%22%3A%22km%22%2C%22nonMetricUnit%22%3A%22esriMiles%22%2C%22nonMetricLabel%22%3A%22mi%22%7D%2C%22legendOptions%22%3A%7B%22operationalLayers%22%3A%5B%5D%7D%7D%7D&Format=PDF&Layout_Template=A4%20Portrait";
    return yield mapServerApi_1.hlMapServerPostRequest(url, post_data).then((res) => {
        let resdata;
        let message = "";
        let dataverified = true;
        let data;
        if (res.Status === 200) {
            try {
                resdata = JSON.parse(res.Data);
                if (resdata.jobStatus !== undefined && resdata.jobStatus !== "esriJobSucceeded") {
                    message += "runTimeError; ";
                    dataverified = false;
                }
                else if (resdata.value.url === "") {
                    message += "noData; ";
                    dataverified = false;
                }
                else {
                    message += resdata.value.url;
                    dataverified = true;
                }
            }
            catch (_a) {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        }
        else if (res.Status === -1) {
            message += "runTimeError; ";
            dataverified = false;
        }
        else {
            dataverified = false;
        }
        data = new ApiClass_1.ApiStatus("地圖列印服務", "/GPServer/ExporWebMap", res.Status, new Date(Date.now()).toLocaleString(), message, dataverified, (new Date().getTime() - start_time) / 1000, TYPE);
        updateDb_1.testResultUpdate(data);
        writeLog_1.writeApiLog(data);
        return data;
    });
});
exports.ExportWebMap = ExportWebMap;
