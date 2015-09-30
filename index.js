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

    function FomaWarning(props) {
        _classCallCheck(this, FomaWarning);

        _get(Object.getPrototypeOf(FomaWarning.prototype), 'constructor', this).call(this, props);

        this.state = {
            visible: false
        };
    }

    _createClass(FomaWarning, [{
        key: 'renderItem',
        value: function renderItem(item, i) {

            var onClick = function onClick() {
                document.querySelector('[name="' + item.fieldName + '"]').focus();
            };

            return _react2['default'].createElement(
                'span',
                { key: i },
                i === 0 ? '' : ', ',
                _react2['default'].createElement(
                    'span',
                    {
                        className: this.props.className ? this.props.className + '__item' : 'foma-warning__item',
                        onClick: onClick },
                    item.name
                )
            );
        }
    }, {
        key: 'detectClick',
        value: function detectClick(e) {
            var className = e.target.className;
            var classNames = this.props.className ? [this.props.className, this.props.className + '__item'] : ['foma-warning', 'foma-warning__item'];
            var isParent = className.indexOf(classNames[0]) > -1 || className.indexOf(classNames[1]) > -1;

            if (!isParent && this.props.items.length) {
                document.querySelector('[name="' + this.props.items[0].fieldName + '"]').focus();
            }

            this.setState({ visible: true });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            var items = this.props.items;
            var visible = this.props.hasOwnProperty('visible') ? this.props.visible : this.state.visible;

            if (items.length && visible) {
                return _react2['default'].createElement(
                    'span',
                    {
                        className: this.props.className ? this.props.className + 'wrapper' : 'foma-warning-wrapper',
                        onClick: this.detectClick.bind(this) },
                    _react2['default'].createElement(
                        'span',
                        { className: this.props.className || 'foma-warning' },
                        this.props.message || 'Необходимо указать:',
                        ' ',
                        items.map(function (item, i) {
                            return _this.renderItem(item, i);
                        })
                    ),
                    this.props.children
                );
            }

            return _react2['default'].createElement(
                'span',
                { onClick: this.detectClick.bind(this) },
                this.props.children
            );
        }
    }], [{
        key: 'propTypes',
        value: {
            items: PropTypes.array.isRequired,
            visible: PropTypes.bool
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
