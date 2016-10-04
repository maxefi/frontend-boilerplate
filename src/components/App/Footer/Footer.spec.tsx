import * as React from 'react';
import * as classNames from 'classnames';
import {Footer} from './Footer'; 
import * as styles from './Footer.scss';

describe('Footer', () => {
    let renderer: any;
    beforeEach(() => {
                                    
    });
    
    it('case1', () => {
        const result = renderer(<Footer/>);
        expect(result).toEqual(<div className={classNames(styles.footer)}>Footer</div>);                        
    });
});