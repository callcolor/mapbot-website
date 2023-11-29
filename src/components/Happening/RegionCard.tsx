import { Card, CardContent, Typography } from '@mui/material';
import RegionPhoto from '../RegionPhoto';
import { ArrowUpward } from '@mui/icons-material';
import Link from 'next/link';

const RegionCard = (props: any) => {
  const { region } = props;
  return (
    <Card sx={{ display: 'flex' }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 0 0px',
          minWidth: '150px',
          wordWrap: 'break-word',
        }}
      >
        <Typography component="div" variant="h5">
          <Link href={`/regions/${encodeURIComponent(region.region_name)}`}>
            {region.region_name}
          </Link>
        </Typography>
        {region.avatar_count && (
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {region.avatar_count} avatars
          </Typography>
        )}
        {region.diff && (
          <Typography variant="subtitle1" color="text.secondary" component="div">
            <ArrowUpward /> {region.diff} in the last hour.
          </Typography>
        )}
        <Typography
          sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto' }}
        ></Typography>
        <Typography>
          <a
            href={`https://maps.secondlife.com/secondlife/${region.region_name}/128/128/30`}
            target="_blank"
            rel="noreferrer"
          >
            Visit
          </a>
        </Typography>
      </CardContent>
      <div>
        <RegionPhoto region={region} />
      </div>
    </Card>
  );
};

export default RegionCard;
