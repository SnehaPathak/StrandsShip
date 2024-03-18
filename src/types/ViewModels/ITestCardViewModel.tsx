import { ITestCard } from "../Models/Index";

export interface ITestCardViewModel {
    id?: string,
    subject?: string,
    purchaseDate?: string,
    receivedDate?: Date,
    status?: string,
    refNo?: string,
    detailAvailable?: boolean,
    detailID?: string,
    detailCallback?: (id: string) =>{},
    temp: ""
}
