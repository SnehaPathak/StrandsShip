export interface IFilterItem {
    label: string,
    value: string,
    selected?: boolean
}

export const PeriodFilterData: Array<IFilterItem> = [
    {
        label: "Daily view",
        value: "Daily",
    },
    {
        label: "Monthly view",
        value: "Monthly"
    }
]

export const TypeFilterData: Array<IFilterItem> =[
    {
        label: "All",
        value:"All"
    },
    {
        label:"Food",
        value:"Food"
    }
]