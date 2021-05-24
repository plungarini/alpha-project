import { UserItem } from 'src/app/admin/components/admin-users/components/home/admin-users.component';
import { Timestamp } from './../../auth/models/timestamp.model';



export interface Announcement {
    senderImg: string;
    senderName: string;
    senderMessage: string;
    sendTo: UserItem[];
    id?: string;
    senderLink?: string;
    sendAt?: Date | Timestamp;
    hideByDate?: boolean;
    timeDiff?: string;
    toRead?: boolean;
    showDetails?: boolean;
}
