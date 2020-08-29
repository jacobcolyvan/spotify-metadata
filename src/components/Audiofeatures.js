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
        
        return response.data.audio_features
      } catch (err) {
        console.log(err.message);
      }
    }

    const sumAudioFeatures = async () => {  
      let features = await getAudioFeatures()

      let featureAverages = Object.assign({}, features[0])
      for (let i = 1; i < features.length; i++) {
        Object.keys(featureAverages).forEach((feature) => {
          if (features[i]) {
            if (!isNaN(featureAverages[feature])) {
              featureAverages[feature] = featureAverages[feature] + features[i][feature];
            } else {
              delete featureAverages[feature];
              features.forEach((track_features) => {
                delete track_features[feature] 
              })
            }
          }
        });
      }
    
      Object.keys(featureAverages).forEach((a) => {
        featureAverages[a] = Number(
          (featureAverages[a] / features.length).toFixed(2)
        );
      });
      
      setAudioFeatures(features);
      setAverageAudioFeatures(featureAverages)
    }

    sumAudioFeatures()
  }, [token, trackIds, setAudioFeatures])


  return (
    <div className="audio-features-container">
      <hr />
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
