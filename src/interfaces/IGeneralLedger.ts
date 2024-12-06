export interface IGeneralLedger {
    account_category: string;
    account_code: string;
    account_currency: string;
    account_identifier: string;
    account_status: string;
    value_type: string;
    account_name: string;
    account_type: string;
    account_type_bank?: string;
    system_account?: string;
    total_value: number;
}