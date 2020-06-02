import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  FormControlLabel,
  IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { StoreState } from '../stores/reducers';
import { ISettingReducer, themeType } from '../stores/types';
import { toggleTheme } from '../stores/actions';
import MapIcon from '@material-ui/icons/Map';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 400
      }
    },
    input: {
      overflow: 'hidden',
      // borderRadius: 20,
      '& div': {
        backgroundColor: '#ffffffff',
        width: 400,
        height: 40,
        marginLeft: 20,
        borderRadius: 30
      },
      '& input:focused': {
        backgroundColor: 'red'
        // borderColor: 'white',
      }
    },
    formControl: {
      marginLeft: 'auto',
      padding: 0
    },
    appbar: {
      background: '#fff'
    }
  })
);

interface IAppbarProps {
  settingReducer: ISettingReducer;
  toggleTheme: () => {};
  setShowDrawer: () => void;
  setShowPlacesDrawer: () => void;
}

const Appbar: React.FC<IAppbarProps> = ({
  settingReducer,
  toggleTheme,
  setShowDrawer,
  setShowPlacesDrawer
}: IAppbarProps) => {
  const classes = useStyles();

  const { theme } = settingReducer;

  return (
    <React.Fragment>
      <AppBar className="onTheme" position="fixed">
        <Toolbar>
          <IconButton onClick={setShowDrawer}>
            <MenuIcon className="onTheme" />
          </IconButton>
          <Typography color="primary" variant="h5">
            AskVietnamese
          </Typography>
          <FormControlLabel
            className={classes.formControl}
            labelPlacement="start"
            label=""
            control={
              <Switch
                checked={theme === themeType.light}
                value={theme === themeType.dark}
                onChange={toggleTheme}
              />
            }
          />
          <IconButton onClick={setShowPlacesDrawer}>
            <MapIcon className="onTheme" />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* <TextField
        className={classes.input}
        variant="outlined"
        type="text"
        placeholder="Search here..."
      /> */}
    </React.Fragment>
  );
};

const mapStateToProps = ({ settingReducer }: StoreState) => ({
  settingReducer
});

export default connect(mapStateToProps, { toggleTheme })(Appbar);
