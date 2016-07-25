import React, { PropTypes } from 'react'

import _ from 'lodash'
import icons from './icons.json'
import SvgIcon from '../SvgIcon/SvgIcon'
import Item from './Item'

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
  },
  active: {
    backgroundColor: '#fafafa',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  },
  hover: {
    backgroundColor: '#fafafa',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  },
}

function ControlBar({ mode, active, onActiveChange, fullscreen, onFullScreenChange }) {
  const itemStyle = _.merge({}, styles.listItem)
  const activeItemStyle = _.merge({}, itemStyle, styles.active)
  return (
    <div style={styles.controlBar}>
      <ul style={styles.list}>
        {
          mode === 'tab' ?
            <Item
              key="code"
              style={active === 'code' ? activeItemStyle : itemStyle}
              onClick={() => onActiveChange('code')}
              hoverStyle={styles.hover}
            >
              <a style={styles.listItemA}>{'Markdown'}</a>
            </Item> : null
        }
        {
          mode === 'tab' ?
            <Item
              key="preview"
              style={active === 'preview' ? activeItemStyle : itemStyle}
              onClick={() => onActiveChange('preview')}
              hoverStyle={styles.hover}
            >
              <span style={styles.listItemA}>{'Preview'}</span>
            </Item> : null
        }
        <Item
          key="fullscreen"
          style={itemStyle}
          hoverStyle={styles.hover}
          onClick={onFullScreenChange}
        >
          <SvgIcon {...(fullscreen ? icons.minify : icons.expand)} />
        </Item>
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
export default ControlBar
