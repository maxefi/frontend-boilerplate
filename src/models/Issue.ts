import {User} from "./User";
import {config} from "../config";
import {FastPromise} from "../../lib/services/Promise/Promise";
import {UserComment} from "./UserComment";
import {UserCommentStore} from "./UserCommentStore";

export class Issue {
    url = `https://api.github.com/repos/${config.company}/${config.repo}/issues/${this.number}`;

    created_at: Date;
    updated_at: Date;
    title: string;
    body: string;
    closed_at: Date;
    closed_by: User;
    user: User;
    user_comments: UserComment[];

    constructor(public number: number) {
        
    }
    
    fetch() {
        const p = new FastPromise<Issue>();
        const userCommentsStorePromise = new UserCommentStore(this.number).fetch();

        fetch(this.url).then((response: any) => response.json()).then((issue: Issue) => {
            userCommentsStorePromise.then(userComments => {
                issue.user_comments = userComments;
                p.resolve(issue);
            });

        })
        return p;
    }
}