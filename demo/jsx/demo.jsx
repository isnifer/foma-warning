import React from 'react';
import Valya from 'valya';
import Foma from 'foma';
import FomaWarning from '../../index';

const { Component, PropTypes } = React;

const requiredFields = {
    username: 'username',
    company: 'company'
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
            company: null
        };
    }

    setCompany (e) {
        this.setState({company: e.target.value});
    }

    setUsername (e) {
        this.setState({username: e.target.value});
    }

    submitForm (e) {
        e.preventDefault();

        if (this.props.isValid) {
            alert('Form successfully send');
        }
    }

    render () {
        return (
            <form
                className="demo"
                style={{width: '500px', padding: '50px 0 0 50px'}}
                noValidate
                onSubmit={::this.submitForm}>
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
                        validators={[
                            {
                                validator (value, params) {
                                    if (value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(params.message);
                                },
                                params: {
                                    message: 'Field is required'
                                }
                            }
                        ]}
                        silentInitValidation={true}>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            placeholder={requiredFields.company}
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
                        validators={[
                            {
                                validator (value, params) {
                                    if (value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(params.message);
                                },
                                params: {
                                    message: 'Field is required'
                                }
                            }
                        ]}
                        silentInitValidation={true}>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder={requiredFields.username}
                            className="form-control"
                            value={this.state.username}
                            onChange={::this.setUsername} />
                    </Validator>
                </div>
                <div className="form-group">
                    <FomaWarning
                        message="These fields are required:"
                        items={this.props.invalidFields.map(function (e) {
                            return {
                                fieldName: e,
                                name: requiredFields[e]
                            }
                        })}>
                        <button
                            type="submit"
                            className={'btn btn-success' + (this.props.isInvalid ? ' disabled' : '')}>
                            Save
                        </button>
                    </FomaWarning>
                </div>
            </form>
        );
    }
}

React.render(<Demo />, document.querySelector('.main'));
