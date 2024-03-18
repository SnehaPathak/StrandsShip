export interface IDiaryItem {
    id: string,
    title?: string,
    subtitle?: string,
    time?:string,
    imageUrl?: string,
    content?: string,
    type?:IDiaryItemType
}

export enum IDiaryItemType
{
    alert = "alert",
    recipe = "recipe"
}

export interface DiaryItems
{
  diaryItems: IDiaryItem[]
}