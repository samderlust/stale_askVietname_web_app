import React from 'react';
import { PlaceCard } from './Places/PlaceCard';
import { ITraveMap } from '../stores/types';

interface IPlacesDrawerProps {
  allMaps: ITraveMap[];
  closePlacesDrawer: () => void;
}

export const PlacesDrawer: React.FC<IPlacesDrawerProps> = ({
  allMaps,
  closePlacesDrawer
}) => {
  return (
    <div
      role="presentation"
      style={{
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
      }}
      className="onTheme"
    >
      {allMaps.map(map => (
        <PlaceCard
          key={map.id}
          map={map}
          history={null}
          closePlacesDrawer={closePlacesDrawer}
        />
      ))}
    </div>
  );
};
