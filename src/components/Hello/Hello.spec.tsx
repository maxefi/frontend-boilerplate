import * as React from "react";
import * as TestUtils from "react-addons-test-utils";
import {Hello} from "./Hello";
import * as styles from './Hello.scss';

describe("Hello", () => {
    it("renders a hello world", () => {
        const renderer = TestUtils.createRenderer();
        renderer.render(
            <Hello compiler="TypeScript" framework="React"/>
        );
        const hello = renderer.getRenderOutput();
        expect(hello).toEqual(<h1 className={styles.hello}>Hello from {'TypeScript'} and {'React'}!</h1>)
    })
})