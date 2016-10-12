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
        // const styleRelativePath = relative(dir, findGenTemplatesRoot() + '/styles/');
        return [
            {
                filename: `${dir}/${cls}/${cls}.tsx`,
                content: trimLines(`
                    import * as React from 'react';
                    
                    interface ${cls}Props {
                        
                    }
                    
                    export class ${cls} extends React.Component<${cls}Props, {}> {
                        render() {
                            return (
                                <div className="${lowerCase}"}>${cls}</div>
                            );
                        }
                    }
                `),
            },
            {
                filename: `${dir}/${cls}/${cls}.scss`,
                content: trimLines(`
                    .${lowerCase} {
                        
                    }
                `)
            },
            {
                filename: `${dir}/${cls}/${cls}.spec.tsx`,
                content: trimLines(`
                    import * as React from 'react';
                    import {${cls}} from './${cls}'; 
                    
                    describe('${cls}', () => {
                        let renderer: any;
                        beforeEach(() => {
                                                        
                        });
                        
                        it('case1', () => {
                            const result = renderer(<${cls}/>);
                            expect(result).toEqual(<div className="${lowerCase}"}>${cls}</div>);                        
                        });
                    });
                `)
            }

        ]
    }
}