import * as React from 'react';
import {FastPromise} from "../../services/Promise/Promise";

interface ActionButtonProps {
    onClick: () => FastPromise<any>;
    className?: any;
}
export class ActionButton extends React.Component<ActionButtonProps, {}> {
    disabled = false;
    onClick = () => {
        const promise = this.props.onClick();
        this.disabled = true;
        let called = false;
        promise.then(() => {
            this.disabled = false;
            called = true;
            this.forceUpdate();
        });
        if (!called) {
            this.forceUpdate();
        }
    };

    render() {
        return <button disabled={this.disabled} onClick={this.onClick}>{this.props.children}</button>
    }
}
