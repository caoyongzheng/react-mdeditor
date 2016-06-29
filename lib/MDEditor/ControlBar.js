'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Radium = require('Radium');

var _Radium2 = _interopRequireDefault(_Radium);

var _Icons = require('Icons');

var _Icons2 = _interopRequireDefault(_Icons);

var _SvgIcon = require('SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

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
    color: '#444',
    ':hover': {
      backgroundColor: '#fafafa',
      border: '1px solid rgba(0, 0, 0, 0.1)'
    }
  },
  active: {
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

  return _react2.default.createElement(
    'div',
    { style: styles.controlBar },
    _react2.default.createElement(
      'ul',
      { style: styles.list },
      mode === 'tab' ? _react2.default.createElement(
        'li',
        {
          key: 'code',
          style: [styles.listItem, active === 'code' ? styles.active : null],
          onClick: function onClick() {
            return onActiveChange('code');
          }
        },
        _react2.default.createElement(
          'a',
          { style: styles.listItemA },
          'Markdown'
        )
      ) : null,
      mode === 'tab' ? _react2.default.createElement(
        'li',
        {
          key: 'preview',
          style: [styles.listItem, active === 'preview' ? styles.active : null],
          onClick: function onClick() {
            return onActiveChange('preview');
          }
        },
        _react2.default.createElement(
          'span',
          { style: styles.listItemA },
          'Preview'
        )
      ) : null,
      _react2.default.createElement(
        'li',
        {
          key: 'fullscreen',
          style: styles.listItem,
          onClick: onFullScreenChange
        },
        _react2.default.createElement(_SvgIcon2.default, fullscreen ? _Icons2.default.minify : _Icons2.default.expand)
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
exports.default = (0, _Radium2.default)(ControlBar);