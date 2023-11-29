import { CSSProperties } from 'react';
import Box from '@mui/material/Box';
import { PopularLastName } from './PopularLastNamesStaticProps';
import chunk from '../../../utils/chunk';
import { Grid } from '@mui/material';

const tdStyle: CSSProperties = {
  textAlign: 'center',
  padding: '.5em 1em',
  border: '1px solid black',
};

const MostPopularLastNames = ({
  popularLastNamesStaticProps,
}: {
  popularLastNamesStaticProps: PopularLastName[];
}) => {
  const nameChunks = chunk(popularLastNamesStaticProps, 4);

  return (
    <Box
      sx={{
        paddingTop: '10px',
        margin: '2em auto',
        width: 'fit-content',
      }}
    >
      <h3>Most Popular Last Names (Active users only)</h3>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {nameChunks.map((chunk, ci) => (
          <Grid key={ci} item xs={12} md={6} lg={3}>
            <table
              style={{
                margin: 'auto',
                borderCollapse: 'collapse',
                border: '1px solid black',
                opacity: '0.8',
                minWidth: '280px',
              }}
            >
              <tbody>
                <tr
                  style={{
                    backgroundColor: '#c9e1c9',
                  }}
                >
                  <td style={tdStyle}>Rank</td>
                  <td style={tdStyle}>Name</td>
                  <td style={tdStyle}>Count</td>
                </tr>

                {chunk.map((name, ni) => (
                  <tr key={ni} style={{ backgroundColor: ni % 2 ? 'rgb(220, 241, 247)' : 'white' }}>
                    <td style={{ ...tdStyle, textAlign: 'left' }}>{ci * 25 + ni + 1}</td>
                    <td style={{ ...tdStyle, textAlign: 'left' }}>{name.last_name}</td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>{name.cnt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MostPopularLastNames;
