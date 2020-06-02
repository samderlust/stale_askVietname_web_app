/*global google*/
import React, { useEffect, useState, ReactChild, ReactFragment } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import { StoreState } from '../../stores/reducers';
import { themeType, ICoord } from '../../stores/types';
import { darkMap, retroMap } from '../../contraints/mapStyles';
import {
  setCurrentShowingPlace,
  setDirectionError,
  setShowRequiredLoginModal,
} from '../../stores/actions';

interface IMapViewProps {
  children: ReactChild | ReactFragment;
  mainHeight: number;
  setDirectionError: Function;
  setShowRequiredLoginModal: Function;
}
interface StateProps extends StoreState {}

const MapView = (props: IMapViewProps & StoreState) => {
  const {
    mapsReducer: {
      currentCenterPoint,
      checkInPlace,
      userLocation,
      currentMapId,
    },
    placesReducer: { currentFilter },
    settingReducer: { theme },
    authReducer: { isSignedIn },
    mainHeight,
  } = props;

  const [mapStyle, setMapStyle] = useState(darkMap);
  const [googleMaps, setGoogleMaps] = useState();
  const [googleMap, setGoogleMap] = useState();
  const [directionsService, setDirectionsService] = useState();
  const [directionsRender, setDirectionsRender] = useState();

  useEffect(() => {
    if (theme === themeType.light) setMapStyle(retroMap);
    else setMapStyle(darkMap);
    return () => {};
  }, [theme]);

  //clear current direction on map if user select new filter or travel map
  useEffect(() => {
    if (directionsRender) {
      directionsRender.setMap(null);
    }
  }, [currentFilter, currentMapId]);

  useEffect(() => {
    renderRouteDirection(checkInPlace);
    return () => {};
  }, [checkInPlace]);

  useEffect(() => {
    if (googleMaps && googleMap) {
      setDirectionsRender(new googleMaps.DirectionsRenderer());
      setDirectionsService(new googleMaps.DirectionsService());
    }
    return () => {};
  }, [googleMap, googleMaps]);

  const renderRouteDirection = (destination: ICoord) => {
    if (googleMaps && googleMap) {
      if (directionsRender) {
        console.log(`directionRender is there`);
        directionsRender.setMap(null);
        directionsRender.setMap(googleMap);
      }

      directionsService.route(
        {
          origin: userLocation,
          destination,
          travelMode: googleMaps.TravelMode.WALKING,
        },
        (result: any, status: any) => {
          switch (status) {
            case googleMaps.DirectionsStatus.OK:
              setDirectionError('');
              if (!isSignedIn) {
                return props.setShowRequiredLoginModal(true);
              }
              directionsRender.setDirections(result);
              break;
            case googleMaps.DirectionsStatus.ZERO_RESULTS:
              setDirectionError(
                'No route can be found between your location and this place'
              );
              break;
            default:
              console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  };

  const onGoogleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    // console.log(map);
    // console.log(maps);
    setGoogleMap(map);
    setGoogleMaps(maps);
  };

  return (
    <div
      style={{
        width: '100%',
        height: mainHeight,
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
      }}
    >
      <GoogleMapReact
        options={{
          styles: mapStyle,
          fullscreenControl: false,
          gestureHandling: 'greedy',
        }}
        onGoogleApiLoaded={onGoogleApiLoaded}
        yesIWantToUseGoogleMapApiInternals={true}
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
        defaultCenter={{ lat: 10.771344, lng: 106.693126 }}
        center={currentCenterPoint}
        defaultZoom={15}
      >
        {props.children}
      </GoogleMapReact>
    </div>
  );
};
const mapStateToProps = (state: StoreState): StateProps => state;
export default connect(mapStateToProps, {
  setCurrentShowingPlace,
  setDirectionError,
  setShowRequiredLoginModal,
})(MapView);
