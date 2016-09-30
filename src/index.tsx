import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {Hello} from "./components/HelloWorld";

var div = document.body.appendChild(document.createElement('div')) as HTMLElement;
ReactDOM.render(
    <Hello compiler="TypeScript" framework="React"/>,
    div
);