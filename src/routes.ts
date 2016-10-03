import {route} from "../lib/components/Router/Router";
import {App} from "./components/App/App";
import {Hello} from "./components/App/Hello/Hello";
import {Foo} from "./components/App/Foo/Foo";
import {AppIndex} from "./components/App/AppIndex/AppIndex";
export const IndexRoute = route('/', App, {
    index: AppIndex,
    hello: route('profile', Hello),
    foo: route('foo', Foo),
});