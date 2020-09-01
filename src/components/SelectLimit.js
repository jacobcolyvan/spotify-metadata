import React from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const limit_values = [5,10,20,50,99]


const SelectLimit = ({limit, setLimit, setAudioFeatures}) => {
  const handleLimitChange = (event) => {
    // {setTracks && setTracks(undefined)}
    setAudioFeatures && (setAudioFeatures(undefined))
    setLimit(event.target.value)
    
  }

  return (
    <div>
      <Select
        labelId='Select how many items you want to see!'
        id='limit-select'
        value={limit}
        onChange={handleLimitChange}
        fullWidth
        variant='outlined'
      >
        {limit_values.map(( value, index) => (
          <MenuItem key={`limit${index}`} value={value}>{`Show ${value} items`}</MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default SelectLimit