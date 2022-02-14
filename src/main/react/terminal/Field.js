import React from 'react';
import {normalize} from '../utils/UniformedResourceNameUtils';
import Utils from "../utils/Utils";

class Field extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            commandHistory: [],
            commandHistoryIndex: 0,
            fieldHistory: [],
            userInput: ''
        }

        this.error = {
            INVALID_URL: 0x00,
            NOT_SUPPORTED_FLAG: 0x01,
            INVALID_FLAG_VALUE: 0x02,
            NOT_RECOGNIZED: 0x03
        }

        this.availableFlags = [{
            flag: '--view',
            purpose: 'Set the hits view type. Available view types are: \'total\' and \'today-total\'. (Default is \'total\')',
            supported: ['total', 'today-total']
        }, {
            flag: '--extra-count',
            purpose: 'Set the number of additions to hits. This is useful when migrating counts.'
        }, {
            flag: '--style',
            purpose: 'Set the style of the badge. Available styles are: \'flat\', \'flat-square\', \'for-the-badge\', \'plastic\' and \'social\'. (Default is \'flat\')',
            supported: ['flat', 'flat-square', 'for-the-badge', 'plastic', 'social']
        }, {
            flag: '--label',
            purpose: 'Set the text of the left side of the badge. (Default is \'hits\')'
        }, {
            flag: '--color',
            purpose: 'Set the color of the right side of the badge. (Default is \'#4c1\')'
        }, {
            flag: '--label-color',
            purpose: 'Set the color of the left side of the badge. (Default is \'#555\')'
        }, {
            flag: '--link',
            purpose: 'Set the url(s) to link to the badge.'
        }, {
            flag: '--logo',
            purpose: 'Set the logo to use. (simple-icons slug or data:image/svg+xml;base64,..)'
        }, {
            flag: '--logo-width',
            purpose: 'Set the custom logo width.'
        }]

        this.handleTyping = this.handleTyping.bind(this)
        this.handleInputEvaluation = this.handleInputEvaluation.bind(this)
        this.handleInputExecution = this.handleInputExecution.bind(this)
    }
    componentDidMount() {
        this.handleInputEvaluation('help')
    }
    componentDidUpdate() {
        const field = document.querySelector('#field')

        field.scrollTop = field.scrollHeight
    }
    handleTyping(e) {
        const { key } = e

        if (key === 'Escape') {
            this.setState({ userInput: '' })
        } else if (key === 'ArrowUp') {
            const { commandHistory, commandHistoryIndex } = this.state
            const upperLimit = commandHistoryIndex >= commandHistory.length

            if (!upperLimit) {
                this.setState(state => ({
                    commandHistoryIndex: state.commandHistoryIndex += 1,
                    userInput: state.commandHistory[state.commandHistoryIndex - 1]
                }))
            }
        } else if (key === 'ArrowDown') {
            const { commandHistory, commandHistoryIndex } = this.state
            const lowerLimit = commandHistoryIndex === 0

            if (!lowerLimit) {
                this.setState(state => ({
                    commandHistoryIndex: state.commandHistoryIndex -= 1,
                    userInput: state.commandHistory[state.commandHistoryIndex - 1] || ''
                }))
            }
        } else if (key === 'Enter') {
            const userInput = this.state.userInput.trim()

            if (userInput.length) {
                this.setState(state => ({
                    commandHistory: userInput === '' ? state.commandHistory : [userInput, ...state.commandHistory],
                    commandHistoryIndex: 0,
                    fieldHistory: [...state.fieldHistory, {text: userInput, isCommand: true}],
                    userInput: ''
                }), () => this.handleInputEvaluation(userInput))
            } else {
                this.setState(state => ({
                    fieldHistory: [...state.fieldHistory, {isCommand: true}],
                    userInput: ''
                }))
            }
        }
    }
    handleInputEvaluation(input) {
        const { handleInputExecution } = this

        const cleanedInput = input.trim()
        const dividedInput = cleanedInput.match(/([^\s]+)(\"(.*?)\")|([^\s]+)/g);
        const parsedCommand = dividedInput[0].toLowerCase()
        const parsedParameters = dividedInput.slice(1).filter(s => s[0] !== '-')
        const parsedFlags = dividedInput.slice(1).filter(s => s[0] === '-')

        return handleInputExecution(parsedCommand, parsedParameters, parsedFlags)
    }
    handleInputExecution(command, parameters = [], flags = []) {
        const { error } = this;

        if (command === 'help' || command === '/help' || command === '-help' || command === '--help' || command === '?' || command === '/?') {
            return this.setState(state => ({
                fieldHistory: [...state.fieldHistory, {
                    text: [
                        'Usage:',
                        '',
                        '\u00A0\u00A0url [parameters...]',
                        '',
                        'Available parameters:',
                        '',
                        ...this.availableFlags
                            .map(({ flag, purpose }) => `\u00A0\u00A0${flag}${Array.from({length: 15 - flag.length}, x => '\u00A0').join('')}${purpose}`),
                        '',
                        'Example usages:',
                        '',
                        '\u00A0\u00A0https://github.com/silentsoft/hits',
                        '\u00A0\u00A0https://github.com/silentsoft/hits --view=today-total',
                        '\u00A0\u00A0https://github.com/silentsoft/hits --extra-count=1000'
                    ],
                    hasBuffer: true
                }]
            }))
        } else if (command === 'cls' || command === 'clear') {
            return this.setState({fieldHistory: []})
        } else if (command === 'exit' || command === 'quit') {
            return window.location.href = 'https://github.com/silentsoft/hits'
        } else if (command === 'rank') {
            return this.setState(state => ({
                fieldHistory: [...state.fieldHistory, {text: `This feature is not yet available.`, hasBuffer: true}]
            }))
        } else if (command.length && command.includes('.') && command[0] !== '.' && command[command.length-1] !== '.') {
            const urn = normalize(command);

            if (parameters.length) {
                return this.setState(state => ({fieldHistory: [...state.fieldHistory, this.giveError(error.NOT_RECOGNIZED, parameters)]}))
            }

            const notSupportedParameters = flags.filter(flag =>
                this.availableFlags.filter(p =>
                    p.flag === flag.split('=')[0]
                ).length === 0
            );
            if (notSupportedParameters.length) {
                return this.setState(state => ({fieldHistory: [...state.fieldHistory, this.giveError(error.NOT_SUPPORTED_FLAG, notSupportedParameters[0].split('=')[0])]}));
            }

            const invalidParameterValues = flags.filter(flag =>
                this.availableFlags.filter(p =>
                    p.flag === flag.split('=')[0] && (p.supported === undefined || (p.supported && p.supported.includes(flag.split('=')[1])))
                ).length === 0
            );
            if (invalidParameterValues.length) {
                return this.setState(state => ({fieldHistory: [...state.fieldHistory, this.giveError(error.INVALID_FLAG_VALUE, invalidParameterValues[0].split('=')[1])]}));
            }

            const query = this.toQueryString(flags)
            return this.setState(state => ({
                fieldHistory: [...state.fieldHistory, {text: [
                    'Markdown:',
                    '',
                    `\u00A0\u00A0[![Hits](https://hits.sh/${urn}.svg${query})](https://hits.sh)`,
                    '',
                    'HTML:',
                    '',
                    `\u00A0\u00A0<a href="https://hits.sh"><img src="https://hits.sh/${urn}.svg${query}"/></a>`,
                    '',
                    'Image Link:',
                    '',
                    `\u00A0\u00A0https://hits.sh/${urn}.svg${query}`
                ], hasBuffer: true}]
            }))
        } else {
            return this.setState(state => ({fieldHistory: [...state.fieldHistory, this.giveError(error.INVALID_URL, command)]}))
        }
    }
    toQueryString(flags) {
        const camel = (value) => {
            if (value.includes('-')) {
                return value.toLowerCase().replace(/[-][a-z]/g, capture => capture.replace('-', '').toUpperCase());
            }
            return value;
        }
        const key = (flag) => {
            return flag.split('=')[0].replace('--', '');
        }
        const value = (flag) => {
            if (flag.includes('=')) {
                return encodeURI(flag.substring(flag.indexOf('=')+1, flag.length).replace(/[\"]/g, ''));
            }
            return '';
        }
        return Utils.toQueryString(flags.reduce((acc, flag) => {
            if (key(flag) === 'link') {
                if (Array.isArray(acc[camel(key(flag))])) {
                    if (acc[camel(key(flag))].length < 2) {
                        acc[camel(key(flag))].push(value(flag));
                    }
                } else {
                    acc[camel(key(flag))] = [value(flag)];
                }
            } else {
                acc[camel(key(flag))] = value(flag);
            }
            return acc;
        }, {}));
    }
    giveError(type, extra) {
        const field = { text: '', isError: true, hasBuffer: true}
        const { error } = this;

        if (type === error.INVALID_URL) {
            field.text = `'${extra}' is an invalid url. Check the spelling and try again. If you don't know what commands are recognized, type HELP.`;
        } else if (type === error.NOT_SUPPORTED_FLAG) {
            field.text = `The flag '${extra}' is not supported. Check the spelling and try again. If you don't know what commands are recognized, type HELP.`;
        } else if (type === error.INVALID_FLAG_VALUE) {
            field.text = `'${extra}' is an invalid flag value. Check the spelling and try again. If you don't know what commands are recognized, type HELP.`;
        } else if (type === error.NOT_RECOGNIZED) {
            field.text = `${extra} : The term or expression '${extra}' is not recognized. Check the spelling and try again. If you don't know what commands are recognized, type HELP.`;
        }

        return field
    }
    render() {
        const { theme } = this.props
        const { fieldHistory, userInput } = this.state

        return <div
            id="field"
            className={theme.app.backgroundColor === '#333444' ? 'dark' : 'light'}
            style={theme.field}
            tabIndex={0}
        >
            {fieldHistory.map(({ text, isCommand, isError, hasBuffer }, index) => {
                if (Array.isArray(text)) {
                    return <MultiText input={text} isError={isError} hasBuffer={hasBuffer} key={index}/>
                }

                return <Text input={text} isCommand={isCommand} isError={isError} hasBuffer={hasBuffer} key={index}/>
            })}
            <UserText input={userInput} theme={theme.field} typingHandler={this.handleTyping} onChangeHandler={e => this.setState(state => ({userInput: e.target.value}))} />
        </div>
    }
}

const Text = ({ input, isCommand, isError, hasBuffer }) => <>
    <div>
        {isCommand && <div id="query">Hits&gt;</div>}
        <span className={!isCommand && isError ? 'error' : ''}>{input}</span>
    </div>
    {hasBuffer && <div></div>}
</>
const MultiText = ({ input, isError, hasBuffer }) => <>
    {input.map((s, index) => <Text input={s} isError={isError} key={index}/>)}
    {hasBuffer && <div></div>}
</>
const UserText = ({ input, theme, typingHandler, onChangeHandler }) => <div id="input-container">
    <div id="query">Hits></div>
    <input id="field-input" type="text" style={theme} value={input} onKeyDown={typingHandler} onChange={onChangeHandler} />
</div>

export default Field;