'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _codemirror = require('codemirror');

var _codemirror2 = _interopRequireDefault(_codemirror);

require('codemirror/lib/codemirror.css');

require('codemirror/mode/markdown/markdown');

require('github-markdown-css');

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _Radium = require('Radium');

var _Radium2 = _interopRequireDefault(_Radium);

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _ControlBar = require('./ControlBar');

var _ControlBar2 = _interopRequireDefault(_ControlBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  mkeditor: {
    position: 'relative',
    width: '100%',
    minHeight: '340px'
  },
  navbar: {
    position: 'absolute',
    width: '100%',
    background: '#f5f5f5',
    border: '1px solid rgba(0,0,0,.06)',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    height: '40px',
    overflow: 'hidden'
  },
  content: {
    position: 'absolute',
    top: '40px',
    bottom: 0,
    width: '100%',
    borderLeft: '1px solid #ddd',
    borderRight: '1px solid #ddd',
    borderBottom: '1px solid #ddd',
    background: '#fff',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px'
  },
  code: {
    height: '100%',
    overflowY: 'scroll'
  },
  preview: {
    padding: '20px',
    overflowY: 'scroll',
    position: 'relative'
  },
  hide: {
    display: 'none'
  },
  fullscreen: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 990,
    height: '100%'
  }
};

var splitStyles = {
  content: {
    display: 'flex'
  },
  code: {
    flex: 1,
    borderRight: '1px solid #ddd'
  },
  preview: {
    flex: 1
  }
};

var MDEditor = function (_React$Component) {
  _inherits(MDEditor, _React$Component);

  function MDEditor() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, MDEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MDEditor)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      active: 'code',
      html: '',
      fullscreen: false
    }, _this.onChange = function () {
      if (_this.props.mode === 'split') {
        _this.setState({
          html: (0, _marked2.default)(_this.codeMirror.getValue())
        });
      }
    }, _this.onActiveChange = function (active) {
      if (active === 'code') {
        _this.setState({
          active: 'code'
        });
      } else if (active === 'preview') {
        _this.setState({
          active: 'preview',
          html: (0, _marked2.default)(_this.codeMirror.getValue())
        });
      }
    }, _this.onFullScreenChange = function () {
      _this.setState({
        fullscreen: !_this.state.fullscreen
      });
    }, _this.resize = function () {
      _this.codeParent.lastChild.style.height = _this.codeParent.offsetHeight + 'px';
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MDEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.codeMirror = _codemirror2.default.fromTextArea(_reactDom2.default.findDOMNode(this.refs.codemirror), this.props.codemirror);
      this.codeMirror.on('change', this.onChange);
      this.codeParent = _reactDom2.default.findDOMNode(this.refs.codeParent);
      this.resize();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _state = this.state;
      var fullscreen = _state.fullscreen;
      var mode = _state.mode;

      if (prevState.fullscreen !== fullscreen || prevState.mode !== mode) {
        this.resize();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var md = _props.md;
      var height = _props.height;
      var mode = _props.mode;
      var _state2 = this.state;
      var active = _state2.active;
      var html = _state2.html;
      var fullscreen = _state2.fullscreen;


      var mkeditorStyles = [styles.mkeditor, { height: height + 'px' }, fullscreen ? styles.fullscreen : null];
      var contentStyles = [styles.content];
      var codeStyles = [styles.code];
      var previewStyles = [styles.preview];

      if (mode === 'tab') {
        codeStyles.push(active === 'code' ? null : styles.hide);
        previewStyles.push(active === 'preview' ? null : styles.hide);
      } else if (mode === 'split') {
        contentStyles.push(splitStyles.content);
        codeStyles.push(splitStyles.code);
        previewStyles.push(splitStyles.preview);
      }
      return _react2.default.createElement(
        'div',
        { style: mkeditorStyles },
        _react2.default.createElement(
          'div',
          { style: styles.navbar },
          _react2.default.createElement(_Toolbar2.default, { getCM: function getCM() {
              return _this2.codeMirror;
            } }),
          _react2.default.createElement(_ControlBar2.default, {
            mode: mode,
            active: active,
            onActiveChange: this.onActiveChange,
            fullscreen: fullscreen,
            onFullScreenChange: this.onFullScreenChange
          })
        ),
        _react2.default.createElement(
          'div',
          { style: contentStyles },
          _react2.default.createElement(
            'div',
            { ref: 'codeParent', style: codeStyles },
            _react2.default.createElement('textarea', {
              ref: 'codemirror',
              style: { display: 'none' },
              value: md
            })
          ),
          _react2.default.createElement('div', {
            style: previewStyles,
            className: 'markdown-body',
            dangerouslySetInnerHTML: { __html: html }
          })
        )
      );
    }
  }]);

  return MDEditor;
}(_react2.default.Component);

MDEditor.defaultProps = {
  md: '',
  height: 500,
  mode: 'split',
  codemirror: {
    mode: 'markdown',
    lineNumbers: false,
    indentWithTabs: true,
    lineWrapping: true,
    tabSize: '2'
  }
};
MDEditor.propTypes = {
  md: _react.PropTypes.string,
  height: _react.PropTypes.number,
  mode: _react.PropTypes.oneOf(['tab', 'split']),
  codemirror: _react.PropTypes.object
};
exports.default = (0, _Radium2.default)(MDEditor);