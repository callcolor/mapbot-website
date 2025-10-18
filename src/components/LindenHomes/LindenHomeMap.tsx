import L from 'leaflet';
import 'leaflet.markercluster';
import { createLayerComponent } from '@react-leaflet/core';
import { MapContainer, TileLayerProps } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'leaflet-defaulticon-compatibility';
import { LindenHomeRegion } from './LindenHomesStaticProps';

class LTileLayerSL extends L.TileLayer {
  getTileUrl(coords: L.Coords) {
    const z = 9 - coords.z;
    const regionsPerTileEdge = Math.pow(2, z - 1);
    const x = coords.x * regionsPerTileEdge;
    const y = (Math.abs(coords.y) - 1) * regionsPerTileEdge;

    return `https://map.secondlife.com/map-${z}-${x}-${y}-objects.jpg`;
  }
}
L.gridLayer;
const createLayer = (props: Partial<TileLayerProps>, context: any) => {
  const instance = new LTileLayerSL('', { ...props });
  return { instance, context };
};

const TileLayerSL = createLayerComponent(createLayer, () => { });

const createMarkerClusterLayer = (props: any, context: any) => {
  const lindenHomes = props.lindenHomes as LindenHomeRegion[];
  const instance = L.markerClusterGroup({
    maxClusterRadius: 60,
    disableClusteringAtZoom: 8,
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: false,
  });
  let markers: L.Marker[] = [];
  lindenHomes.map((lindenHomeRegion) => {
    lindenHomeRegion.linden_homes.map((lindenHome) => {
      const marker = new L.Marker([
        lindenHomeRegion.region_y + lindenHome.parcel_center_y / 256,
        lindenHomeRegion.region_x + lindenHome.parcel_center_x / 256,
      ]);
      marker.bindPopup(
        '<b>Continent: </b>' +
        lindenHomeRegion.continent_name +
        '<br>' +
        '<a href=secondlife://' +
        encodeURIComponent(lindenHomeRegion.region_name) +
        '/' +
        lindenHome.parcel_center_x +
        '/' +
        lindenHome.parcel_center_y +
        '/20>' +
        lindenHomeRegion.region_name +
        '/' +
        lindenHome.parcel_center_x +
        '/' +
        lindenHome.parcel_center_y +
        '</a>'
      );
      markers.push(marker);
    });
  });

  instance.addLayers(markers);
  return { instance, context };
};

const MarkerClusterSL = createLayerComponent(createMarkerClusterLayer, () => { });

const SLMap: any = (props: any) => {
  const lindenHomes = props.lindenHomes as LindenHomeRegion[];

  return (
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

      <MarkerClusterSL lindenHomes={lindenHomes} />
    </MapContainer>
  );
};

export default SLMap;
