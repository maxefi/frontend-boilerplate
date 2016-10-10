import * as React from "react";
import * as classNames from "classnames";
import "./App.scss";
import "../../styles/bootstrap.scss";
import {Header} from "./Header/Header";
import {Footer} from "./Footer/Footer";

export interface AppProps {

}

export class App extends React.Component<AppProps, {}> {

    render() {
        console.log(this.props);
        return (
            <div className="nav app__wrapper">
                <div className="app__header"></div>

                <div className="app__main">
                    <Header/>
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
