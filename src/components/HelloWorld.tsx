import * as React from "react";

declare var require: any;
// import styles from './Hello.scss';
var styles = require('./Hello.scss');
console.log(styles);

export interface HelloProps { compiler: string; framework: string;
}

export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <h1 className={styles.hello}>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}