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
        {tracks.map((track, index) => (
          <Accordion 
          key={`artist${index}`} 
          variant='outlined'
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='track-header'
              style={{ flex: 1, margin: '0 20px 0 0' }}
            >
              <Typography>{track.track.name} – <i>{track.track.artists[0].name}</i></Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography variant='body2'>
                {artistData && <li><b>Genres:</b> {artistData[index].data.genres.join(', ')}.</li>}
                
              </Typography>
              </AccordionDetails>
              <AccordionDetails>
              <Typography>
              {audioFeatures && (
                  <>  
                    {Object.keys(audioFeatures[index]).map((feature, index) => (
                      <li className='feature' key={`feature${index}`}>
                        <b><i>{feature}:</i></b> {audioFeatures[index][feature]}
                      </li>
                    ))}
                  </>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </ul>
    </div>
  );
};

export default Tracks;
