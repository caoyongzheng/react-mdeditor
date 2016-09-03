'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icons = require('./icons.json');

var _icons2 = _interopRequireDefault(_icons);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _SvgIcon = require('../SvgIcon/SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  toolBar: {
    float: 'left'
  },
  list: {
    listStyle: 'none'
  },
  listItem: {
    float: 'left',
    height: '40px',
    lineHeight: '42px',
    textAligin: 'center',
    border: '1px solid transparent',
    textShadow: '0 1px 0 #fff',
    margin: '-1px 0px -1px -1px',
    cursor: 'pointer',
    fontSize: '11px',
    padding: '0 12px'
  },
  hover: {
    backgroundColor: '#fafafa',
    color: '#444',
    border: '1px solid rgba(0, 0, 0, 0.1)'
  }
};

var Icons = ['bold', 'italic', 'strike', 'link', 'image', 'blockquote', 'unorderedList', 'orderedList'];

var FORMATS = {
  bold: { type: 'inline', token: 'strong', before: '**', after: '**', placeholder: 'bold text' },
  italic: { type: 'inline', token: 'em', before: '_', after: '_', placeholder: 'italic text' },
  strike: { type: 'inline', token: 'strike', before: '~~', after: '~~',
    placeholder: 'strike text' },
  link: { type: 'inline', token: 'link', before: '[', after: ']()', placeholder: 'href title' },
  image: { type: 'inline', token: 'tag', before: '![', after: ']()', placeholder: 'image title' },
  blockquote: { type: 'block', token: 'quote', before: '>', re: /^>\s+/, placeholder: 'quote' },
  unorderedList: { type: 'block', token: 'variable-2', before: '* ', re: /^[\*\-]\s+/,
    placeholder: 'unorderedList' },
  orderedList: { type: 'block', token: 'variable-2', before: '1. ', re: /^\d+\.\s+/,
    placeholder: 'orderedList' }
};

var FORMAT_TOKENS = {};

Object.keys(FORMATS).forEach(function (key) {
  if (FORMATS[key].token) {
    if (FORMAT_TOKENS[FORMATS[key].token]) {
      FORMAT_TOKENS[FORMATS[key].token] += ',' + key;
    } else {
      FORMAT_TOKENS[FORMATS[key].token] = key;
    }
  }
});

function getCursorState(cm, pos) {
  pos = pos || cm.getCursor('start');
  var cs = {};
  var token = cs.token = cm.getTokenAt(pos);
  if (!token.type) return cs;
  var tokens = token.type.split(' ');
  tokens.forEach(function (t) {
    if (FORMAT_TOKENS[t]) {
      FORMAT_TOKENS[t].split(',').forEach(function (key) {
        cs[key] = true;
      });
      return;
    }
  });
  return cs;
}

var operations = {
  inlineApply: function inlineApply(cm, format) {
    var startPoint = cm.getCursor('start');
    var endPoint = cm.getCursor('end');

    cm.replaceSelection(format.before + cm.getSelection() + format.after);
    startPoint.ch += format.before.length;
    endPoint.ch += format.before.length;
    cm.setSelection(startPoint, endPoint);
    cm.focus();
  },
  inlineRemove: function inlineRemove(cm, format) {
    var startPoint = cm.getCursor('start');
    var endPoint = cm.getCursor('end');
    var line = cm.getLine(startPoint.line);

    var startPos = startPoint.ch;
    while (startPos) {
      if (line.substr(startPos, format.before.length) === format.before) {
        break;
      }
      startPos--;
    }

    var endPos = endPoint.ch;
    while (endPos <= line.length) {
      if (line.substr(endPos, format.after.length) === format.after) {
        break;
      }
      endPos++;
    }

    var start = line.slice(0, startPos);
    var mid = line.slice(startPos + format.before.length, endPos);
    var end = line.slice(endPos + format.after.length);
    cm.replaceRange(start + mid + end, { line: startPoint.line, ch: 0 }, { line: startPoint.line, ch: line.length + 1 });
    cm.setSelection({ line: startPoint.line, ch: start.length }, { line: startPoint.line, ch: (start + mid).length });
    cm.focus();
  },
  blockApply: function blockApply(cm, format) {
    var startPoint = cm.getCursor('start');
    var line = cm.getLine(startPoint.line);
    var text = format.before + ' ' + (line.length ? line : format.placeholder);
    cm.replaceRange(text, { line: startPoint.line, ch: 0 }, { line: startPoint.line, ch: line.length + 1 });
    cm.setSelection({ line: startPoint.line, ch: format.before.length + 1 }, { line: startPoint.line, ch: text.length });
    cm.focus();
  },
  blockRemove: function blockRemove(cm, format) {
    var startPoint = cm.getCursor('start');
    var line = cm.getLine(startPoint.line);
    var text = line.replace(format.re, '');
    cm.replaceRange(text, { line: startPoint.line, ch: 0 }, { line: startPoint.line, ch: line.length + 1 });
    cm.setSelection({ line: startPoint.line, ch: 0 }, { line: startPoint.line, ch: text.length });
    cm.focus();
  }
};

function applyFormat(getCM, key) {
  var cm = getCM();
  var cs = getCursorState(cm);
  var format = FORMATS[key];
  operations[format.type + (cs[key] ? 'Remove' : 'Apply')](cm, format);
}

function ToolBar(_ref) {
  var getCM = _ref.getCM;
  var hide = _ref.hide;

  var toolBarStyles = _lodash2.default.merge({}, styles.toolBar);
  if (hide) {
    _lodash2.default.merge(toolBarStyles, { display: 'none' });
  }
  return _react2.default.createElement(
    'div',
    { style: toolBarStyles },
    _react2.default.createElement(
      'ul',
      { style: styles.list },
      Icons.map(function (icon, i) {
        return _react2.default.createElement(
          _Item2.default,
          {
            key: i,
            style: styles.listItem,
            onClick: function onClick() {
              return applyFormat(getCM, icon);
            },
            hoverStyle: styles.hover
          },
          _react2.default.createElement(_SvgIcon2.default, _icons2.default[icon])
        );
      })
    )
  );
}

ToolBar.propTypes = {
  getCM: _react.PropTypes.func,
  hide: _react.PropTypes.bool
};

exports.default = ToolBar;
//# sourceMappingURL=Toolbar.js.map