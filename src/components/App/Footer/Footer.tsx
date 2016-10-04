import * as React from 'react';
import * as classNames from 'classnames';
import * as styles from './Footer.scss';
import * as bs from '../../../styles/bootstrap.scss';
import * as github from './github.svg';

interface FooterProps {
    
}
export class Footer extends React.Component<FooterProps, {}> {
    render() {
        return (
            <div className={classNames(styles.footer)}>
                <div className={classNames(bs.container)}>
                    <img src={github} alt="github"/>
                </div>
            </div>
        );
    }
}