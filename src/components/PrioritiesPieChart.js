import React from "react";
import { PieChart, Pie, Cell } from "recharts";

function PrioritiesPieChart(props) {
  const getPriorityCount = (priorities, priorityToCount) => {
    return priorities.filter((p) => p === priorityToCount).length;
  };

  const data = [
    {
      priority: "HIGH",
      count: getPriorityCount(props.priorities, "HIGH"),
    },
    {
      priority: "MEDIUM",
      count: getPriorityCount(props.priorities, "MEDIUM"),
    },
    {
      priority: "LOW",
      count: getPriorityCount(props.priorities, "LOW"),
    },
  ];

  const colors = ["red", "yellow", "blue"];

  return (
    <PieChart width={400} height={400}>
      <Pie data={data} dataKey={"count"} labelLine={false}>
        {data.map((entry, index) => (
          <Cell key={index} fill={colors[index]} />
        ))}
      </Pie>
    </PieChart>
  );
}

export default PrioritiesPieChart;
