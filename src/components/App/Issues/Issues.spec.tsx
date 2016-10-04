import * as React from "react";
import * as classNames from "classnames";
import {Issues} from "./Issues";
import * as styles from "./Issues.scss";

describe('Issues', () => {
    let renderer: any;
    beforeEach(() => {
                                    
    });
    
    it('case1', () => {
        const result = renderer(<Issues/>);
        expect(result).toEqual(<div className={classNames(styles.issues)}>Issues</div>);                        
    });
});