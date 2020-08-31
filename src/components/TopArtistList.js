import React from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const TopArtistList = ({artists}) => {
  return (
    <div>
      {artists.map((artist, index) => (
        <Accordion key={`artist${index}`} variant='outlined'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
            style={{ flex: 1, margin: '0 20px 0 0' }}
          >
            <Typography>{artist.name}</Typography>
          </AccordionSummary>
          {artist.genres.length > 0 && (
            <AccordionDetails>
              <Typography variant='body2'>
                <b>Genres:</b> {artist.genres.join(', ')}.
              </Typography>
            </AccordionDetails>
          )}
          <AccordionDetails>
            <Typography variant='body2'>
              <b>Popularity Rating:</b> {artist.popularity}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default TopArtistList;
