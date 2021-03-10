import { writeApiLog } from "../logs/writeLog";
import { ApiResult, ApiStatus } from "../models/ApiClass";
import { HLPubRequest } from "../services/publicApi";
import { testResultUpdate } from "../services/updateDb";

const TYPE: string = "oDataAPI";

const getDoorplate: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = "/odata/v1/Doorplate";
    const data: Object = {
        $filter: "COUN_ID eq '花蓮市'",
        $orderby: "GIS_AD",
    };
    return await new HLPubRequest(url, "", data, "GET").RunRequest().then((res: ApiResult) => {
        let alldata: any;
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                } else {
                    if (alldata.filter((o: any) => o.COUN_ID !== "花蓮市").length !== 0) {
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
            } catch {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        } else {
            dataverified = false;
        }
        data = new ApiStatus(
            "取得門牌資料",
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

const getLandPropertyInfo: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = "/odata/v1/LandPropertyInfo";
    const data: Object = {
        $filter: "LNAMNGR ne null",
    };
    return await new HLPubRequest(url, "", data, "GET").RunRequest().then((res: ApiResult) => {
        let alldata: any;
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                } else {
                    if (alldata.filter((o: any) => o.LNAMNGR === null).length !== 0) {
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
            } catch {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        } else {
            dataverified = false;
        }
        data = new ApiStatus(
            "取得土地權屬資訊",
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

const getNewOldSecLandIDMapping: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = "/odata/v1/NewOldSecLandIDMapping";
    const data: Object = {
        $skip: "5",
    };
    return await new HLPubRequest(url, "", data, "GET").RunRequest().then((res: ApiResult) => {
        let alldata: any;
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                } else {
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
            } catch {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        } else {
            dataverified = false;
        }
        data = new ApiStatus(
            "新舊地號轉換",
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

const getParcel: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = "/odata/v1/Parcel";

    return await new HLPubRequest(url, "", "", "GET").RunRequest().then((res: ApiResult) => {
        let alldata: any;
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                } else {
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
            } catch {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        } else {
            dataverified = false;
        }
        data = new ApiStatus(
            "取得地籍資料",
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

const getParcelSpatialQueryNSEPSG3826Point: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = "/odata/v1/Parcel/SpatialQueryNS.EPSG3826Point";
    const post_data: Object = {
        x: "311841.175",
        y: "2652260.122",
    };
    return await new HLPubRequest(url, "", post_data, "POST").RunRequest().then((res: ApiResult) => {
        let alldata: any;
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                } else {
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
            } catch {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        } else {
            dataverified = false;
        }
        data = new ApiStatus(
            "以 EPSG3826點坐標 取得空間交集之地籍資料",
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

const getParcelSpatialQueryNSEPSG4326Point: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = "/odata/v1/Parcel/SpatialQueryNS.EPSG4326Point";
    const post_data: Object = {
        x: "121.615457",
        y: "23.991747",
    };
    return await new HLPubRequest(url, "", post_data, "POST").RunRequest().then((res: ApiResult) => {
        let alldata: any;
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                } else {
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
            } catch {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        } else {
            dataverified = false;
        }
        data = new ApiStatus(
            "以 EPSG4326點坐標 取得空間交集之地籍資料",
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

const getParcelSpatialQueryNSSelectByDoorPlate: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = "/odata/v1/Parcel/SpatialQueryNS.SelectByDoorPlate";
    const post_data: Object = {
        County: "花蓮市",
        Village: "主力里",
        Address: "主力里10鄰和平路447號",
    };
    return await new HLPubRequest(url, "", post_data, "POST").RunRequest().then((res: ApiResult) => {
        let alldata: any;
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                } else {
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
            } catch {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        } else {
            dataverified = false;
        }
        data = new ApiStatus(
            "以 門牌 取得空間交集之地籍資料",
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

const getTown: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = "/odata/v1/Town";
    const town: string = "吉安鄉";
    const data: Object = {
        $filter: "TOWN1 eq '" + town + "'",
    };
    return await new HLPubRequest(url, "", data, "GET").RunRequest().then((res: ApiResult) => {
        let alldata: any;
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                } else {
                    if (resdata.VILL.trim() === "") {
                        message += "noVILL; ";
                        dataverified = false;
                    }
                    if (resdata.TOWN1.trim() !== town) {
                        message += "TOWN1Error; ";
                        dataverified = false;
                    }
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
            "取得花蓮縣鄉鎮市資訊",
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

const getUrbanPlanArea: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = "/odata/v1/UrbanPlanArea";
    const top: number = 2;
    const data: Object = {
        $orderby: "ZONENAME desc",
        $top: top.toString(),
    };
    return await new HLPubRequest(url, "", data, "GET").RunRequest().then((res: ApiResult) => {
        let alldata: any;
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                } else {
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
            } catch {
                resdata = [];
                dataverified = false;
                message += "dataError; ";
            }
        } else {
            dataverified = false;
        }
        data = new ApiStatus(
            "取得都市計畫整合分區資訊",
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

const getUPAreaSpatialQueryNSEPSG3826Point: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = "/odata/v1/UrbanPlanArea/SpatialQueryNS.EPSG3826Point";
    const post_data: Object = {
        x: "311479.978",
        y: "2654225.638",
    };
    return await new HLPubRequest(url, "", post_data, "POST").RunRequest().then((res: ApiResult) => {
        let alldata: any;
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                } else {
                    if (resdata.Shape.Geometry.WellKnownText === "") {
                        message += "noGeometry; ";
                        dataverified = false;
                    }
                    if (resdata.ZONENAME.trim() === "") {
                        message += "noZONENAME; ";
                        dataverified = false;
                    }
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
            "以 EPSG3826點坐標 取得空間交集之都市計畫整合分區資訊",
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

const getUPAreaSpatialQueryNSEPSG4326Point: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = "/odata/v1/UrbanPlanArea/SpatialQueryNS.EPSG4326Point";
    const post_data: Object = {
        x: "121.615457",
        y: "23.991747",
    };
    return await new HLPubRequest(url, "", post_data, "POST").RunRequest().then((res: ApiResult) => {
        let alldata: any;
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                } else {
                    if (resdata.Shape.Geometry.WellKnownText === "") {
                        message += "noGeometry; ";
                        dataverified = false;
                    }
                    if (resdata.ZONENAME.trim() === "") {
                        message += "noZONENAME; ";
                        dataverified = false;
                    }
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
            "以 EPSG4326點坐標 取得空間交集之都市計畫整合分區資訊",
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

const getUPAreaSpatialQueryNSSelectByDoorPlate: () => Promise<ApiStatus> = async (): Promise<ApiStatus> => {
    const start_time: number = new Date().getTime();
    const url: string = "/odata/v1/UrbanPlanArea/SpatialQueryNS.SelectByDoorPlate";
    const post_data: Object = {
        County: "花蓮市",
        Village: "主力里",
        Address: "主力里10鄰和平路447號",
    };
    return await new HLPubRequest(url, "", post_data, "POST").RunRequest().then((res: ApiResult) => {
        let alldata: any;
        let resdata: any;
        let message: string = "";
        let dataverified: boolean = true;
        let data: ApiStatus;

        if (res.Status === 200) {
            try {
                alldata = JSON.parse(res.Data).value;
                resdata = JSON.parse(res.Data).value[0];
                if (resdata.length === 0) {
                    message += "noData; ";
                    dataverified = false;
                } else {
                    if (resdata.Shape.Geometry.WellKnownText === "") {
                        message += "noGeometry; ";
                        dataverified = false;
                    }
                    if (resdata.ZONENAME.trim() === "") {
                        message += "noZONENAME; ";
                        dataverified = false;
                    }
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
            "以 門牌 取得空間交集之都市計畫整合分區資訊",
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

export {
    getDoorplate,
    getLandPropertyInfo,
    getNewOldSecLandIDMapping,
    getParcel,
    getParcelSpatialQueryNSEPSG3826Point,
    getParcelSpatialQueryNSEPSG4326Point,
    getParcelSpatialQueryNSSelectByDoorPlate,
    getTown,
    getUrbanPlanArea,
    getUPAreaSpatialQueryNSEPSG3826Point,
    getUPAreaSpatialQueryNSEPSG4326Point,
    getUPAreaSpatialQueryNSSelectByDoorPlate,
};
