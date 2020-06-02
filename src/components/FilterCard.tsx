import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import { IFilter } from '../stores/types/index';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface IFilterCardProps {
  place: IFilter;
  selectedFilter: number;
  setSelectedFilter: Function;
  getPlacesInFilter: Function;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      minWidth: 150,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      borderColor: 'black',
      borderWidth: 1,
      borderStyle: 'solid',
      margin: 5
    },
    cardOnSelected: {
      borderColor: 'red'
    },
    cardMedia: {
      minHeight: 50,
      height: 70,
      marginTop: 10,
      backgroundSize: 'contain'
    }
  })
);
const FilterCard = ({
  place,
  selectedFilter,
  setSelectedFilter,
  getPlacesInFilter
}: IFilterCardProps) => {
  const classes = useStyles();

  return (
    <Card
      onClick={() => {
        setSelectedFilter(place.id);
        getPlacesInFilter(place.travel_id);
      }}
      className={classes.card}
      style={{
        borderColor: selectedFilter === place.id ? 'red' : 'black'
      }}
      key={place.id}
    >
      <CardMedia
        className={classes.cardMedia}
        image={
          place.travel_id === 'cl_tet_checkin'
            ? require('../assets/images/tetFilter.png')
            : place.icon
        }
      />
      <CardContent>
        <Typography variant="h6" align="center">
          {place.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FilterCard;
