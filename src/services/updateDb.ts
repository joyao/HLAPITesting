import { db } from "../db/mssqldb";
import * as sql from "mssql";
import { ApiStatus } from "../models/ApiClass";

const testResultUpdate: (apistatus: ApiStatus) => Promise<void> = (apistatus: ApiStatus): Promise<void> => {
    return new Promise((resolve) => {
        const pool: any = new sql.ConnectionPool(db);
        pool.connect().then((task: any) => {
            task.request()
                .input("apiinfo", sql.NVarChar(50), apistatus.APIInfo)
                .input("name", sql.NVarChar(256), apistatus.Name)
                .input("status", sql.Int, apistatus.Status)
                .input("memo", sql.NVarChar(256), apistatus.Memo)
                .input("dataverified", sql.Bit, apistatus.DataVerified)
                .input("duringtime", sql.Float, apistatus.DuringTime)
                .input("type", sql.NVarChar(50), apistatus.Type)
                .query(
                    `BEGIN
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
                    where name = @name`,
                    (err: any, recordset: any) => {
                        if (err) {
                            console.log(err);
                        }
                        // console.log(JSON.stringify(recordset));
                        pool.close();
                        resolve(recordset.recordset);
                    }
                );
        });
    });
};

export { testResultUpdate };
