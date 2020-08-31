import React from 'react'
import SelectTimeRange from './SelectTimeRange';
import SelectLimit from './SelectLimit'

const SelectOptions = ({timeRange, setTimeRange, limit, setLimit, setAudioFeatures}) => {
  return (
    <div>
      <br />
      <p>
        Just a quick note that longer timeframes are going to be closer to what you actually listen to.
        <br/>
        Also sometimes you may have to lower the limit to see results.
      </p>
      <br/>

      <SelectTimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
      <SelectLimit limit={limit} setLimit={setLimit} setAudioFeatures={setAudioFeatures}/>
    </div>
  )
}

export default SelectOptions
