export interface IDiaryItemViewModel {
    id: string,
    title?: string,
    time?:string,
    subtitle?: string,
    imageUrl?: string,
    content?: string,
    type?:string
    // detailCallback?: (id: string) =>{},
}

export enum IDiaryItemViewModelType
{
    alert,
    recipe
}