import React from 'react'
import ReactDOM from 'react-dom'

import MDEditor from 'MDEditor'

const styles = {
  stage: {
    maxWidth: '980px',
    margin: ' 60px auto',
    padding: '0 1em',
  },
}

ReactDOM.render((
  <div style={styles.stage}>
    <MDEditor key={'split'} />
    <div style={{ height: '30px' }} />
    <MDEditor key={'tab'} mode={'tab'} />
  </div>
),
document.getElementById('stage')
)
