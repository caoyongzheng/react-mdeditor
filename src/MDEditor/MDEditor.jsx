import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown'

import 'github-markdown-css'
import marked from 'marked'
import _ from 'lodash'

import ToolBar from './Toolbar'
import ControlBar from './ControlBar'

const styles = {
  mkeditor: {
    position: 'relative',
    width: '100%',
  },
  navbar: {
    position: 'absolute',
    width: '100%',
    background: '#f5f5f5',
    border: '1px solid rgba(0,0,0,.06)',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    height: '40px',
    overflow: 'hidden',
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
    borderBottomRightRadius: '4px',
  },
  code: {
    height: '100%',
    overflowY: 'scroll',
  },
  preview: {
    padding: '20px',
    overflowY: 'scroll',
    position: 'relative',
  },
  hide: {
    display: 'none',
  },
  fullscreen: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 990,
    height: '100%',
  },
}

const splitStyles = {
  content: {
    display: 'flex',
  },
  code: {
    flex: 1,
    borderRight: '1px solid #ddd',
  },
  preview: {
    flex: 1,
  },
}

class MDEditor extends React.Component {
  state = {
    active: 'code',
    html: '',
    fullscreen: false,
  }
  componentDidMount() {
    this.codeMirror = CodeMirror.fromTextArea(ReactDOM.findDOMNode(this.refs.codemirror),
    this.props.codemirror)
    this.codeMirror.on('change', this.onChange)
    this.codeParent = ReactDOM.findDOMNode(this.refs.codeParent)
    this.resize()
  }
  componentDidUpdate(prevProps, prevState) {
    const { fullscreen, mode } = this.state
    if (prevState.fullscreen !== fullscreen || prevState.mode !== mode) {
      this.resize()
    }
  }
  onChange = () => {
    if (this.props.mode === 'split') {
      this.setState({
        html: marked(this.codeMirror.getValue()),
      })
    }
  }
  onActiveChange = (active) => {
    if (active === 'code') {
      this.setState({
        active: 'code',
      })
    } else if (active === 'preview') {
      this.setState({
        active: 'preview',
        html: marked(this.codeMirror.getValue()),
      })
    }
  }
  onFullScreenChange = () => {
    this.setState({
      fullscreen: !this.state.fullscreen,
    })
  }
  addImage = (imageUrl) => {
    const cm = this.codeMirror
    const startPoint = cm.getCursor('start')
    const endPoint = cm.getCursor('end')
    cm.replaceSelection(`${cm.getSelection()}![](${imageUrl})`)
    startPoint.ch = endPoint.ch
    endPoint.ch += imageUrl.length + 5
    cm.setSelection(startPoint, endPoint)
    cm.focus()
  }
  resize = () => {
    this.codeParent.lastChild.style.height = `${this.codeParent.offsetHeight}px`
  }
  render() {
    const { md, height, mode } = this.props
    const { active, html, fullscreen } = this.state

    const mkeditorStyles = _.merge(styles.mkeditor, { height: `${height}px` })
    if (fullscreen) {
      _.merge(mkeditorStyles, styles.fullscreen)
    }
    const contentStyles = _.merge({}, styles.content)
    const codeStyles = _.merge({}, styles.code)
    const previewStyles = _.merge({}, styles.preview)

    if (mode === 'tab') {
      if (active !== 'code') {
        _.merge(codeStyles, styles.hide)
      }
      if (active !== 'preview') {
        _.merge(previewStyles, styles.hide)
      }
    } else if (mode === 'split') {
      _.merge(contentStyles, splitStyles.content)
      _.merge(codeStyles, splitStyles.code)
      _.merge(previewStyles, splitStyles.preview)
    }
    return (
      <div style={mkeditorStyles}>
        <div style={styles.navbar}>
          <ToolBar getCM={() => this.codeMirror} />
          <ControlBar
            mode={mode}
            active={active}
            onActiveChange={this.onActiveChange}
            fullscreen={fullscreen}
            onFullScreenChange={this.onFullScreenChange}
          />
        </div>
        <div style={contentStyles}>
          <div ref="codeParent" style={codeStyles}>
            <textarea
              ref="codemirror"
              style={{ display: 'none' }}
              value={md}
            />
          </div>
          <div
            style={previewStyles}
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    )
  }
}

MDEditor.defaultProps = {
  md: '',
  height: 500,
  mode: 'split',
  codemirror: {
    mode: 'markdown',
    lineNumbers: false,
    indentWithTabs: true,
    lineWrapping: true,
    tabSize: '2',
  },
}
MDEditor.propTypes = {
  md: PropTypes.string,
  height: PropTypes.number,
  mode: PropTypes.oneOf(['tab', 'split']),
  codemirror: PropTypes.object,
}
export default MDEditor
