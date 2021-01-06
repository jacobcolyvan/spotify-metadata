import React from 'react';
import styled from 'styled-components';

const Hamburger = styled.p`
  margin-top: 12px;
`

const Info = () => {
  return (
    <div>
      <p id='wesbite-feature-p'>This is a website to:</p>
      <ul className='website-feature-list'>
        <li>Check out your Spotify listening habits. </li>
        <li>See genres, popularity and track features for the music you listen to.</li>
        <li>Exploring your top-tracks, top-artists, and playlists.</li>
      </ul>

      <Hamburger>Use the hamburger menu in the top right to navigate through the site (once authorised).</Hamburger>
    </div>
  )
};

export default Info;
