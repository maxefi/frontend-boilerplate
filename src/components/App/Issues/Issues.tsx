import * as React from "react";
import * as classNames from "classnames";
import {IssuesStore} from "../../../models/IssuesStore";
import {ActionButton} from "../../../../lib/components/ActionButton/ActionButton";
import {IndexRoute} from "../../../routes";
import {headerVM} from "../HeaderVM";
import {observer} from "mobx-react";
import {autorun} from "mobx";
import {issuesVM} from "./IssuesVM";

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
        const activeTabClass = issuesVM.activeTab;

        return (
            <div className="issues">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a
                            className={classNames("nav-link", activeTabClass == "Opened" ? "active" : '')}
                            onClick={()=>issuesVM.activeTab = 'Opened'}
                            href="#"
                        >
                            Opened
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={classNames("nav-link", activeTabClass == "Closed" ? "active" : '')}
                            onClick={()=>issuesVM.activeTab = 'Closed'}
                            href="#"
                        >
                            Closed
                        </a>
                    </li>
                </ul>
                <ul className="issues__list-group">
                    {this.props.issues.items.filter((issue) => {
                        return issuesVM.activeTab == "Opened" ? issue.closedAt == null : issue.closedAt != null;
                    }).map((issue, pos) =>
                        <li key={issue.number} className="list-group-item list-group-item-action">
                            <ActionButton
                                onClick={()=>IndexRoute.issue.goto({id: issue.number})}
                                className="btn-link"
                            >
                                {issue.title}
                            </ActionButton>
                            <ActionButton
                                onClick={() => this.onDelete(pos)}
                                className="close"
                            >
                                ×
                            </ActionButton>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}