import * as React from 'react';
import {headerVM} from "../HeaderVM";
import {observable} from "mobx";
import {observer} from "mobx-react";

interface HeaderProps {
    
}

@observer
export class Header extends React.Component<HeaderProps, {}> {
    render() {
        return (
            <div className="header">
                <div className="container">
                    {headerVM.uppercaseTitle}
                </div>
            </div>
        );
    }
}