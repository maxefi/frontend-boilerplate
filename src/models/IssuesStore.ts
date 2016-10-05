import {FastPromise} from "../../lib/services/Promise/Promise";
import {Issue, IssueJSON} from "./Issue";
import {config} from "../config";
import {UserComment} from "./UserComment";
import {UserCommentStore} from "./UserCommentStore";
import {observable} from "mobx";

export class IssuesStore {
    private url = `https://api.github.com/repos/${config.company}/${config.repo}/issues`;
    @observable items: Issue[] = [];

    fromJSON(json: IssueJSON[]) {
        this.items = json.map(json => new Issue().fromJSON(json));
        return this;
    }

    fetch() {
        const issuesPromise = new FastPromise<this>();
        fetch(this.url).then((response: any) => response.json()).then((issuesJSON: IssueJSON[]) => {
            this.fromJSON(issuesJSON);
            issuesPromise.resolve(this);
        })
        return issuesPromise;
    }

    delete(pos: number) {
        const p = new FastPromise();

        setTimeout(() => {
            this.items.splice(pos, 1);
            p.resolve();
        }, 1000)

        return p;
    }
}