import { IAccountInfoResultViewModel } from "../types/ViewModels/IAccountInfoResultViewModel"
import { IUserAccountViewModel } from "../types/ViewModels/IuserAccountViewModel"

export interface IAuthManager
{
    DoLogOut:() => {},
    DoLogin :(email: string, password: string) => Promise<IAccountInfoResultViewModel>,
    CurrentUser: {
        save:(user: IUserAccountViewModel) => {},
        load:() => IUserAccountViewModel,
        delete: () => {}
    }
}