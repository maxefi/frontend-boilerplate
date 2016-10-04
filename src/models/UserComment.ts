import {User} from "./User";

export class UserComment {
    user: User;
    id: number;
    created_at: Date;
    updated_at: Date;
    body: string;
}