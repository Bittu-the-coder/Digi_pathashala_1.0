import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressChart = () => {
  const data = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)",
          "rgba(99, 102, 241, 0.8)",
          "rgba(209, 213, 219, 0.8)",
        ],
        borderColor: [
          "rgba(16, 185, 129, 1)",
          "rgba(99, 102, 241, 1)",
          "rgba(209, 213, 219, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
    cutout: "70%",
  };

  return (
    <div className="h-80">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ProgressChart;
