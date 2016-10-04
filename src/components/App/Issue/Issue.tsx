import * as React from "react";
import * as classNames from "classnames";
import * as styles from "./Issue.scss";
import {Issue as IssueModel} from "../../../models/Issue";

interface IssueProps {
    issue: IssueModel;
    params: {id: number};
}

export class Issue extends React.Component<IssueProps, {}> {
    static resolve(props: IssueProps) {
        return new IssueModel(props.params.id).fetch().then(issue => {
            props.issue = issue;
        });
    }

    render() {
        return (
            <div className={classNames(styles.issue)}>
                <h1 className={classNames(styles.title)}>{this.props.issue.title}</h1>
                <article className={classNames(styles.article)}>{this.props.issue.body}</article>
                {this.props.issue.user_comments.map(userComment =>
                    <div className={classNames(styles.commentBody)} key={userComment.id}>
                        <img
                            src={userComment.user.avatar_url}
                            className={classNames(styles.userAvatar)}
                            alt={userComment.user.login}
                        />
                        <div>
                            <div className={classNames(styles.author)}>{userComment.user.login}</div>
                            <div className={classNames(styles.time)}>{userComment.created_at}</div>
                            <div className={classNames(styles.commentText)}>{userComment.body}</div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}