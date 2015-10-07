'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Component = _react2['default'].Component;
var PropTypes = _react2['default'].PropTypes;

var FomaWarning = (function (_Component) {
    _inherits(FomaWarning, _Component);

    function FomaWarning() {
        _classCallCheck(this, FomaWarning);

        _get(Object.getPrototypeOf(FomaWarning.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(FomaWarning, [{
        key: 'onClickHandler',
        value: function onClickHandler(item) {
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
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.items && nextProps.items.length && nextProps.visible && nextProps.visible !== this.props.visible) {
                this.onClickHandler(nextProps.items[0]);
            }
        }
    }, {
        key: 'renderItem',
        value: function renderItem(item, i) {
            return _react2['default'].createElement(
                'span',
                { key: i },
                i === 0 ? '' : ', ',
                _react2['default'].createElement(
                    'span',
                    {
                        className: 'foma-warning__item',
                        onClick: this.onClickHandler.bind(this, item) },
                    item.name
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            var props = this.props;
            if (props.items.length && props.visible) {
                return _react2['default'].createElement(
                    'span',
                    { className: 'foma-warning' },
                    props.message || 'Необходимо указать:',
                    ' ',
                    props.items.map(function (item, i) {
                        return _this.renderItem(item, i);
                    })
                );
            }

            return null;
        }
    }], [{
        key: 'propTypes',
        value: {
            items: PropTypes.array.isRequired,
            visible: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired
        },
        enumerable: true
    }, {
        key: 'defaultProps',
        value: {
            items: []
        },
        enumerable: true
    }]);

    return FomaWarning;
})(Component);

exports['default'] = FomaWarning;
module.exports = exports['default'];
