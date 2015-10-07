import React from 'react';

const { Component, PropTypes } = React;

export default class FomaWarning extends Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
        visible: PropTypes.oneOfType([
            PropTypes.bool, PropTypes.number
        ]).isRequired
    };

    static defaultProps = {
        items: []
    };

    onClickHandler (item) {
        var field = document.querySelector('[name="' + item.fieldName + '"]');

        if (item.handler) {
            item.handler();
        } else if (field) {

            // Ha-ha! Blink browsers can't fire focus
            // this hack helps fix it
            setTimeout(function () {
                field.focus();
            }, 0);
        }
    }

    componentWillReceiveProps (nextProps) {
        if (
            nextProps.items && nextProps.items.length &&
            nextProps.visible && nextProps.visible !== this.props.visible
        ) {
            this.onClickHandler(nextProps.items[0]);
        }
    }

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
