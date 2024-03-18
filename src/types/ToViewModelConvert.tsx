import * as m from "./Models/Index";
import * as vm from "./ViewModels/Index";


export function ToShopViewModel(model: m.IShopAccount): vm.IShopAccountViewModel {
    if (model != null) {
        let result: vm.IShopAccountViewModel = {
            account_display: model.account_display,
            account_id: model.account_id,
            email: model.email,
            enabled: model.enabled,
            shop_account_id: model.shop_account_id,
            shop_id: model.shop_id,
            shop_name: model.shop_name,
            shop_role: ToShopRoleViewModel(model.shop_role)
        }
        return result;
    }
    return {} as vm.IShopAccountViewModel;
}

export function ToUserAccountViewModel(model: m.IUserAccount): vm.IUserAccountViewModel {
    if (model != null) {
        let shops: vm.IShopAccountViewModel[] = [];
        if (model.shops != null && model.shops !== undefined) {
            model.shops.forEach(x => shops.push(ToShopViewModel(x)))
        }
        let result: vm.IUserAccountViewModel = {
            account_id: model.account_id,
            account_display: model.account_display,
            account_status: ToAccountStatusViewModel(model.account_status),
            admin: model.admin,
            api_key: model.api_key,
            api_secret: model.api_secret,
            email: model.email,
            first_name: model.first_name,
            impersonated: model.impersonated,
            last_name: model.last_name,
            shops: shops,
            super_admin: model.super_admin
        }
        return result;
    }
    return {} as vm.IUserAccountViewModel;
}

export function ToAccountInfoResultViewModel(model: m.IAccountInfoResult): vm.IAccountInfoResultViewModel {
    if (model != null) {
        let result: vm.IAccountInfoResultViewModel = {
            item: ToUserAccountViewModel(model.item),
            success: model.success,
            message: model.message
        }
        return result;
    }
    return {} as vm.IAccountInfoResultViewModel;
}

export function ToCustomerNoteViewModel(model: m.ICustomerNote): vm.ICustomerNoteViewModel {
    if (model != null && model !== undefined) {
        let result: vm.ICustomerNoteViewModel = {
            account_id_author: model.account_id_author,
            author_name: model.author_name,
            customer_id: model.customer_id,
            customer_id_author: model.customer_id_author,
            customer_note_id: model.account_id_author,
            note_kind: ToNoteKindViewModel(model.note_kind),
            shop_id: model.shop_id,
            stamp_utc: model.stamp_utc,
            text: model.text
        }
        return result
    }
    return {} as vm.ICustomerNoteViewModel;
}
export function ToApiQueryResultViewModel<T>(model: m.IApiQueryResult<T>): vm.IApiQueryResultViewModel<T> {
    if (model != null && model !== undefined) {
        let result: vm.IApiQueryResultViewModel<T> = {
            item: model.item,
            success: model.success,
            message: model.message
        }
        return result
    }
    return {} as vm.IApiQueryResultViewModel<T>;
}

// export function ToEnumType<X, Y>(data:X):Y{
//     if(data != null)
//     {
//         return Y[X[data] as keyof typeof Y];
//     }
//     return {} as Y;
// }
export function ToShopRoleViewModel(model: m.ShopRole): vm.ShopRoleViewModel {
    if (model != null || 'undefined') {
        return new Map(Object.entries(vm.ShopRoleViewModel)).get(m.ShopRole[model]) as vm.ShopRoleViewModel;
    }
    return vm.ShopRoleViewModel.Operator;
}
export function ToAccountStatusViewModel(model: m.AccountStatus): vm.AccountStatusViewModel {
    if (model != null || 'undefined') {
        return vm.AccountStatusViewModel[m.AccountStatus[model] as keyof typeof vm.AccountStatusViewModel]
    }
    return vm.AccountStatusViewModel.enabled;
}
export function ToNoteKindViewModel(model: m.NoteKind): vm.NoteKindViewModel {
    if (model != null || 'undefined') {
        return vm.NoteKindViewModel[m.NoteKind[model] as keyof typeof vm.NoteKindViewModel]
    }
    return vm.NoteKindViewModel.Note;
}


export function ToGender(model: m.Gender): vm.Gender {
    if (model != null || 'undefined') {
        return vm.Gender[m.Gender[model] as keyof typeof vm.Gender]
    }
    return vm.Gender.Unknown;
}

export function ToTestStatus(model: m.TestStatus): vm.TestStatus {
    if (model != null || 'undefined') {
        return vm.TestStatus[m.TestStatus[model] as keyof typeof vm.TestStatus]
    }
    return vm.TestStatus.AwaitingSample;
}

export function ToTestFlag(model: m.TestFlag): vm.TestFlag {
    if (model != null || 'undefined') {
        return vm.TestFlag[m.TestFlag[model] as keyof typeof vm.TestFlag]
    }
    return vm.TestFlag.standard;
}

export function ToGlossary(model: m.IGlossary): vm.IGlossary {
    if (model != null && model !== undefined) {
        let result: vm.IGlossary = {
            enabled: model.enabled,
            glossary_category_id: model.glossary_category_id,
            glossary_category_name: model.glossary_category_name,
            glossary_id: model.glossary_id,
            language_code: model.language_code,
            language_id: model.language_id,
            language_name: model.language_name,
            shop_id: model.shop_id
        }
        return result
    }
    return {} as vm.IGlossary;
}

export function ToTest(model: m.ITest): vm.ITest {
    if (model != null && model !== undefined) {
        let result: vm.ITest = {
            test_id: model.test_id,
            subject_id: model.subject_id,
            test_type_id: model.test_type_id,
            test_source_id: model.test_source_id,
            test_kit_id: model.test_kit_id,
            scan_system_id: model.scan_system_id,
            shop_id: model.shop_id,
            reference_number: model.reference_number,
            status: ToTestStatus(model.status),
            test_flag: ToTestFlag(model.test_flag),
            purchased_utc: model.purchased_utc,
            fulfilled_utc: model.fulfilled_utc,
            received_utc: model.received_utc,
            phone: model.phone,
            physical: model.physical,
            muted: model.muted,
            line1: model.line1,
            line2: model.line2,
            city: model.city,
            state: model.state,
            country: model.country,
            postal_code: model.postal_code,
            external_source: model.external_source,
            external_id: model.external_id,
            internal_id: model.internal_id,
            delivered_utc: model.delivered_utc,
            delivery_log: model.delivery_log,
            status_notes: model.status_notes,
            workflow_notes: model.workflow_notes,
            cc_test_complete: model.cc_test_complete,
            cc_order_received: model.cc_order_received,
            cc_sample_received: model.cc_sample_received,
            notify_complete_utc: model.notify_complete_utc,

            scan_system_name: model.scan_system_name,
            customer_id: model.customer_id,
            updated_utc: model.updated_utc,
            test_type_name: model.test_type_name,
            full_name: model.full_name,
            test_source_name: model.test_source_name,
            customer_email: model.customer_email,
            customer_name: model.customer_name,
            subject_gender: ToGender(model.subject_gender),
            subject_birthdate: model.subject_birthdate,
            subject_purchase_age: model.subject_purchase_age,
            kit_code: model.kit_code,
            result_names: model.result_names,

        }
        return result
    }
    return {} as vm.ITest;
}
