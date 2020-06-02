import React, { useState, useEffect, ReactElement } from 'react';
import {
  Fab,
  Modal,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import { IFilterContent } from '../../stores/types';

interface IDetailModalProps {
  onClose(): void;
  show: boolean;
  place: IFilterContent;
  image: string;
  mainHeight: number;
  setCheckInPlace(): void;
}

export const DetailModal = ({
  onClose,
  show,
  place,
  image,
  mainHeight,
  setCheckInPlace
}: IDetailModalProps) => {
  const { innerHeight } = window;

  const [modalHeight, setModalHeight] = useState<number>(innerHeight * 0.9);

  useEffect(() => {
    setModalHeight(mainHeight * 0.9);
  }, [mainHeight]);
  return (
    <Modal
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClose={onClose}
      open={show}
    >
      <Card
        className="onTheme"
        style={{ maxWidth: 500, position: 'relative', maxHeight: modalHeight }}
      >
        <Fab
          onClick={onClose}
          style={{
            background: 'transparent',
            position: 'absolute',
            top: 0,
            right: 0
          }}
          size="small"
        >
          <CloseIcon style={{ color: 'white' }} />
        </Fab>
        <CardMedia
          component="img"
          // image="https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?crop=entropy&cs=srgb&dl=trees-during-day-3573351.jpg&fit=crop&fm=jpg&h=828&w=640"
          image={image}
          title={place.location_name}
          height={modalHeight * 0.4}
          style={{
            objectFit: 'cover'
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {place.location_name}
          </Typography>
          <Typography
            style={{
              maxHeight: modalHeight * 0.3,
              overflow: 'scroll'
            }}
            variant="body2"
            component="p"
          >
            {place.description?.replace(/(<([^>]+)>)/gi, '')}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={() =>
              window.open('https://survey.askvietnamese.vn/facebook', '_blank')
            }
          >
            Visit our page
          </Button>
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            onClick={() => {
              setCheckInPlace();
              onClose();
            }}
          >
            Direction
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};
