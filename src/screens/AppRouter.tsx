import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps
} from 'react-router-dom';
import { PlacesScreen } from './PlacesScreen';
import Home from './Home';
import App from '../App';
import MapsScreen from './MapsScreen';
import { connect } from 'react-redux';
import { getFilterList, getTravelMaps, setInnerSize } from '../stores/actions';
import { SignScreen } from './SignScreen';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../stores';

interface IRouterProps extends RouteProps {
  getFilterList: Function;
  getTravelMaps: Function;
  setInnerSize: Function;
}

const _AppRouter = (props: IRouterProps) => {
  const { setInnerSize, getTravelMaps } = props;

  useEffect(() => {
    getTravelMaps();
    window.addEventListener('resize', () => {
      setInnerSize({
        mainHeight: window.innerHeight,
        mainWidth: window.innerWidth
      });
    });
    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);
  return (
    <ConnectedRouter history={history}>
      <Route exact path="/sign" render={props => <SignScreen {...props} />} />
      <Switch>
        <Route
          exact
          path="/places"
          render={props => (
            <Home {...props}>
              <PlacesScreen {...props} />
            </Home>
          )}
        />
        <Route
          exact
          path="/"
          render={props => (
            <Home {...props}>
              <MapsScreen {...props} />
            </Home>
          )}
        />
      </Switch>
    </ConnectedRouter>
  );
};

export const AppRouter = connect(null, {
  setInnerSize,
  getFilterList,
  getTravelMaps
})(_AppRouter);
