'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SvgIcon = function (_React$Component) {
  _inherits(SvgIcon, _React$Component);

  function SvgIcon() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, SvgIcon);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SvgIcon)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.getTransform = function (position, direction, size, realIconSize) {
      var scaleW = size[0] / realIconSize[0];
      var scaleH = size[1] / realIconSize[1];
      return 'translate(' + position.join(', ') + ')\n    scale(' + direction.join(', ') + ' ) scale(' + scaleW + ',' + scaleH + ')';
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SvgIcon, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var paths = _props.paths;
      var size = _props.size;
      var position = _props.position;
      var direction = _props.direction;
      var realIconSize = _props.realIconSize;
      var style = _props.style;
      var className = _props.className;
      var onClick = _props.onClick;

      return _react2.default.createElement(
        'svg',
        {
          style: style,
          className: className,
          width: size[0],
          height: size[1],
          onClick: onClick
        },
        _react2.default.createElement(
          'g',
          { transform: this.getTransform(position, direction, size, realIconSize) },
          paths.map(function (path, i) {
            return _react2.default.createElement('path', { key: i, d: path });
          })
        )
      );
    }
  }]);

  return SvgIcon;
}(_react2.default.Component);

SvgIcon.defaultProps = {
  size: [16, 16],
  position: [0, 0],
  direction: [1, 1],
  realIconSize: [1024, 1024]
};
SvgIcon.propTypes = {
  onClick: _react.PropTypes.func,
  paths: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired,
  size: _react.PropTypes.arrayOf(_react.PropTypes.number),
  position: _react.PropTypes.arrayOf(_react.PropTypes.number),
  direction: _react.PropTypes.arrayOf(_react.PropTypes.number),
  realIconSize: _react.PropTypes.arrayOf(_react.PropTypes.number)
};
exports.default = SvgIcon;
//# sourceMappingURL=SvgIcon.js.map