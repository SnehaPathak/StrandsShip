export interface ICustomerNoteViewModel {
    customer_note_id: string,
    customer_id: string,
    customer_id_author: string,
    account_id_author: string,
    shop_id: string,
    stamp_utc: string,
    note_kind: NoteKindViewModel
    text: string,

    /// <summary>
    /// Index Only
    /// </summary>
    author_name: string,
}

export enum NoteKindViewModel {
    Note = 0,
    Warning = 1
}