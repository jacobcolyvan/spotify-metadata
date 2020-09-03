import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';

import Playlist from './Playlist';
import PageButtons from '../components/PageButtons'


const Playlists = () => {
  const history = useHistory();
  const { token, playlist, setPlaylist } = useContext(UserContext);
  const [playlists, setPlaylists] = useState(undefined);
  
  const [playlistTotalAmount, setPlaylistTotalAmount] = useState(undefined)
  const [playlistSearchOffset, setPlaylistSearchOffset] = useState(0)


  // const [playlistPage, setPlaylistPage] = useState(1)


  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `https://api.spotify.com/v1/me/playlists?limit=50&offset=${playlistSearchOffset}`,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        });

        console.log(response.data.total);
        console.log(response.data.items)
        setPlaylistTotalAmount(response.data.total)
        // console.log(response.data.items[0].images[2].url);
        setPlaylists(response.data.items);
      } catch (err) {
        console.log(err.message);
      }
    };

    if (!token) {
      history.push('/');
    } else {
      getPlaylists();
    }
  }, [history, token, playlistSearchOffset]);

  const loadPlaylistComponent = (index) => {
    setPlaylist(playlists[index]);
    history.push(`/playlists/${index}`)
  };



  if (playlist) {
    return (
      <div>
        <Playlist playlist={playlist} />
      </div>
    );
  } else {
    return (
      <div>
        <br/><br/>
        <p>Here is a list of your playlists, click on one to check out its data.</p>
        <hr/>

        {playlists && (
          <ul>
            {playlists.map((playlist, index) => (
              <li
                className='playlist item'
                key={`track${index}`}
                onClick={() => loadPlaylistComponent(index)}
              >
                <div className='single-playlist-div'>
                  <div>{playlist.name}</div>
                  {playlist.images[0] && <img src={playlist.images[0].url} alt={`playlist img`} width="60" height="60" />}
                </div>
              </li>
            ))}
          </ul>
        )}

        {playlistTotalAmount && (
          <PageButtons 
            playlistTotalAmount={playlistTotalAmount}
            offset={playlistSearchOffset}
            setOffset={setPlaylistSearchOffset}
          />
        )}
      </div>
    );
  }
};

export default Playlists;
