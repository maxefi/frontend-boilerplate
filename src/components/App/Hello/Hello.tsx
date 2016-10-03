import * as React from "react";
import * as styles from './Hello.scss';

export interface HelloProps {
}

export class Hello extends React.Component<HelloProps, {}> {
    items = [1, 2, 3, 4, 5];

    onClick = () => {
        console.log(this.items);
    }

    render() {
        return (
            <h1 className={styles.hello}>Hello from TypeScript and React!
                {this.items.map(item => {
                    <div onClick={this.onClick}>{item}</div>
                })}
            </h1>
        );
    }
}

