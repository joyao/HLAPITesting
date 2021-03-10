# API 測試小程式

主要使用的語言：`Node.js`, `typescript`

執行環境所需套件：`Node.js`, `SQL Server`, `ArcGIS Server`, `Mail Server`

## 安裝套件

```properties
npm install
```

## 主要進入程式 app.js

目前測試 API 列表：

-   otherApi
    -   getRainFallStations
    -   getRainFallImage
    -   getRainFallOne
    -   getRiverWaterWRA
    -   getRiverWaterHL
    -   getCCTVStations
    -   getCCTVSnapShot
    -   getRadarInfo
    -   getStatInfo
-   privateApi
    -   getLandsbySecID
    -   id_getLandInfobySecLand
    -   id_getUPInfobySecLand
-   publicApi
    -   getDoorplate
    -   getLandPropertyInfo
    -   getNewOldSecLandIDMapping
    -   getParcel
    -   getParcelSpatialQueryNSEPSG3826Point
    -   getParcelSpatialQueryNSEPSG4326Point
    -   getParcelSpatialQueryNSSelectByDoorPlate
    -   getTown
    -   getUrbanPlanArea
    -   getUPAreaSpatialQueryNSEPSG3826Point
    -   getUPAreaSpatialQueryNSEPSG4326Point
    -   getUPAreaSpatialQueryNSSelectByDoorPlate
-   mapServerApi
    -   ExportWebMap

## 設定檔

#### 未編譯前： src/config/config.ts

```ts
export const DB_SERVER: string = "xxx.xxx.xxx.xxx\\SQL2017EXPR";
export const DB_PORT: number = 1433;
export const DB_USER: string = "user";
export const DB_PASSWORD: string = "password";
export const INIT_DATABASE: string = "DB";
export const MAIL_FROM: string = "test@google.com";
export const MAIL_TO: string = "test01@google.com";
export const MAIL_SERVER_HOST: string = "xxx.xxx.xxx.xxx";
export const MAIL_SERVER_PORT: number = 25;
export const MAPSERVICE_USER_NAME: string = "mapuser";
export const MAPSERVICE_PASSWORD: string = "mappassword";
export const PRIVATEAPI_TOKEN: string = "privateapitoken";
export const PUBLICAPI_TOKEN: string = "publicapitoken";
```

#### 編譯後： dist/config/config.js

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBLICAPI_TOKEN = exports.PRIVATEAPI_TOKEN = exports.MAPSERVICE_PASSWORD = exports.MAPSERVICE_USER_NAME = exports.MAIL_SERVER_PORT = exports.MAIL_SERVER_HOST = exports.MAIL_TO = exports.MAIL_FROM = exports.INIT_DATABASE = exports.DB_PASSWORD = exports.DB_USER = exports.DB_PORT = exports.DB_SERVER = void 0;
exports.DB_SERVER = "xxx.xxx.xxx.xxx\\SQL2017EXPR";
exports.DB_PORT = 1433;
exports.DB_USER = "user";
exports.DB_PASSWORD = "password";
exports.INIT_DATABASE = "DB";
exports.MAIL_FROM = "test@google.com";
exports.MAIL_TO = "test@google.com";
exports.MAIL_SERVER_HOST = "xxx.xxx.xxx.xxx";
exports.MAIL_SERVER_PORT = 25;
exports.MAPSERVICE_USER_NAME = "mapuser";
exports.MAPSERVICE_PASSWORD = "mappassword";
exports.PRIVATEAPI_TOKEN = "privateapitoken";
exports.PUBLICAPI_TOKEN = "publicapitoken";
```

## 執行編譯

#### 利用 typescript 原生套件

```properties
npm run build
```

#### 利用 Gulp 套件 (只能 es5 以下)

```properties
npm run build-gulp
```

## 執行程式

```properties
npm run start
```

## 執行結果

每一筆測試結果皆會存在 runTesting.log 檔案中，且會存進資料庫

若有測試錯誤的情形，則會寄 Email 給通知管理者
