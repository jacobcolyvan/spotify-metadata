import React from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const SelectTimeRange = ({timeRange, setTimeRange}) => {
  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value)
  }

  return (
    <div>
      <Select
        labelId='Select a Time-Range'
        id='time-range-select'
        value={timeRange}
        onChange={handleTimeRangeChange}
        fullWidth
        variant='outlined'
      >
        <MenuItem value={'short_term'}>Short Term (last 4 weeks)</MenuItem>
        <MenuItem value={'medium_term'}>Medium Term (last 6 months)</MenuItem>
        <MenuItem value={'long_term'}>Long Term (all time)</MenuItem>
      </Select>
    </div>
  )
}

export default SelectTimeRange