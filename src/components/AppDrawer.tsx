import React from 'react';
import {
  ListItem,
  ListItemText,
  List,
  CardMedia,
  ListItemIcon,
  Divider
} from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
interface IAppDrawerProps extends RouteComponentProps {
  closeDrawer: () => void;
}

const _AppDrawer: React.FC<IAppDrawerProps> = ({
  history,
  closeDrawer
}: IAppDrawerProps) => {
  const onClickItem = (route: string) => () => {
    history.push(route);
    closeDrawer();
  };
  return (
    <div
      role="presentation"
      style={{
        width: 200,
        height: '100%'
      }}
      className="onTheme"
    >
      <CardMedia
        component="img"
        height={100}
        style={{
          objectFit: 'contain',
          marginTop: 10,
          marginBottom: 20
        }}
        image={require('../assets/images/Logo.png')}
      />
      <Divider />
      <List>
        <ListItem button onClick={onClickItem('/places')}>
          <ListItemIcon>
            <MapIcon />
          </ListItemIcon>
          <ListItemText primary="Places" />
        </ListItem>
        <ListItem button onClick={onClickItem('/')}>
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Maps" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Acount" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HelpOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <ListItemText primary="Log In" onClick={onClickItem('/sign')} />
        </ListItem>
      </List>
    </div>
  );
};

export const AppDrawer = withRouter(_AppDrawer);
