import React from 'react';
import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  Button,
  CardActionArea
} from '@material-ui/core';
import { ITraveMap } from '../../stores/types';
import { connect } from 'react-redux';
import { getFilterList, setCurrentMapId } from '../../stores/actions';

interface IPlaceCardProps {
  map: ITraveMap;
  getFilterList: Function;
  setCurrentMapId: Function;
  history?: any;
  closePlacesDrawer?: () => void;
}
const _PlaceCard = ({
  map,
  getFilterList,
  setCurrentMapId,
  history,
  closePlacesDrawer
}: IPlaceCardProps) => {
  return (
    <Card
      style={{
        marginBottom: 10,
        maxWidth: 600,
        width: '80%',
        border: '4px solid hsla(0, 0%, 50%, 0.41)',
        flex: 1,
        minHeight: 'fit-content'
      }}
    >
      <CardActionArea>
        <CardMedia
          style={{
            objectFit: 'cover'
          }}
          component="img"
          alt={map.name}
          height={200}
          image={map.icon}
          title={map.name}
        />
        <CardContent>
          <Typography variant="h4">{map.name}</Typography>
        </CardContent>
      </CardActionArea>
      <Button
        onClick={() => {
          setCurrentMapId({
            id: map.id,
            coord: {
              lat: Number(map.latitude),
              lng: Number(map.longitude)
            }
          });
          getFilterList(map.id);
          closePlacesDrawer && closePlacesDrawer();
          history?.push('/');
        }}
        color="primary"
        fullWidth
        variant="contained"
        size="medium"
      >
        Go
      </Button>
    </Card>
  );
};

export const PlaceCard = connect(null, { getFilterList, setCurrentMapId })(
  _PlaceCard
);
