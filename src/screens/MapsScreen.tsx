import React, { useState, useEffect, useRef } from 'react';
import MapView from '../components/Maps/MapView';
import {
  Fab,
  Paper,
  IconButton,
  InputBase,
  Divider,
  Box,
  Typography,
  Card,
  CardContent
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Recommendation from '../components/Recommendation';
import BottomeSlideUp from '../poses/BotomeSlideUp';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import {
  setCurrentShowingPlace,
  searchLocation,
  setSearchResult,
  setCurrentUserLocation,
  setIsEmptyResult,
  setCheckInPlace
} from '../stores/actions';
import { StoreState } from '../stores/reducers';
import { RouteComponentProps } from 'react-router-dom';
import { Marker } from '../components/Marker';
import { IFilterContent, ICoord } from '../stores/types';
import { DetailModal } from '../components/Maps/DetailModal';
import SearchIcon from '@material-ui/icons/Search';
import { SearchBackground } from '../poses/SearchBackgroud';
import { ResultCard } from '../components/Places/ResultCard';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { caoLanhLandmarks } from '../contraints/caoLanhLandmarks';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      zIndex: 13,
      overflow: 'hidden',
      position: 'absolute',
      top: 70,
      backgroundColor: '#ffffffb8',
      maxWidth: window.innerWidth > 400 ? 400 : window.innerWidth * 0.9

      // borderRadius: 20,
    },
    input: {
      width: window.innerWidth > 400 ? 300 : 'auto',
      // maxWidth: window.innerWidth > 400 ? 250 : window.innerWidth * 0.8,
      height: 40,
      marginLeft: 20
    },
    formControl: {
      marginLeft: 'auto',
      padding: 0
    },
    searchContainer: {
      display: 'flex'
    }
  })
);

interface IMapsScreenProps {
  setCurrentShowingPlace: Function;
  searchLocation: Function;
  setSearchResult: Function;
  setCurrentUserLocation: Function;
  setIsEmptyResult: Function;
  setCheckInPlace: Function;
}

interface StateProps extends StoreState {}

const Home = (props: StateProps & IMapsScreenProps & RouteComponentProps) => {
  const classes = useStyles();
  const [showRecomendation, setShowRecomendation] = useState<boolean>(false);
  const [currentMarkerImg, setCurrentMarkerImg] = useState<string>('');
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [inputFieldFocus, setInputFieldFocus] = useState<boolean>(false);
  const [currentLocation, setcurrentLocation] = useState<ICoord>({
    lat: 0,
    lng: 0
  });

  const {
    placesReducer: {
      filterList,
      placesInFilter,
      currentFilter,
      currentShowingPlace,
      searchResult,
      isEmptyResult
    },
    mapsReducer: { currentCenterPoint, allMaps, currentMapId, userLocation },
    settingReducer: { mainHeight, mainWidth },
    setCurrentShowingPlace,
    searchLocation,
    setSearchResult,
    setCurrentUserLocation,
    setIsEmptyResult,
    setCheckInPlace
  } = props;

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (filterList.length > 0) setShowRecomendation(true);
  }, [filterList]);

  useEffect(() => {
    if (currentFilter !== '') {
      const theFilter = filterList.filter(
        e => e.travel_id === currentFilter
      )[0];
      setCurrentMarkerImg(theFilter.pin);
    }
  }, [currentFilter]);

  const renderMarkers = (): any => {
    return placesInFilter[currentFilter].map((place: IFilterContent) => {
      const { location_name: name, longitude, latitude, id } = place;
      return (
        <Marker
          onClick={() => {
            setCurrentShowingPlace(place);
            setShowDetail(true);
          }}
          key={id}
          lat={latitude}
          lng={longitude}
          name={name}
          img={currentMarkerImg}
        />
      );
    });
  };
  const onSearch = () =>
    searchLocation(currentMapId === 0 ? 1 : currentMapId, searchInput);

  const getCurrentLocation = async () => {
    navigator?.geolocation?.getCurrentPosition(pos => {
      const { longitude: lng, latitude: lat } = pos.coords;
      setCurrentUserLocation({ lat, lng });
      setcurrentLocation({ lat, lng });
    });
  };
  return (
    <React.Fragment>
      <MapView mainHeight={mainHeight}>
        {placesInFilter[currentFilter] && renderMarkers()}
        {JSON.stringify(userLocation) && (
          <img
            //@ts-ignore
            lat={currentLocation.lat}
            lng={currentLocation.lng}
            style={{ width: 40, height: 40, objectFit: 'contain' }}
            alt="current Location"
            src={require('../assets/images/icons/currentLocation.png')}
          />
        )}
        {caoLanhLandmarks.map((place, index) => (
          <img
            //@ts-ignore
            lat={place.latitude}
            lng={place.longitude}
            key={index.toString()}
            style={{ width: 60, height: 60, objectFit: 'contain' }}
            alt={place.location_name}
            src={place.marker}
            onClick={() => {
              setCurrentShowingPlace(place);
              setShowDetail(true);
            }}
          />
        ))}
      </MapView>
      <div
        className="mainDiv"
        style={{
          position: 'relative',
          width: mainWidth,
          height: mainHeight,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <SearchBackground
          className="thisissearch"
          pose={inputFieldFocus ? 'onFocus' : 'onBlur'}
          bg={inputFieldFocus ? 255 : 100}
          style={{
            top: 0,
            bottom: 0,
            width: '100%',
            position: 'absolute',
            zIndex: 11,
            transformOrigin: '50% 50%',
            background: '#b05700d1'
          }}
          onClick={() => {
            setInputFieldFocus(false);
            setSearchResult([]);
            setSearchInput('');
          }}
        />
        <Paper className={classes.paper}>
          <Box className={classes.searchContainer} component="div">
            <InputBase
              className={classes.input}
              style={{
                flex: 1
              }}
              onKeyDown={key => key.keyCode === 13 && onSearch()}
              value={searchInput}
              onChange={evt => {
                setSearchInput(evt.target.value);
                setIsEmptyResult();
              }}
              type="text"
              placeholder="Search here..."
              onFocus={() => {
                setInputFieldFocus(true);
                setIsEmptyResult();
              }}
              onBlur={() => {}}
            />
            <IconButton style={{ marginLeft: 'auto' }} onClick={onSearch}>
              <SearchIcon />
            </IconButton>
          </Box>
          <Divider />
          {isEmptyResult && (
            <Card>
              <CardContent>
                <Typography align="center" variant="h6">
                  Nothing Found
                </Typography>
              </CardContent>
            </Card>
          )}
          <div
            style={{
              overflow: 'scroll',
              height: searchResult.length !== 0 ? window.innerHeight * 0.6 : 0,
              maxWidth: window.innerWidth > 400 ? 400 : window.innerWidth * 0.9
            }}
          >
            {searchResult.map(place => (
              <ResultCard
                setCurrentShowingPlace={() => {
                  setCurrentShowingPlace(place);
                  setShowDetail(true);
                }}
                key={place.id}
                place={place}
              />
            ))}
          </div>
        </Paper>
        <BottomeSlideUp
          num={showRecomendation ? 190 : 210}
          pose={!showRecomendation ? 'hide' : 'show'}
          style={{
            borderRadius: '50%',
            position: 'absolute',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Fab
            color="primary"
            onClick={(): void => {
              showRecomendation
                ? setShowRecomendation(false)
                : setShowRecomendation(true);
            }}
          >
            {!showRecomendation ? (
              <KeyboardArrowUpIcon fontSize="large" />
            ) : (
              <KeyboardArrowDownIcon fontSize="large" />
            )}
          </Fab>
        </BottomeSlideUp>

        <IconButton
          style={{
            position: 'absolute',
            zIndex: 999,
            right: 10,
            bottom: 150,
            background: '#b0570078',
            padding: 5
          }}
          onClick={getCurrentLocation}
        >
          <MyLocationIcon
            style={{
              fontSize: 30
            }}
            color="primary"
          />
        </IconButton>
        <Recommendation
          onCloseSelf={setShowRecomendation}
          show={showRecomendation}
        />
      </div>
      <DetailModal
        setCheckInPlace={() =>
          setCheckInPlace({
            lat: currentShowingPlace.latitude,
            lng: currentShowingPlace.longitude
          })
        }
        mainHeight={mainHeight}
        onClose={() => setShowDetail(false)}
        show={showDetail}
        place={currentShowingPlace}
        image={
          allMaps.filter(map => map.id === currentMapId)[0]?.icon ||
          require('../assets/images/Logo.png')
        }
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: StoreState): StateProps => state;

export default connect(mapStateToProps, {
  setCurrentShowingPlace,
  searchLocation,
  setSearchResult,
  setCurrentUserLocation,
  setIsEmptyResult,
  setCheckInPlace
})(Home);
