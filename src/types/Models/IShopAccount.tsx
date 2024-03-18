export interface IShopAccount {
    shop_account_id: string
    shop_id: string
    account_id: string
    shop_role: ShopRole
    enabled: boolean
    shop_name: string
    account_display: string
    email: string
}

export enum ShopRole {
    Operator = 0,
    Manager = 1,
    Admin = 2
}