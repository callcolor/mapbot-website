import { Bar } from "../Chart";

const range = (begin: number, end: number) => {
  var arr = [];
  for (var i = begin; i <= end; i++) {
    arr.push(i);
  }
  return arr;
};

const AvatarDistributionChart = (props: any) => {
  const { avatarDistributionChartStaticProps } = props;
  const { avatar_distribution_data } = avatarDistributionChartStaticProps;

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Avatars present in region",
        },
      },
      y: {
        title: {
          display: true,
          text: "Region visits",
        },
      },
    },
  };

  const lowestLabel = avatar_distribution_data[0]?.[0] || 0;
  const highestLabel =
    avatar_distribution_data[avatar_distribution_data.length - 1]?.[0] || 0;
  const labels = range(lowestLabel, highestLabel);

  const data = {
    labels: labels.map((l) => `${l * 10}-${(l + 1) * 10 - 1}`),
    datasets: [
      {
        data: labels.map((l) => {
          return (
            avatar_distribution_data.find((d: any[]) => {
              return d[0] === l;
            })?.[1] || 0
          );
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.3,
      },
    ],
  };

  return (
    <>
      <h2>Avatar Distribution</h2>
      <Bar options={options as any} data={data} />
    </>
  );
};

export default AvatarDistributionChart;
