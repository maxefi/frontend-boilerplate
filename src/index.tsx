///<reference path="typings.d.ts"/>
import * as ReactDOM from "react-dom";
import * as React from "react";
// import "./index.scss"
import {RouterView, BrowserHistory} from "../lib/components/Router/Router";
import {IndexRoute} from "./routes";

const history = new BrowserHistory();
const wrapper = document.getElementById('div');

ReactDOM.render(<RouterView indexRoute={IndexRoute} history={history}/>, wrapper);