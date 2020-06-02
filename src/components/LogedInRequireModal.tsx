import React from 'react';
import {
  Modal,
  Card,
  CardHeader,
  Typography,
  CardContent,
  CardActions,
  Button
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';

interface ILogedInRequireModalProps {
  onClose(): void;
  show: boolean;
}

const _LogedInRequireModal = (props: ILogedInRequireModalProps) => {
  const history = useHistory();
  return (
    <Modal
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClose={props.onClose}
      open={props.show}
    >
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5">
            Log in required
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            In order to use this feature you must log in first
          </Typography>
        </CardContent>

        <CardActions
          onClick={() => history.push('/sign')}
          style={{ justifyContent: 'flex-end' }}
        >
          <Button color="primary" variant="contained">
            Sign in
          </Button>
          <Button onClick={props.onClose} color="primary" variant="outlined">
            Cancel
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export const LogedInRequireModal = _LogedInRequireModal;
