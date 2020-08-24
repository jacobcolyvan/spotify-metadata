import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import axios from 'axios';

const ArtistGenres = ({ artistHREFs, setArtistData }) => {
  const { token } = useContext(UserContext);
  const [averageGenres, setAverageGenres] = useState(undefined);

  useEffect(() => {
    const sortGenreHash = (hash) => {
      let sortedHash = Object.keys(hash).sort().reverse();
      sortedHash
        .sort((a, b) => {
          return hash[a] - hash[b];
        })
        .reverse();

      // console.log(sortedHash);
      setAverageGenres(sortedHash.slice(0, 10));
    };

    const sumGenreData = (dataArray) => {
      let genreHash = {};
      dataArray.forEach((artist) => {
        artist.data.genres.forEach((genre) => {
          if (genreHash[genre]) {
            genreHash[genre]++;
          } else {
            genreHash[genre] = 1;
          }
        });
      });

      sortGenreHash(genreHash);
    };

    const getArtistData = () => {
      try {
        let responseArray = [];
        artistHREFs.forEach(async (HREF) => {
          const response = axios({
            method: 'get',
            url: HREF,
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json'
            }
          });

          responseArray.push(response);
        });

        Promise.all(responseArray).then((data) => {
          // console.log(data);
          setArtistData(data);
          sumGenreData(data);
        });
      } catch (err) {
        console.log(err.message);
      }
    };

    getArtistData();
  }, [token, artistHREFs, setArtistData]);

  return (
    <div>
      <p>The top 10 genres from this playlist are listed below (sorted by frequency).</p>
      {averageGenres && (
        <ul>
          {averageGenres.map((genre, index) => (
            <li className='genre average' key={`genre${index}`}>
              <i>{genre}</i>
            </li>
          ))}
        </ul>
      )}
      <br/><hr />
    </div>
  );
};

export default ArtistGenres;
