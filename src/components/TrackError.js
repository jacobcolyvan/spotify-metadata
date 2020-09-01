import React from 'react'

const TrackError = () => {
  return (
    <div className='error'>
      <br/>
      <p>TThere is not enough info to show with the current settings, try changing the time period, or limit.</p>
      <p>Note that longer periods, will normally have both more and more accurate data. And shorter limits are more likely to be shown. </p>
    </div>
  )
}

export default TrackError
