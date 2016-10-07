import * as React from "react";
import * as classNames from "classnames";
import * as styles from "./Issues.scss";
import * as bs from '../../../styles/bootstrap.scss';
import {IssuesStore} from "../../../models/IssuesStore";
import {Issue} from "../../../models/Issue";
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
            <div className={classNames(styles.issues)}>
                <ul className={classNames(bs.nav, bs.navTabs)}>
                    <li className={classNames(bs.navItem)}>
                        <a
                            className={classNames(bs.navLink, activeTabClass == "Opened" ? bs.active : '')}
                            onClick={()=>issuesVM.activeTab = 'Opened'}
                        >
                            Opened
                        </a>
                    </li>
                    <li className={classNames(bs.navItem)}>
                        <a
                            className={classNames(bs.navLink, activeTabClass == "Closed" ? bs.active : '')}
                            onClick={()=>issuesVM.activeTab = 'Closed'}
                        >
                            Closed
                        </a>
                    </li>
                </ul>
                <ul>
                    {this.props.issues.items.filter((issue) => {
                        return issuesVM.activeTab == "Opened" ? issue.closedAt == null : issue.closedAt != null;
                    }).map((issue, pos) =>
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