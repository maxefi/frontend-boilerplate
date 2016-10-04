import * as React from 'react';
import * as classNames from 'classnames';
import {Header} from './Header'; 
import * as styles from './Header.scss';

describe('Header', () => {
    let renderer: any;
    beforeEach(() => {
                                    
    });
    
    it('case1', () => {
        const result = renderer(<Header/>);
        expect(result).toEqual(<div className={classNames(styles.header)}>Header</div>);                        
    });
});