import * as ReactDOM from "react-dom";
import * as React from "react";
import "../lib/styles/reset.scss";
import {RouterView, BrowserHistory} from "../lib/components/Router/Router";
import {IndexRoute} from "./routes";

const history = new BrowserHistory();
const div = document.body.appendChild(document.createElement('div')) as HTMLElement;
ReactDOM.render(<RouterView indexRoute={IndexRoute} history={history}/>, div);