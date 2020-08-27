import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Tracks = ({ tracks, artistData, audioFeatures }) => {
  return (
    <div>
      <div>
        {tracks.map((track, index) => (
          <Accordion 
          key={`artist${index}`} 
          variant='outlined'
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='track-header'
            >
              <Typography>{track.name} – <i>{track.artists[0].name}</i></Typography>
            </AccordionSummary>

            {artistData && (
              <AccordionDetails>
                <Typography variant='body2'>
                  <li><b>Genres:</b> {artistData[index].data.genres.join(', ')}</li>   
                </Typography>
              </AccordionDetails>
            )}
                     
            {audioFeatures && (
              <AccordionDetails>
                <Typography>
                  {Object.keys(audioFeatures[index]).map((feature, index) => (
                    <li className='feature' key={`feature${index}`}>
                      <b><i>{feature}:</i></b> {audioFeatures[index][feature]}
                    </li>
                  ))}
                </Typography>
              </AccordionDetails>
            )}
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Tracks;
