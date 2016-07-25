'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _icons = require('./icons.json');

var _icons2 = _interopRequireDefault(_icons);

var _SvgIcon = require('../SvgIcon/SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  controlBar: {
    float: 'right'
  },
  list: {
    listStyle: 'none',
    float: 'left'
  },
  listItem: {
    float: 'left',
    height: '40px',
    lineHeight: '40px',
    textAligin: 'center',
    border: '1px solid transparent',
    textShadow: '0 1px 0 #fff',
    margin: '-1px -1px -1px 0',
    cursor: 'pointer',
    fontSize: '11px',
    padding: '0 15px',
    color: '#444'
  },
  active: {
    backgroundColor: '#fafafa',
    border: '1px solid rgba(0, 0, 0, 0.1)'
  },
  hover: {
    backgroundColor: '#fafafa',
    border: '1px solid rgba(0, 0, 0, 0.1)'
  }
};

function ControlBar(_ref) {
  var mode = _ref.mode;
  var active = _ref.active;
  var onActiveChange = _ref.onActiveChange;
  var fullscreen = _ref.fullscreen;
  var onFullScreenChange = _ref.onFullScreenChange;

  var itemStyle = _lodash2.default.merge({}, styles.listItem);
  var activeItemStyle = _lodash2.default.merge({}, itemStyle, styles.active);
  return _react2.default.createElement(
    'div',
    { style: styles.controlBar },
    _react2.default.createElement(
      'ul',
      { style: styles.list },
      mode === 'tab' ? _react2.default.createElement(
        _Item2.default,
        {
          key: 'code',
          style: active === 'code' ? activeItemStyle : itemStyle,
          onClick: function onClick() {
            return onActiveChange('code');
          },
          hoverStyle: styles.hover
        },
        _react2.default.createElement(
          'a',
          { style: styles.listItemA },
          'Markdown'
        )
      ) : null,
      mode === 'tab' ? _react2.default.createElement(
        _Item2.default,
        {
          key: 'preview',
          style: active === 'preview' ? activeItemStyle : itemStyle,
          onClick: function onClick() {
            return onActiveChange('preview');
          },
          hoverStyle: styles.hover
        },
        _react2.default.createElement(
          'span',
          { style: styles.listItemA },
          'Preview'
        )
      ) : null,
      _react2.default.createElement(
        _Item2.default,
        {
          key: 'fullscreen',
          style: itemStyle,
          hoverStyle: styles.hover,
          onClick: onFullScreenChange
        },
        _react2.default.createElement(_SvgIcon2.default, fullscreen ? _icons2.default.minify : _icons2.default.expand)
      )
    )
  );
}
ControlBar.propTypes = {
  mode: _react.PropTypes.oneOf(['tab', 'split']).isRequired,
  active: _react.PropTypes.string.isRequired,
  onActiveChange: _react.PropTypes.func.isRequired,
  fullscreen: _react.PropTypes.bool.isRequired,
  onFullScreenChange: _react.PropTypes.func.isRequired
};
exports.default = ControlBar;