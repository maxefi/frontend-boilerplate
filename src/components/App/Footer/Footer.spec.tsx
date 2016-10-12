import * as React from 'react';
import {Footer} from './Footer';

describe('Footer', () => {
    let renderer: any;
    beforeEach(() => {
                                    
    });
    
    it('case1', () => {
        const result = renderer(<Footer/>);
        expect(result).toEqual(<div className="footer"}>Footer</div>);
    });
});