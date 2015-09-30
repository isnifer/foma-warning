import React from 'react';

const { Component, PropTypes } = React;

export default class FomaWarning extends Component {

    constructor (props) {
        super(props);

        this.state = {
            visible: false
        };
    }

    static propTypes = {
        items: PropTypes.array.isRequired,
        visible: PropTypes.bool
    };

    static defaultProps = {
        items: []
    };

    renderItem (item, i) {

        var onClick = () => {
            document.querySelector('[name="' + item.fieldName + '"]').focus();
        };

        return (
            <span key={i}>
                {i === 0 ? '' : ', '}
                <span
                    className={this.props.className ? this.props.className + '__item' : 'foma-warning__item'}
                    onClick={onClick}>
                    {item.name}
                </span>
            </span>
        );
    }

    detectClick (e) {
        var className = e.target.className;
        var classNames = this.props.className ?
            [this.props.className, this.props.className + '__item'] : ['foma-warning', 'foma-warning__item'];
        let isParent = className.indexOf(classNames[0]) > -1 || className.indexOf(classNames[1]) > -1;

        this.setState({visible: true});
    }

    render () {
        var items = this.props.items;
        var visible = this.props.hasOwnProperty('visible') ? this.props.visible : this.state.visible;

        if (items.length && visible) {
            return (
                <div onClick={::this.detectClick}>
                    <div className={this.props.className || 'foma-warning'}>
                        {this.props.message || 'Необходимо указать:'} {items.map((item, i) => {
                            return this.renderItem(item, i);
                        })}
                    </div>
                    {this.props.children}
                </div>
            );
        }

        return (
            <div onClick={::this.detectClick}>
                {this.props.children}
            </div>
        );
    }
}
