import React, { PropTypes } from 'react'

import radium from 'Radium'

import icons from 'Icons'
import SvgIcon from 'SvgIcon'

const styles = {
  controlBar: {
    float: 'right',
  },
  list: {
    listStyle: 'none',
    float: 'left',
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
      border: '1px solid rgba(0, 0, 0, 0.1)',
    },
  },
  active: {
    backgroundColor: '#fafafa',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  },
}

function ControlBar({ mode, active, onActiveChange, fullscreen, onFullScreenChange }) {
  return (
    <div style={styles.controlBar}>
      <ul style={styles.list}>
        {
          mode === 'tab' ?
            <li
              key="code"
              style={[styles.listItem, active === 'code' ? styles.active : null]}
              onClick={() => onActiveChange('code')}
            >
              <a style={styles.listItemA}>{'Markdown'}</a>
            </li> : null
        }
        {
          mode === 'tab' ?
            <li
              key="preview"
              style={[styles.listItem, active === 'preview' ? styles.active : null]}
              onClick={() => onActiveChange('preview')}
            >
              <span style={styles.listItemA}>{'Preview'}</span>
            </li> : null
        }
        <li
          key="fullscreen"
          style={styles.listItem}
          onClick={onFullScreenChange}
        >
          <SvgIcon {...(fullscreen ? icons.minify : icons.expand)} />
        </li>
      </ul>
    </div>
  )
}
ControlBar.propTypes = {
  mode: PropTypes.oneOf(['tab', 'split']).isRequired,
  active: PropTypes.string.isRequired,
  onActiveChange: PropTypes.func.isRequired,
  fullscreen: PropTypes.bool.isRequired,
  onFullScreenChange: PropTypes.func.isRequired,
}
export default radium(ControlBar)
