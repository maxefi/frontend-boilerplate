import {route} from "../lib/components/Router/Router";
import {App} from "./components/App/App";
import {Issues} from "./components/App/Issues/Issues";
import {Issue} from "./components/App/Issue/Issue";
export const IndexRoute = route('/', App, {
    index: Issues,
    issue: route('issue/:id', Issue)
});