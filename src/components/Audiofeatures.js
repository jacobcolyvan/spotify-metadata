import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../context/UserContext'
import axios from 'axios'


const Audiofeatures = ({trackIds, setAudioFeatures}) => {
  const [averageAudioFeatures, setAverageAudioFeatures] = useState(undefined)
  const { token } = useContext(UserContext);

  useEffect(() => {
    const getAudioFeatures = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `https://api.spotify.com/v1/audio-features/?ids=${trackIds.join(',')}`,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        });
  
        // console.log(response.data.audio_features);
        setAudioFeatures(response.data.audio_features);
        return response.data.audio_features
      } catch (err) {
        console.log(err.message);
      }
    }

    const sumAudioFeatures = async () => {   
      const features = await getAudioFeatures()
      // console.log(features); 

      let featureAverages = features[0];
      for (let i = 1; i < features.length; i++) {
        Object.keys(featureAverages).forEach((a) => {
          if (features[i]) {
            if (!isNaN(featureAverages[a])) {
              featureAverages[a] = featureAverages[a] + features[i][a];
            } else {
              delete featureAverages[a];
            }
          }
        });
      }
    
      Object.keys(featureAverages).forEach((a) => {
        featureAverages[a] = Number(
          (featureAverages[a] / features.length).toFixed(2)
        );
      });
      
      // console.log(featureAverages);
      setAverageAudioFeatures(featureAverages)
    }

    sumAudioFeatures()
  }, [token, trackIds])


  return (
    <div className="audio-features-container">
      <br/><hr />
      <p>The Average audio features of the tracks are listed below. For information about a specific feature visit <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/" target="_blank" rel="noopener noreferrer">Spotify</a>.</p>

      {averageAudioFeatures && (
        <ul>
          {Object.keys(averageAudioFeatures).map((feature, index) => (
            <li className='feature average' key={`feature${index}`}>
              <b><i>{feature}:</i></b> {averageAudioFeatures[feature]}
            </li>
          ))}
        </ul>
      )}
      <br/><hr />
    </div>
  )
}

export default Audiofeatures
