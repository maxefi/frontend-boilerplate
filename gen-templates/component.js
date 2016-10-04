"use strict";
var gen_templates_1 = require("gen-templates");
var path_1 = require("path");
var Component = (function () {
    function Component() {
    }
    Component.prototype.help = function () {
        return "\n            Creates something good\n        ";
    };
    Component.prototype.generator = function (args) {
        var name = args._[0];
        if (!name) {
            throw new Error("name is required");
        }
        var cls = gen_templates_1.UpperCamelCase(name);
        var lowerCase = gen_templates_1.lowerCamelCase(name);
        var dir = gen_templates_1.currentDir();
        var styleRelativePath = path_1.relative(dir, gen_templates_1.findGenTemplatesRoot() + '/styles/');
        return [
            {
                filename: dir + "/" + cls + "/" + cls + ".tsx",
                content: gen_templates_1.trimLines("\n                    import * as React from 'react';\n                    import * as classNames from 'classnames';\n                    import * as styles from './" + cls + ".scss';\n                    import * as bs from '" + styleRelativePath + "/bootstrap.scss';\n                    \n                    interface " + cls + "Props {\n                        \n                    }\n                    export class " + cls + " extends React.Component<" + cls + "Props, {}> {\n                        render() {\n                            return (\n                                <div className={classNames(styles." + lowerCase + ")}>" + cls + "</div>\n                            );\n                        }\n                    }\n                ")
            },
            {
                filename: dir + "/" + cls + "/" + cls + ".scss",
                content: gen_templates_1.trimLines("\n                    @import \"" + styleRelativePath + "/index\";\n                    \n                    ." + lowerCase + " {\n                        \n                    }\n                ")
            },
            {
                filename: dir + "/" + cls + "/" + cls + ".spec.tsx",
                content: gen_templates_1.trimLines("\n                    import * as React from 'react';\n                    import * as classNames from 'classnames';\n                    import {" + cls + "} from './" + cls + "'; \n                    import * as styles from './" + cls + ".scss';\n                    \n                    describe('" + cls + "', () => {\n                        let renderer: any;\n                        beforeEach(() => {\n                                                        \n                        });\n                        \n                        it('case1', () => {\n                            const result = renderer(<" + cls + "/>);\n                            expect(result).toEqual(<div className={classNames(styles." + lowerCase + ")}>" + cls + "</div>);                        \n                        });\n                    });\n                ")
            }
        ];
    };
    return Component;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Component;
