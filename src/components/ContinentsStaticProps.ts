import turf from 'turf';
import contextPromise from '../../utils/contextPromise';

const ContinentStaticProps = async () => {
  const { prisma } = await contextPromise;
  const continents = await prisma.continent.findMany();
  const continentPolygons: { [name: string]: GeoJSON.Feature<GeoJSON.Polygon> } = {};
  for (const c of continents) {
    const polygon = turf.polygon([
      [
        [c.continent_min_y, c.continent_min_x],
        [c.continent_min_y, c.continent_max_x],
        [c.continent_max_y, c.continent_max_x],
        [c.continent_max_y, c.continent_min_x],
        [c.continent_min_y, c.continent_min_x],
      ],
    ]);
    if (!continentPolygons[c.continent_name]) {
      continentPolygons[c.continent_name] = polygon;
      continue;
    }

    continentPolygons[c.continent_name] = turf.union(
      continentPolygons[c.continent_name],
      polygon
    ) as any;
  }

  return { continents, continentPolygons };
};

export default ContinentStaticProps;
