import * as React from 'react';
import * as styles from './Foo.scss';
import {RadioButton} from "../../../../lib/components/RadioButton/RadioButton";
import {FastPromise} from "../../../../lib/services/Promise/Promise";

export interface FooProps {

}

export class Foo extends React.Component<FooProps, {}> {
    static resolve() {
        const p = new FastPromise();
        setTimeout(() => {
            p.resolve(123);
        }, 2000);
        return p;
    }

    render() {
        return (
            <div className={styles.foo}>
                Foo
                <RadioButton/>
            </div>
        );
    }
}

