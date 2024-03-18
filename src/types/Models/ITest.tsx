import { Gender } from "./Gender"

export interface ITest{
    test_id: string,
    subject_id: string,
    test_type_id: string,
    test_source_id: string,
    test_kit_id: string | undefined,
    scan_system_id: string | undefined,
    shop_id: string,
    reference_number: string,
    status: TestStatus,
    test_flag: TestFlag,
    purchased_utc: Date,
    fulfilled_utc?: Date,
    received_utc?: Date,
    phone: string,
    physical: boolean,
    muted: boolean,
    line1: string,
    line2: string,
    city: string,
    state: string,
    country: string,
    postal_code: string,
    external_source: string,
    external_id: string,
    internal_id: string,
    delivered_utc?: Date,
    delivery_log: string,
    status_notes: string,
    workflow_notes: string,
    cc_test_complete: string,
    cc_order_received: string,
    cc_sample_received: string,
    notify_complete_utc?: Date,
    
    scan_system_name: string,
    customer_id: string,
    updated_utc: Date,
    test_type_name: Date,
    full_name: string,
    test_source_name: string,
    customer_email: string,
    customer_name: string,
    subject_gender: Gender,
    subject_birthdate?: Date,
    subject_purchase_age?: number,
    kit_code: string,
    result_names: string[],

}

export enum TestStatus
{
    Cancelled = -2,
    Error = -1,
    AwaitingSample = 0,
    SampleReceived = 1,
    Processing = 2,
    Complete = 3
}

export enum TestFlag
{
    standard = 0,
    upgraded = 1,
    priority = 2,
    warning = 3
}