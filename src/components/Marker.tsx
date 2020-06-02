import React from 'react';

interface IMakerProps {
  lat: number;
  lng: number;
  name: string;
  img: string;
  onClick(): void;
}

export const Marker: React.FC<IMakerProps> = props => {
  return (
    <div
      onClick={props.onClick}
      style={{
        width: 40,
        height: 40,
        display: 'relative'
      }}
    >
      <div
        style={{
          background: '#ffffffd6',
          padding: 4,
          borderRadius: 5,
          whiteSpace: 'nowrap',
          textAlign: 'center',
          border: '1px solid #00000042',
          position: 'absolute',
          // top: -25,
          left: 30
        }}
      >
        {props.name.length > 10
          ? `${props.name.substring(0, 10)}...`
          : props.name}
      </div>
      <img
        src={props.img}
        alt={props.name}
        style={{
          width: 40,
          height: 40,
          objectFit: 'contain'
        }}
      />
    </div>
  );
};
