import { Box } from '@mui/material';
import { CSSProperties } from 'react';
import { formatInt } from '../../../utils/formatters';

const tdStyle: CSSProperties = {
  textAlign: 'right',
  padding: '.5em 1em',
  border: '1px solid black',
};

const LindenHomeSummary = (props: any) => {
  const continentSummaries = props.lindenHomeSummary.continentSummaries as {
    continent_name: string;
    owned: number;
    unowned: number;
    total: number;
  }[];

  return (
    <Box
      sx={{
        paddingTop: '10px',
        margin: '2em auto',
        width: 'fit-content',
      }}
    >
      <table
        style={{
          // margin: "auto",
          borderCollapse: 'collapse',
          border: '1px solid black',
          opacity: '0.8',
        }}
      >
        <tbody>
          <tr
            style={{
              backgroundColor: '#c9e1c9',
            }}
          >
            <td style={tdStyle}>Subcontinent</td>
            <td style={tdStyle}>Occupied</td>
            <td style={tdStyle}>Available</td>
            <td style={tdStyle}>% Available</td>
          </tr>
          {continentSummaries.map((c) => (
            <tr key={c.continent_name}>
              <td style={tdStyle}>{c.continent_name}</td>
              <td style={tdStyle}>{formatInt(c.owned)}</td>
              <td style={tdStyle}>{formatInt(c.unowned)}</td>
              <td style={tdStyle}>{formatInt((c.unowned * 100) / c.total)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default LindenHomeSummary;
