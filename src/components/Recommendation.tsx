import React, { useEffect, useState, FC } from 'react';
import { connect } from 'react-redux';
import BottomeSlideUp from '../poses/BotomeSlideUp';
import {
  getFilterList,
  getPlacesInFilter,
  setShowPlacesDrawer
} from '../stores/actions';
import { IPlacesReducer } from '../stores/types/index';
import FilterCard from './FilterCard';
import { Typography, Button, Box } from '@material-ui/core';

interface IRecommendationProps {
  show: boolean;
  placesReducer: IPlacesReducer;
  getPlacesInFilter: Function;
  setShowPlacesDrawer: Function;
  onCloseSelf: Function;
  // showPlacesDrawer() :void
}

const Recommendation: React.FC<IRecommendationProps> = ({
  show,
  placesReducer,
  getPlacesInFilter,
  setShowPlacesDrawer,
  onCloseSelf
}: IRecommendationProps) => {
  const { filterList } = placesReducer;

  const [selectedFilter, setSelectedFilter] = useState<number>(-1);

  useEffect(() => {}, [filterList]);

  return (
    <BottomeSlideUp
      className="recommandation_box"
      num={0}
      pose={show ? 'show' : 'hide'}
    >
      <div className="recommandation_box-header onTheme">Around You</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflow: 'scroll',
          flex: 1
        }}
        className="onTheme"
      >
        {filterList.length === 0 && (
          <Box
            component="div"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1
            }}
          >
            <Typography variant="h6">No map selected</Typography>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                setShowPlacesDrawer(true);
                // onCloseSelf(false);
              }}
            >
              Select
            </Button>
          </Box>
        )}
        {filterList.length > 0 &&
          filterList.map(place => (
            <FilterCard
              key={place.id}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              place={place}
              getPlacesInFilter={getPlacesInFilter}
            />
          ))}
      </div>
    </BottomeSlideUp>
  );
};
interface IMapStateToProps {
  placesReducer: IPlacesReducer;
}
const mapStateToProps = ({ placesReducer }: IMapStateToProps) => ({
  placesReducer
});

export default connect(mapStateToProps, {
  getFilterList,
  getPlacesInFilter,
  setShowPlacesDrawer
})(Recommendation);
