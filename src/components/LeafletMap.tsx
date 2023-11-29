import { useState } from 'react';
import L from 'leaflet';
import { createLayerComponent } from '@react-leaflet/core';
import { Marker, MapContainer, Popup, TileLayerProps, Polygon, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import socket from '../../utils/socketClient';
import bonnies from '../bonnies';

interface region {
  region_name: string;
  region_visited_by: string;
  region_x: number;
  region_y: number;
}

const initialLocations = {} as { [key: string]: region };
let updateLocationsRef: any = null;

socket.on('message', (data: any) => {
  if (data.messageType !== 'REGION_DATA') return;
  initialLocations[data.region_visited_by] = data;
  updateLocationsRef && updateLocationsRef({ ...initialLocations });
});

class LTileLayerSL extends L.TileLayer {
  getTileUrl(coords: L.Coords) {
    const z = 9 - coords.z;
    const regionsPerTileEdge = Math.pow(2, z - 1);
    const x = coords.x * regionsPerTileEdge;
    const y = (Math.abs(coords.y) - 1) * regionsPerTileEdge;

    return `https://map.secondlife.com/map-${z}-${x}-${y}-objects.jpg`;
  }
}

const createLayer = (props: Partial<TileLayerProps>, context: any) => {
  const instance = new LTileLayerSL('', { ...props });
  return { instance, context };
};

const TileLayerSL = createLayerComponent(createLayer, () => {});

const deltaDeg = 360 / bonnies.length;
const markerStyle = bonnies
  .map(
    (b, i) => `
      img[alt="marker-for-${b}"] {
        filter: hue-rotate(${i * deltaDeg}deg)
      } 
    `
  )
  .join('');

const popupPad = new L.Point(100, 100);

const SLMap: any = (props: any) => {
  const { continentPolygons, showContinents } = props;
  const [locations, updateLocations] = useState(initialLocations);
  updateLocationsRef = updateLocations;

  return (
    <>
      <style> {markerStyle} </style>
      <MapContainer
        center={[1024, 1024]}
        zoom={0}
        minZoom={-1}
        maxZoom={10}
        maxBounds={[
          [0, 0],
          [2048, 2048],
        ]}
        maxBoundsViscosity={1}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', backgroundColor: '#1e465ff2' }}
        crs={L.CRS.Simple}
      >
        <TileLayerSL minZoom={-1} maxZoom={10} maxNativeZoom={8} minNativeZoom={1} />

        {showContinents &&
          Object.keys(continentPolygons).map((name: any) => {
            const polygon = continentPolygons[name] as GeoJSON.Feature<GeoJSON.Polygon>;
            const positions = polygon.geometry.coordinates[0];

            return (
              <Polygon key={name} positions={positions as any}>
                <Popup>{name}</Popup>
              </Polygon>
            );
          })}

        {Object.values(locations).map((l, i) => {
          return (
            <Marker
              alt={`marker-for-${l.region_visited_by}`}
              position={[l.region_y + 0.5, l.region_x + 0.5]}
              key={l.region_visited_by}
            >
              <Popup autoPanPadding={popupPad}>
                {l.region_visited_by} @
                <br />
                {l.region_name}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
};

export default SLMap;
