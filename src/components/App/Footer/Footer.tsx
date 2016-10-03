import * as React from 'react';
import * as styles from './Footer.scss';

export interface FooterProps {

}

export class Footer extends React.Component<FooterProps, {}> {
    render() {
        return (
            <div className={styles.foo}>Footer</div>
        );
    }
}
