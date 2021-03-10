import { sendErrorMail } from "./emails/alert";
import { ApiStatus } from "./models/ApiClass";
import * as privateApi from "./loaders/privateApi";
import * as publicApi from "./loaders/publicApi";
import * as mapServerApi from "./loaders/mapServerApi";
import * as otherApi from "./loaders/otherApi";

(async (): Promise<void> => {
    let resArray: Array<ApiStatus> = [];
    // otherApi
    await otherApi.getRainFallStations().then((res) => {
        resArray.push(res);
    });
    await otherApi.getRainFallImage().then((res) => {
        resArray.push(res);
    });
    await otherApi.getRainFallOne().then((res) => {
        resArray.push(res);
    });
    await otherApi.getRiverWaterWRA().then((res) => {
        resArray.push(res);
    });
    await otherApi.getRiverWaterHL().then((res) => {
        resArray.push(res);
    });
    await otherApi.getCCTVStations().then((res) => {
        resArray.push(res);
    });
    await otherApi.getCCTVSnapShot().then((res) => {
        resArray.push(res);
    });
    await otherApi.getRadarInfo().then((res) => {
        resArray.push(res);
    });
    await otherApi.getStatInfo().then((res) => {
        resArray.push(res);
    });

    // privateApi
    await privateApi.getLandsbySecID().then((res) => {
        resArray.push(res);
    });
    await privateApi.id_getLandInfobySecLand().then((res) => {
        resArray.push(res);
    });
    await privateApi.id_getUPInfobySecLand().then((res) => {
        resArray.push(res);
    });

    // publicApi
    await publicApi.getDoorplate().then((res) => {
        resArray.push(res);
    });
    await publicApi.getLandPropertyInfo().then((res) => {
        resArray.push(res);
    });
    await publicApi.getNewOldSecLandIDMapping().then((res) => {
        resArray.push(res);
    });
    await publicApi.getParcel().then((res) => {
        resArray.push(res);
    });
    await publicApi.getParcelSpatialQueryNSEPSG3826Point().then((res) => {
        resArray.push(res);
    });
    await publicApi.getParcelSpatialQueryNSEPSG4326Point().then((res) => {
        resArray.push(res);
    });
    await publicApi.getParcelSpatialQueryNSSelectByDoorPlate().then((res) => {
        resArray.push(res);
    });
    await publicApi.getTown().then((res) => {
        resArray.push(res);
    });
    await publicApi.getUrbanPlanArea().then((res) => {
        resArray.push(res);
    });
    await publicApi.getUPAreaSpatialQueryNSEPSG3826Point().then((res) => {
        resArray.push(res);
    });
    await publicApi.getUPAreaSpatialQueryNSEPSG4326Point().then((res) => {
        resArray.push(res);
    });
    await publicApi.getUPAreaSpatialQueryNSSelectByDoorPlate().then((res) => {
        resArray.push(res);
    });

    // mapServerApi
    await mapServerApi.ExportWebMap().then(async (res) => {
        // retry
        if (res.Status !== 200 || res.DataVerified === false) {
            await mapServerApi.ExportWebMap().then((res_re) => {
                resArray.push(res_re);
            });
        } else {
            resArray.push(res);
        }
    });

    await sendErrorMail(resArray);
})();
