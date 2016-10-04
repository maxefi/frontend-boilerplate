import {FastPromise} from "../../lib/services/Promise/Promise";
import {Issue} from "./Issue";
import {config} from "../config";
import {UserComment} from "./UserComment";
export class UserCommentStore {
    url = `https://api.github.com/repos/${config.company}/${config.repo}/issues/${this.id}/comments`;


    constructor(public id: number) {
    }

    fetch() {
        const p = new FastPromise<UserComment[]>();
        fetch(this.url).then((response: any) => response.json()).then((issues: UserComment[]) => {
            p.resolve(issues);
        })
        return p;
    }
}