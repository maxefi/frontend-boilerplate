import {FastPromise} from "../../lib/services/Promise/Promise";
import {Issue} from "./Issue";
import {config} from "../config";
import {UserComment} from "./UserComment";
import {UserCommentStore} from "./UserCommentStore";

export class IssuesStore {
    url = `https://api.github.com/repos/${config.company}/${config.repo}/issues`;

    fetch() {
        const issuesPromise = new FastPromise<Issue[]>();
        fetch(this.url).then((response: any) => response.json()).then((issues: Issue[]) => {
            issuesPromise.resolve(issues);
        })

        return issuesPromise;
    }
}