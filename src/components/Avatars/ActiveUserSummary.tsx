import { Box } from '@mui/material';
import { CSSProperties } from 'react';
import { formatInt } from '../../../utils/formatters';

const tdStyle: CSSProperties = {
  textAlign: 'right',
  padding: '.5em 1em',
  border: '1px solid black',
};

const ActiveUserSummary = (props: any) => {
  const { userSummary } = props.activeUserSummaryStaticProps;

  return (
    <Box
      sx={{
        paddingTop: '10px',
        margin: '2em auto',
        width: 'fit-content',
      }}
    >
      <h3>Active User Summary</h3>
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
            <td style={tdStyle}>Active User Estimate (14-day)</td>
            <td style={tdStyle}>Standard</td>
            <td style={tdStyle}>Premium</td>
            <td style={tdStyle}>Premium Plus</td>
          </tr>
          <tr>
            <td style={tdStyle}>
              {formatInt(userSummary.standard + userSummary.premium + userSummary.premium_plus)}
            </td>
            <td style={tdStyle}>{formatInt(userSummary.standard)}</td>
            <td style={tdStyle}>{formatInt(userSummary.premium)}</td>
            <td style={tdStyle}>{formatInt(userSummary.premium_plus)}</td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
};

export default ActiveUserSummary;
