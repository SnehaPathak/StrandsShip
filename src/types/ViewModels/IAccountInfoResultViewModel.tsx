import { IUserAccountViewModel } from "./IUserAccountViewModel"

export interface IAccountInfoResultViewModel
{
    item: IUserAccountViewModel,
    success:boolean,
    message:string
}