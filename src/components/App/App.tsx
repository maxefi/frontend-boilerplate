import * as React from 'react';
import * as styles from './App.scss';
import {Header} from "./Header/Header";
import {Footer} from "./Footer/Footer";
import {FastPromise} from "../../../lib/services/Promise/Promise";

export interface AppProps {
    account: number;
}

export class App extends React.Component<AppProps, {}> {
    static resolve() {
        const p = new FastPromise()
        setTimeout(() => {
            p.resolve({account: 1});
        }, 2000)
        return p;
    }

    render() {
        console.log(this.props);
        return (
            <div className={styles.foo}>
                <Header/>
                <div>
                    {this.props.children}
                    <Footer/>
                </div>
            </div>
        );
    }
}
