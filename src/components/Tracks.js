import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Tracks = ({ tracks, artistData, audioFeatures }) => {
  return (
    <div>
      <ul>
        {tracks &&
          artistData &&
          audioFeatures &&
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

            {(artistData[index].data.genres.length > 0) && (
              <AccordionDetails style={{ padding: '0 16px' }}>
                <Typography component={'span'} variant='body2'>
                  <div className='accordion-div'>
                    <li className='accordion-li li'>Genres:</li>
                    <li className='accordion-li2 li'>{artistData[index].data.genres.join(', ')}.</li>
                  </div>
                </Typography>
              </AccordionDetails>
            )}

              <AccordionDetails style={{ padding: '0 16px' }}>
                <Typography component={'span'} variant='body2'>
                  <div className='accordion-div'>
                    <li className='accordion-li li'>Artist Popularity Rating:</li>
                    <li className='accordion-li2 li'>{artistData[index].data.popularity}.</li>
                  </div>
                </Typography>
              </AccordionDetails>

              <AccordionDetails style={{ padding: '12px 8px 16px 16px' }}>
                <ul>
                  {Object.keys(audioFeatures[index]).map(
                    (feature, index2) =>
                      audioFeatures[index] && (
                        <li
                          className='feature average li'
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
            </Accordion>
          ))}
      </ul>
    </div>
  );
};

export default Tracks;
