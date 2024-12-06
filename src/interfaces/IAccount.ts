import { IGeneralLedger } from "./IGeneralLedger";

export interface IAccount {
    object_category: string;
    connection_id: string;
    user: string;
    object_creation_date: string;
    currency: string;
    object_origin_type: string;
    object_origin_category: string;
    object_type: string;
    object_class:string;
    balance_date:string;
    data:IGeneralLedger[];
}