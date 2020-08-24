import React from 'react';

const Tracks = ({ tracks }) => {
  return (
    <div>
      <ul>
        {tracks.map((track, index) => (
          <li className='track item' key={`track${index}`}>
            {track.track.name} – <i>{track.track.artists[0].name}</i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tracks;
