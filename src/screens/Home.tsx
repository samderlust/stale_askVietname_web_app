import React, { ReactNode, useState, useEffect } from 'react';
import Appbar from '../components/Appbar';
import { Container, CssBaseline, Drawer } from '@material-ui/core';
import { connect } from 'react-redux';
import { StoreState } from '../stores/reducers';
import { themeType } from '../stores/types';
import { AppDrawer } from '../components/AppDrawer';
import { Global, css, jsx } from '@emotion/core';
import { RouteComponentProps } from 'react-router-dom';

import { PlacesDrawer } from '../components/PlacesDrawer';
import {
  setShowPlacesDrawer,
  setShowRequiredLoginModal
} from '../stores/actions';
import { LogedInRequireModal } from '../components/LogedInRequireModal';

interface IHomeProps extends RouteComponentProps {
  children: ReactNode | React.ComponentType<any>;
  setShowPlacesDrawer: Function;
  setShowRequiredLoginModal: Function;
}
interface StateProps extends StoreState {}

const Home: React.FC<StateProps & IHomeProps> = props => {
  const {
    settingReducer: { theme, showPlacesDrawer },
    mapsReducer: { allMaps },
    authReducer: { requiredLogInModal },
    setShowPlacesDrawer
  } = props;

  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const closePlacesDrawer = () => setShowPlacesDrawer(false);
  const closeDrawer = () => setShowDrawer(false);

  return (
    <React.Fragment>
      <Global
        styles={css`
          .onTheme {
            background: ${theme === themeType.light
              ? '#fff'
              : 'rgb(55, 55, 55)'};
            color: ${theme === themeType.light ? 'black' : 'white'};
          }
        `}
      />
      <CssBaseline />
      <Container
        style={{ maxWidth: '100%' }}
        className="onTheme"
        fixed={false}
        disableGutters={true}
      >
        <Appbar
          setShowPlacesDrawer={() => setShowPlacesDrawer(!showPlacesDrawer)}
          setShowDrawer={() => setShowDrawer(!showDrawer)}
        />
        {props.children}
      </Container>
      <Drawer open={showDrawer} onClose={closeDrawer}>
        <AppDrawer closeDrawer={closeDrawer} />
      </Drawer>
      <Drawer
        anchor="right"
        open={showPlacesDrawer}
        onClose={closePlacesDrawer}
      >
        <PlacesDrawer closePlacesDrawer={closePlacesDrawer} allMaps={allMaps} />
      </Drawer>
      <LogedInRequireModal
        onClose={() => props.setShowRequiredLoginModal(false)}
        show={requiredLogInModal}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: StoreState) => state;

export default connect(mapStateToProps, {
  setShowPlacesDrawer,
  setShowRequiredLoginModal
})(Home);
