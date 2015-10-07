import React from 'react';
import Valya from 'valya';
import Foma from 'foma';
import FomaWarning from '../../index';

const { Component, PropTypes } = React;

const requiredFields = {
    company: {
        name: 'company'
    },
    username: {
        name: 'username'
    },
    browser: {
        name: 'browser',
        handler: () => {
            alert('Set your browser');
        }
    }
};

const standardValidator = {
    validator (value, params) {
        if (value) {
            return Promise.resolve();
        }

        return Promise.reject(params.message);
    },
    params: {
        message: 'Field is required'
    }
};

@Valya
class Validator extends Component {
    static displayName = 'Validator';

    _renderError() {
        if (!this.props.enabled || this.props.isValid) {
            return null;
        }

        return (
            <span className="validator__error" key="error">
                {this.props.validationErrorMessage}
            </span>
        );
    }

    render () {

        return (
            <span className="validator">
                <span className="validator__target" key="target">
                    {this.props.children}
                </span>
                {this._renderError()}
            </span>
        );
    }
}

@Foma
class Demo extends Component {
    static displayName = 'Demo';

    constructor (props) {
        super(props);

        this.state = {
            username: null,
            company: null,
            browser: null,
            fomaWarning: false
        };
    }

    setCompany (e) {
        this.setState({company: e.target.value});
    }

    setUsername (e) {
        this.setState({username: e.target.value});
    }

    submitForm (e) {
        if (this.props.isInvalid) {
            this.setState({fomaWarning: true});
        } else {
            alert('Form successfully send');
        }

        return e.preventDefault();
    }

    setBrowser (browser) {
        this.setState({browser: browser});
    }

    render () {
        return (
            <form
                className="demo"
                style={{width: '500px', padding: '50px 0 0 50px'}}
                noValidate>
                <div className="form-group">
                    <Validator
                        value={this.state.company}
                        onEnd={(isValid, message) => {
                            this.props.setValidationInfo({
                                isValid: isValid,
                                message: message,
                                name: 'company'
                            });
                        }}
                        validators={[standardValidator]}
                        silentInitValidation={true}>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            placeholder={requiredFields.company.name}
                            className="form-control"
                            value={this.state.company}
                            onChange={::this.setCompany} />
                    </Validator>
                </div>
                <div className="form-group">
                    <Validator
                        value={this.state.username}
                        onEnd={(isValid, message) => {
                            this.props.setValidationInfo({
                                isValid: isValid,
                                message: message,
                                name: 'username'
                            });
                        }}
                        validators={[standardValidator]}
                        silentInitValidation={true}>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder={requiredFields.username.name}
                            className="form-control"
                            value={this.state.username}
                            onChange={::this.setUsername} />
                    </Validator>
                </div>
                <div className="form-group">
                    <Validator
                        value={this.state.browser}
                        onEnd={(isValid, message) => {
                            this.props.setValidationInfo({
                                isValid: isValid,
                                message: message,
                                name: 'browser'
                            });
                        }}
                        validators={[standardValidator]}
                        silentInitValidation={true}>
                        {['chrome', 'firefox', 'opera', 'safari'].map((browser) => {
                            return (
                                <div
                                    className={browser + (this.state.browser === browser ? ' selected' : '')}
                                    onClick={this.setBrowser.bind(this, browser)}
                                    key={browser}>
                                    {browser}
                                </div>
                            );
                        })}
                    </Validator>
                </div>
                <div className="form-group">
                    <FomaWarning
                        message="These fields are required:"
                        items={this.props.invalidFields.map(function (e) {
                            return {
                                fieldName: e,
                                name: requiredFields[e].name,
                                handler: requiredFields[e].handler || null
                            }
                        })}
                        visible={this.state.fomaWarning}>
                    </FomaWarning>
                    <button
                        type="submit"
                        className={'btn btn-success' + (this.props.isInvalid ? ' disabled' : '')}
                        onClick={::this.submitForm}>
                        Save
                    </button>
                    {' '}
                    <button type="button" className="btn btn-secondary">
                        Cancel
                    </button>
                </div>
            </form>
        );
    }
}

React.render(<Demo />, document.querySelector('.main'));
