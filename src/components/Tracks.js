import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Tracks = ({ tracks, artistData, audioFeatures }) => {
  console.log(artistData);
  console.log(audioFeatures);
  return (
    <div>
      <ul>
        {tracks &&
          tracks.map((track, index) => (
            <Accordion key={`artist${index}`} variant='outlined'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='track-header'
              >
                <Typography>
                  {track.name} – <i>{track.artists[0].name}</i>
                </Typography>
              </AccordionSummary>

              {artistData &&
                (artistData[index].data.genres.length > 0 && (
                  <AccordionDetails style={{ padding: '8px 16px 0 16px' }}>
                    <Typography variant='body2'>
                      <li>
                        <b>Genres:</b>{' '}
                        {artistData[index].data.genres.join(', ')}.
                      </li>
                    </Typography>
                  </AccordionDetails>
                ),
                (
                  <AccordionDetails>
                    <Typography variant='body2'>
                      <b>Artist Popularity Rating:</b>{' '}
                      {artistData[index].data.popularity}
                    </Typography>
                  </AccordionDetails>
                ))}

              {audioFeatures && (
                <AccordionDetails style={{ padding: '0 16px 16px 16px' }}>
                  <ul>
                    {Object.keys(audioFeatures[index]).map(
                      (feature, index2) =>
                        audioFeatures[index] && (
                          <li
                            className='feature average'
                            key={`feature${index2}`}
                          >
                            <b>
                              <i>{feature}:</i>
                            </b>{' '}
                            {audioFeatures[index][feature]}
                          </li>
                        )
                    )}
                  </ul>
                </AccordionDetails>
              )}
            </Accordion>
          ))}
      </ul>
    </div>
  );
};

export default Tracks;
