import * as React from 'react';
import * as classNames from 'classnames';
import * as styles from './Header.scss';
import * as bs from '../../../styles/bootstrap.scss';
import {headerVM} from "../HeaderVM";
import {observable} from "mobx";
import {observer} from "mobx-react";

interface HeaderProps {
    
}

@observer
export class Header extends React.Component<HeaderProps, {}> {
    render() {
        return (
            <div className={classNames(styles.header)}>
                <div className={classNames(bs.container)}>
                    {headerVM.uppercaseTitle}
                </div>
            </div>
        );
    }
}