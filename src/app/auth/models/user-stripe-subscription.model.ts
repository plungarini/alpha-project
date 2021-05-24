import { Timestamp } from './timestamp.model';
/* eslint-disable @typescript-eslint/naming-convention */
interface USS_PriceRecurring {
    aggregate_usage?: any;
    interval: string;
    interval_count: number;
    usage_type: string;
}

interface USS_Price {
    id: string;
    object: string;
    active: boolean;
    billing_scheme: string;
    created: number;
    currency: string;
    livemode: boolean;
    lookup_key?: any;
    metadata: any;
    nickname?: any;
    product: string;
    recurring: USS_PriceRecurring;
    tiers_mode?: any;
    transform_quantity?: any;
    type: string;
    unit_amount?: any;
    unit_amount_decimal: string;
}

interface USS_ItemData {
    id: string;
    object: string;
    billing_thresholds?: any;
    created: number;
    metadata: any;
    price: USS_Price;
    quantity: number;
    subscription: string;
    tax_rates: any[];
}

interface USS_Items {
    billing_thresholds: any;
    created: number;
    id: string;
    metadata: any;
    object: string;
    plan: any;
    price: {
        id: string;
    };
    quantity: number;
    subscription: string;
    tax_rates: any[];
}

// eslint-disable-next-line no-shadow
export enum USS_Status {
    active = 'active',
    past_due = 'past_due',
    unpaid = 'unpaid',
    canceled = 'canceled',
    incomplete = 'incomplete',
    incomplete_expired = 'incomplete_expired',
    trialing = 'trialing',
}

export interface UserStripeSubscription {
    id: string;
    object: string;
    billing_cycle_anchor: number;
    billing_thresholds?: any;
    cancel_at?: Timestamp;
    cancel_at_period_end: boolean;
    canceled_at?: Timestamp;
    collection_method: string;
    created: Timestamp;
    current_period_end: Timestamp;
    current_period_start: Timestamp;
    customer: string;
    days_until_due?: any;
    default_payment_method?: any;
    default_source?: any;
    default_tax_rates: any[];
    discount?: any;
    ended_at?: any;
    items: USS_Items[];
    latest_invoice?: any;
    livemode: boolean;
    metadata: any;
    next_pending_invoice_item_invoice?: any;
    pause_collection?: any;
    pending_invoice_item_interval?: any;
    pending_setup_intent?: any;
    pending_update?: any;
    schedule?: any;
    start_date: number;
    status: USS_Status;
    transfer_data?: any;
    stripeLink: string;
    trial_end?: any;
    trial_start?: any;
}
