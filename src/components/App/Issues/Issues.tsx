import * as React from "react";
import * as classNames from "classnames";
import * as styles from "./Issues.scss";
import {IssuesStore} from "../../../models/IssuesStore";
import {Issue} from "../../../models/Issue";
import {ActionButton} from "../../../../lib/components/ActionButton/ActionButton";
import {IndexRoute} from "../../../routes";
import {headerVM} from "../HeaderVM";
import {observer} from "mobx-react";
import {autorun} from "mobx";

interface IssuesProps {
    issues: IssuesStore;
}

@observer
export class Issues extends React.Component<IssuesProps, {}> {
    static resolve(props: IssuesProps) {
        return new IssuesStore().fetch().then(issues => {
            props.issues = issues;
        });
    }

    componentWillMount(): void {
        autorun(() => {
            console.log('setTitle');
            headerVM.title = "Issues: " + this.props.issues.items.length;
        });
    }

    onDelete(posNumber: number) {
        return this.props.issues.delete(posNumber);
    }

    render() {
        console.log(this.props.issues);
        return (
            <div className={classNames(styles.issues)}>
                <ul>
                {this.props.issues.items.map((issue, pos) =>
                    <li key={issue.number}>
                        <ActionButton
                            onClick={()=>IndexRoute.issue.goto({id: issue.number})}
                        >
                            {issue.title}
                        </ActionButton>
                        <ActionButton onClick={() => this.onDelete(pos)}>
                            X
                        </ActionButton>
                    </li>
                )}
                </ul>
            </div>
        );
    }
}