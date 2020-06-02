import React from 'react';
import {
  Card,
  Typography,
  CardContent,
  Box,
  CardActionArea,
  CardHeader,
  Avatar
} from '@material-ui/core';
import { IFilterContent } from '../../stores/types';
import PlaceIcon from '@material-ui/icons/Place';
import { createStyles, makeStyles } from '@material-ui/core/styles';

interface IResultCardProps {
  place: IFilterContent;
  setCurrentShowingPlace(): void;
}

const useStyle = makeStyles(() =>
  createStyles({
    avatar: {
      '& > img': {
        objectFit: 'contain'
      }
    }
  })
);

export const ResultCard: React.FC<IResultCardProps> = ({
  place,
  setCurrentShowingPlace
}) => {
  const classes = useStyle();
  return (
    <Card style={{ borderRadius: 0, maxWidth: 'inherit' }}>
      <CardActionArea onClick={setCurrentShowingPlace}>
        <CardHeader
          avatar={
            <Avatar
              className={classes.avatar}
              sizes="large"
              style={{ objectFit: 'cover' }}
              alt={place.location_name}
              src={place.filter_images?.pin}
            />
          }
          title={place.location_name}
          subheader={`${place.description
            .replace(/(<([^>]+)>)/gi, '')
            .substring(0, 40)}...`}
        />
        {/* <CardContent>
          <Typography
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Box component="span"> {place.location_name}</Box>
            <Box component="span">
              <PlaceIcon />
            </Box>
          </Typography>
        </CardContent> */}
      </CardActionArea>
    </Card>
  );
};
