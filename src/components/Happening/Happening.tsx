import { Box } from "@mui/material";
import RegionCard from "./RegionCard";

const Happening = (props: any) => {
  const { regions } = props.happeningStaticProps;

  return (
    <Box
      sx={{
        display: "grid",
        columnGap: 3,
        rowGap: 3,
        gridTemplateColumns: "repeat(auto-fit, minmax(370px, 1fr))",
      }}
    >
      {regions.map((region: any) => {
        return <RegionCard key={region.region_name} region={region} />;
      })}
    </Box>
  );
};

export default Happening;
