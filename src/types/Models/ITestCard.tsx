export interface ITestCard {
    id?: string,
    subject?: string,
    purchaseDate?: string,
    receivedDate?: Date,
    status?: string,
    refNo?: string,
    detailAvailable?: boolean,
    detailID?: string
}

export interface TestCardList {
    testCards: ITestCard[]
}