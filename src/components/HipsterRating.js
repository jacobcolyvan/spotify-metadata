import React, {useState, useEffect} from 'react'

const HipsterRating = ({artists, time_range}) => {
  const [popularityAverage, setPopularityAverage] = useState(undefined)

  useEffect(() => {
    const hipsterRating = () => {
      let popularityRating = 0;
      artists.forEach((artist) => {
        popularityRating += artist.popularity;
      });
      popularityRating = 100 - (popularityRating / artists.length).toFixed(2);
      setPopularityAverage(popularityRating);
    }

    hipsterRating()
  }, [artists])

  return (
    <div>
      <p>The <i>HipsterRating</i> of your top artists ({time_range}) is: {popularityAverage}</p>
    </div>
  )
}

export default HipsterRating
