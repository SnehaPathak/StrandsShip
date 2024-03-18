import { IShopAccountViewModel } from "./IShopAccountViewModel"

export interface IUserAccountViewModel {
    account_id: string
    email: string
    first_name: string
    last_name: string
    account_display: string
    api_key: string
    api_secret: string
    account_status: AccountStatusViewModel
    admin: boolean
    super_admin: boolean
    impersonated: boolean

    shops: IShopAccountViewModel[]
}

export enum AccountStatusViewModel {
    enabled = 0,
    pending = 1,
    disabled = 2,
    denied = 3
}