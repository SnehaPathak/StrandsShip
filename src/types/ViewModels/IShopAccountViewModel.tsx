export interface IShopAccountViewModel {
    shop_account_id: string
    shop_id: string
    account_id: string
    shop_role: ShopRoleViewModel
    enabled: boolean
    shop_name: string
    account_display: string
    email: string
}

export enum ShopRoleViewModel {
    Operator = 0,
    Manager = 1,
    Admin = 2
}