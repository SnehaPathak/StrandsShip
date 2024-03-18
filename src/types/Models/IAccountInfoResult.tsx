import { IUserAccount } from "./IUserAccount"

export interface IAccountInfoResult
{
    item: IUserAccount,
    success:boolean,
    message:string
}