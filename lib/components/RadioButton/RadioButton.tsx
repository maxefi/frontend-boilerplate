import * as React from 'react';
import * as styles from './RadioButton.scss';
import * as classNames from 'classnames';

export interface RadioButtonProps {
    className?: any;
    hor?: boolean;
}

console.log(styles);

export class RadioButton extends React.Component<RadioButtonProps, {}> {
    render() {
        return (
            <div className={classNames(styles.b, {[styles.horizontalAlign]: this.props.hor}, this.props.className)}></div>
        );
    }
}
