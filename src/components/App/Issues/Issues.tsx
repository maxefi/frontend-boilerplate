import * as React from "react";
import * as classNames from "classnames";
import * as styles from "./Issues.scss";
import {IssuesStore} from "../../../models/IssuesStore";
import {Issue} from "../../../models/Issue";
import {ActionButton} from "../../../../lib/components/ActionButton/ActionButton";
import {IndexRoute} from "../../../routes";

interface IssuesProps {
    issues: Issue[];
}

export class Issues extends React.Component<IssuesProps, {}> {
    static resolve(props: IssuesProps) {
        return new IssuesStore().fetch().then(issues => {
            props.issues = issues;
        });
    }

    render() {
        return (
            <div className={classNames(styles.issues)}>
                <ul>
                {this.props.issues.map(issue =>
                    <li key={issue.number}>
                        <ActionButton
                            onClick={()=>IndexRoute.issue.goto({id: issue.number})}
                        >
                            {issue.title}
                        </ActionButton>
                    </li>
                )}
                </ul>
            </div>
        );
    }
}