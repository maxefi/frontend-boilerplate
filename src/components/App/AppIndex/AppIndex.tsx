import * as React from 'react';
import * as styles from './AppIndex.scss';
import {FastPromise} from "../../../../lib/services/Promise/Promise";

export interface AppIndexProps {

}

export class AppIndex extends React.Component<AppIndexProps, {}> {
    static resolve() {
        const p = new FastPromise();
        setTimeout(() => {
            p.resolve(123);
        }, 2000);
        return p;
    }

    render() {
        return (
            <div className={styles.foo}>AppIndex</div>
        );
    }
}
