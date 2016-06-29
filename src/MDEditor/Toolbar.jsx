import React, { PropTypes } from 'react'

import icons from './icons.json'
import SvgIcon from 'SvgIcon'

import radium from 'Radium'

const styles = {
  toolBar: {
    float: 'left',
  },
  list: {
    listStyle: 'none',
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
    padding: '0 12px',
    ':hover': {
      backgroundColor: '#fafafa',
      color: '#444',
      border: '1px solid rgba(0, 0, 0, 0.1)',
    },
  },
}

const Icons = [
  'bold',
  'italic',
  'strike',
  'link',
  'image',
  'blockquote',
  'unorderedList',
  'orderedList',
]

const FORMATS = {
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
    placeholder: 'orderedList' },
}

const FORMAT_TOKENS = {}

Object.keys(FORMATS).forEach(key => {
  if (FORMATS[key].token) {
    if (FORMAT_TOKENS[FORMATS[key].token]) {
      FORMAT_TOKENS[FORMATS[key].token] += `,${key}`
    } else {
      FORMAT_TOKENS[FORMATS[key].token] = key
    }
  }
})


function getCursorState(cm, pos) {
  pos = pos || cm.getCursor('start')
  const cs = {}
  const token = cs.token = cm.getTokenAt(pos)
  if (!token.type) return cs
  const tokens = token.type.split(' ')
  tokens.forEach(t => {
    if (FORMAT_TOKENS[t]) {
      FORMAT_TOKENS[t].split(',').forEach(key => {
        cs[key] = true
      })
      return
    }
  })
  return cs
}

const operations = {
  inlineApply(cm, format) {
    const startPoint = cm.getCursor('start')
    const endPoint = cm.getCursor('end')

    cm.replaceSelection(format.before + cm.getSelection() + format.after)
    startPoint.ch += format.before.length
    endPoint.ch += format.before.length
    cm.setSelection(startPoint, endPoint)
    cm.focus()
  },
  inlineRemove(cm, format) {
    const startPoint = cm.getCursor('start')
    const endPoint = cm.getCursor('end')
    const line = cm.getLine(startPoint.line)

    let startPos = startPoint.ch
    while (startPos) {
      if (line.substr(startPos, format.before.length) === format.before) {
        break
      }
      startPos--
    }

    let endPos = endPoint.ch
    while (endPos <= line.length) {
      if (line.substr(endPos, format.after.length) === format.after) {
        break
      }
      endPos++
    }

    const start = line.slice(0, startPos)
    const mid = line.slice(startPos + format.before.length, endPos)
    const end = line.slice(endPos + format.after.length)
    cm.replaceRange(start + mid + end, { line: startPoint.line, ch: 0 },
      { line: startPoint.line, ch: line.length + 1 })
    cm.setSelection({ line: startPoint.line, ch: start.length },
      { line: startPoint.line, ch: (start + mid).length })
    cm.focus()
  },
  blockApply(cm, format) {
    const startPoint = cm.getCursor('start')
    const line = cm.getLine(startPoint.line)
    const text = `${format.before} ${line.length ? line : format.placeholder}`
    cm.replaceRange(text, { line: startPoint.line, ch: 0 },
      { line: startPoint.line, ch: line.length + 1 })
    cm.setSelection({ line: startPoint.line, ch: format.before.length + 1 },
      { line: startPoint.line, ch: text.length })
    cm.focus()
  },
  blockRemove(cm, format) {
    const startPoint = cm.getCursor('start')
    const line = cm.getLine(startPoint.line)
    const text = line.replace(format.re, '')
    cm.replaceRange(text, { line: startPoint.line, ch: 0 },
      { line: startPoint.line, ch: line.length + 1 })
    cm.setSelection({ line: startPoint.line, ch: 0 },
      { line: startPoint.line, ch: text.length })
    cm.focus()
  },
}

function applyFormat(getCM, key) {
  const cm = getCM()
  const cs = getCursorState(cm)
  const format = FORMATS[key]
  operations[format.type + (cs[key] ? 'Remove' : 'Apply')](cm, format)
}

function ToolBar({ getCM, hide }) {
  const toolBarStyles = [styles.toolBar]
  if (hide) {
    toolBarStyles.push({ display: 'none' })
  }
  return (
    <div style={toolBarStyles}>
      <ul style={styles.list}>
        {
          Icons.map((icon, i) =>
            <li key={i} style={styles.listItem} onClick={() => applyFormat(getCM, icon)}>
              <SvgIcon {...icons[icon]} />
            </li>
          )
        }
      </ul>
    </div>
  )
}

ToolBar.propTypes = {
  getCM: PropTypes.func,
  hide: PropTypes.bool,
}

export default radium(ToolBar)
