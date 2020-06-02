import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../stores/reducers';
import { IMapsReducer } from '../stores/types';
import { PlaceCard } from '../components/Places/PlaceCard';
import { getFilterList, setCurrentMapId } from '../stores/actions';
import { RouteChildrenProps } from 'react-router-dom';

export interface IPlacesScreenProps extends RouteChildrenProps {
  mapsReducer: IMapsReducer;
  getFilterList: Function;
  setCurrentMapId: Function;
}

const _PlacesScreen = (props: IPlacesScreenProps) => {
  const {
    mapsReducer: { allMaps },
    setCurrentMapId,
    history
  } = props;

  const renderTravelMaps = () =>
    allMaps.map(map => <PlaceCard key={map.id} map={map} history={history} />);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        paddingTop: 80,
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {renderTravelMaps()}
    </div>
  );
};

const mapStateToProps = ({ mapsReducer }: StoreState) => ({
  mapsReducer
});

export const PlacesScreen = connect(mapStateToProps, {
  getFilterList,
  setCurrentMapId
})(_PlacesScreen);
