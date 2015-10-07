import React from 'react';

const { Component, PropTypes } = React;

export default class FomaWarning extends Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
        visible: PropTypes.bool.isRequired
    };

    static defaultProps = {
        items: []
    };

    onClickHandler (item) {
        var field = document.querySelector('[name="' + item.fieldName + '"]');

        if (item.handler) {
            item.handler();
        } else if (field) {
            field.focus();
        }
    };

    renderItem (item, i) {
        return (
            <span key={i}>
                {i === 0 ? '' : ', '}
                <span
                    className="foma-warning__item"
                    onClick={this.onClickHandler.bind(this, item)}>
                    {item.name}
                </span>
            </span>
        );
    }

    render () {
        const props = this.props;
        if (props.items.length && props.visible) {
            return (
                <span className="foma-warning">
                    {props.message || 'Необходимо указать:'} {props.items.map((item, i) => {
                        return this.renderItem(item, i);
                    })}
                </span>
            );
        }

        return null;
    }
}
