const RegionPhoto = (props: any) => {
  const { region } = props;
  return (
    <a
      href={`https://maps.secondlife.com/secondlife/${region.region_name}/128/128/30`}
      target="_blank"
      rel="noreferrer"
    >
      <picture>
        <img
          style={{
            width: '100%',
            height: '100%',
            aspectRatio: '1',
          }}
          alt="Region"
          src={`https://map.secondlife.com/map-1-${region.region_x}-${region.region_y}-objects.jpg`}
        />
      </picture>
    </a>
  );
};

export default RegionPhoto;
