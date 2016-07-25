import React, { PropTypes } from 'react'

import _ from 'lodash'

class Item extends React.Component {
  state = {
    over: false,
  }
  onMouseOver = () => {
    this.setState({
      over: true,
    })
  }
  onMouseOut = () => {
    this.setState({
      over: false,
    })
  }
  render() {
    const { over } = this.state
    const { hoverStyle, style, children, ...other } = this.props
    const styles = _.merge({}, style)
    if (over) {
      _.merge(styles, hoverStyle)
    }
    return (
      <li {...other} style={styles}>
        {children}
      </li>
    )
  }
}
Item.defaultProps = {
  hoverStyle: {},
}
Item.propTypes = {
  hoverStyle: PropTypes.object,
}
export default Item
