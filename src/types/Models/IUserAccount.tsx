import { IShopAccount } from "./IShopAccount"

export interface IUserAccount {
    account_id: string
    email: string
    first_name: string
    last_name: string
    account_display: string
    api_key: string
    api_secret: string
    account_status: AccountStatus
    admin: boolean
    super_admin: boolean
    impersonated: boolean

    shops: IShopAccount[]
}

export enum AccountStatus {
    enabled = 0,
    pending = 1,
    disabled = 2,
    denied = 3
}