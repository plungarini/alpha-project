import { Timestamp } from './timestamp.model';
/* eslint-disable @typescript-eslint/naming-convention */
import { UserStripeSubscription } from './user-stripe-subscription.model';


export interface StripeUserInfo {
    subs: UserStripeSubscription[];
    sessions: UserStripeSession[];
}

export interface UserStripeSession {
    cancel_url: string;
    success_url: string;
    price: string;
    allow_promotion_codes?: boolean;
    sessionId?: string;
    updatedAt?: Timestamp;
    created?: Timestamp;
    error?: {
        message: string;
    };
}
