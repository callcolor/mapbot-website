import { formatDate } from '../../../utils/formatters';
import { Line } from '../Chart';

const AvatarHistoryChart = (props: any) => {
  const { avatarHistoryChartStaticProps } = props;
  const { avatar_count_data } = avatarHistoryChartStaticProps;

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time of visit',
        },
        type: 'linear',
        ticks: {
          callback: (t: any) => {
            return formatDate(t);
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Avatars present in region',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (data: any) => {
            return formatDate(data[0].parsed.x);
          },
        },
      },
    },
  };

  const data = {
    datasets: [
      {
        data: avatar_count_data,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
      },
    ],
  };

  return (
    <>
      <h2>Avatar Count</h2>
      <Line options={options as any} data={data} />
    </>
  );
};

export default AvatarHistoryChart;
