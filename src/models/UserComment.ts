import {User, UserJSON} from "./User";

export interface UserCommentJSON {
    url: string;
    html_url: string;
    issue_url: string;
    id: number;
    user: UserJSON;
    created_at: string;
    updated_at: string;
    body: string;
}

export class UserComment {
    user: User;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    body: string;

    constructor(public json: UserCommentJSON) {
        this.fromJSON(json);
    }

    fromJSON(json: UserCommentJSON) {
        this.id = json.id;
        this.body = json.body;
        this.user = new User(json.user);
        this.createdAt = new Date(json.created_at);
        this.updatedAt = new Date(json.updated_at);
    }
}
