import * as React from "react";
import * as classNames from "classnames";
import {Issue} from "./Issue";
import * as styles from "./Issue.scss";

describe('Issue', () => {
    let renderer: any;
    beforeEach(() => {
                                    
    });
    
    it('case1', () => {
        const result = renderer(<Issue/>);
        expect(result).toEqual(<div className={classNames(styles.issue)}>Issue</div>);                        
    });
});