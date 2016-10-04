import {
    IGeneratorClass,
    UpperCamelCase,
    lowerCamelCase,
    trimLines,
    findGenTemplatesRoot,
    currentDir
} from "gen-templates";
import {relative} from "path";

export default class Component implements IGeneratorClass {
    help(){
        return `
            Creates something good
        `;
    }

    generator(args:{_:string[], optional:boolean}) {
        const name = args._[0];
        if (!name) {
            throw new Error("name is required");
        }
        const cls = UpperCamelCase(name);
        const lowerCase = lowerCamelCase(name);
        const dir = currentDir();
        const styleRelativePath = relative(dir, findGenTemplatesRoot() + '/styles/');
        return [
            {
                filename: `${dir}/${cls}/${cls}.tsx`,
                content: trimLines(`
                    import * as React from 'react';
                    import * as classNames from 'classnames';
                    import * as styles from './${cls}.scss';
                    import * as bs from '${styleRelativePath}/bootstrap.scss';
                    
                    interface ${cls}Props {
                        
                    }
                    
                    export class ${cls} extends React.Component<${cls}Props, {}> {
                        render() {
                            return (
                                <div className={classNames(styles.${lowerCase})}>${cls}</div>
                            );
                        }
                    }
                `)
            },
            {
                filename: `${dir}/${cls}/${cls}.scss`,
                content: trimLines(`
                    @import "${styleRelativePath}/index";
                    
                    .${lowerCase} {
                        
                    }
                `)
            },
            {
                filename: `${dir}/${cls}/${cls}.spec.tsx`,
                content: trimLines(`
                    import * as React from 'react';
                    import * as classNames from 'classnames';
                    import {${cls}} from './${cls}'; 
                    import * as styles from './${cls}.scss';
                    
                    describe('${cls}', () => {
                        let renderer: any;
                        beforeEach(() => {
                                                        
                        });
                        
                        it('case1', () => {
                            const result = renderer(<${cls}/>);
                            expect(result).toEqual(<div className={classNames(styles.${lowerCase})}>${cls}</div>);                        
                        });
                    });
                `)
            }

        ]
    }
}