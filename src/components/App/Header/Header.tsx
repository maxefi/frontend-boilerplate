import * as React from 'react';
import * as styles from './Header.scss';
import {ActionButton} from "../../../../lib/components/ActionButton/ActionButton";
import {IndexRoute} from "../../../routes";

export interface HeaderProps {

}

export class Header extends React.Component<HeaderProps, {}> {
    render() {
        return (
            <div className={styles.foo}>
                Header
                <ul>
                    <li><ActionButton onClick={() => IndexRoute.goto()}>Index</ActionButton></li>
                    <li><ActionButton onClick={() => IndexRoute.foo.goto()}>Foo</ActionButton></li>
                    <li><ActionButton onClick={() => IndexRoute.hello.goto()}>Hello</ActionButton></li>
                </ul>
            </div>
        );
    }
}
