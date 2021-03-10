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
Object.defineProperty(exports, "__esModule", { value: true });
exports.testResultUpdate = void 0;
const mssqldb_1 = require("../db/mssqldb");
const sql = __importStar(require("mssql"));
const testResultUpdate = (apistatus) => {
    return new Promise((resolve) => {
        const pool = new sql.ConnectionPool(mssqldb_1.db);
        pool.connect().then((task) => {
            task.request()
                .input("apiinfo", sql.NVarChar(50), apistatus.APIInfo)
                .input("name", sql.NVarChar(256), apistatus.Name)
                .input("status", sql.Int, apistatus.Status)
                .input("memo", sql.NVarChar(256), apistatus.Memo)
                .input("dataverified", sql.Bit, apistatus.DataVerified)
                .input("duringtime", sql.Float, apistatus.DuringTime)
                .input("type", sql.NVarChar(50), apistatus.Type)
                .query(`BEGIN
                        IF NOT EXISTS (SELECT * FROM [HLDWH].[dbo].[APITesting] WHERE [Name] = @name)
                        BEGIN
                            INSERT INTO [HLDWH].[dbo].[APITesting]  (Name)
                            VALUES (@name)
                        END
                    END
                    UPDATE [HLDWH].[dbo].[APITesting] set
                        LastUpdate=GETDATE(),
                        Status=@status,
                        Memo=@memo,
                        DataVerified=@dataverified,
                        DuringTime=@duringtime,
                        APIInfo=@apiinfo,
                        Type=@type
                        OUTPUT inserted.[APIInfo],inserted.[Name],inserted.[Status],inserted.[Memo],CONVERT(varchar(100), inserted.[LastUpdate], 120) as LastUpdate,inserted.[DuringTime],inserted.[Type]
                    where name = @name`, (err, recordset) => {
                if (err) {
                    console.log(err);
                }
                // console.log(JSON.stringify(recordset));
                pool.close();
                resolve(recordset.recordset);
            });
        });
    });
};
exports.testResultUpdate = testResultUpdate;
