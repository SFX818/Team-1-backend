import React from 'react'
import { PieChart } from "react-minimal-pie-chart";

function PieCharts({allJobs}) {
    return (
        <div>
            <div id="pie">
              <h2 id="stats"> Stats: </h2>
              <h2 id="applied">
                {" "}
                Applied to: {allJobs[0].appliedToJobs.length}{" "}
              </h2>
              <PieChart
                style={{ marginLeft: "vw", height: "200px", width: "200px" }}
                data={[
                  {
                    title: "Heard Back: ",
                    value: allJobs[0].heardBackJobs.length,
                    color: "#20B2AA",
                  },
                  {
                    title: "Waiting: ",
                    value:
                      allJobs[0].appliedToJobs.length -
                      allJobs[0].heardBackJobs.length,
                    color: "#90EE90",
                  },
                ]}
                //   label={({ dataEntry }) => dataEntry.title}
                label={({ dataEntry }) =>
                  `${dataEntry.title} ${Math.round(dataEntry.percentage)} %`
                }
              />
            </div>


            <div id="pie2">
              <h2 id="heardBack">
                {" "}
                Heard Back: {allJobs[0].heardBackJobs.length}{" "}
              </h2>
              <PieChart
                style={{ marginLeft: "vw", height: "200px", width: "200px" }}
                data={[
                  {
                    title: "Moved Fwrd: ",
                    value: allJobs[0].inProgressJobs.length,
                    color: "#DB7093",
                  },
                  {
                    title: "Rejected: ",
                    value: allJobs[0].deniedFromJobs.length,
                    color: "#ff000080",
                  },
                ]}
                //   label={({ dataEntry }) => dataEntry.title}
                label={({ dataEntry }) =>
                  `${dataEntry.title} ${Math.round(dataEntry.percentage)} %`
                }
              />
            </div>
        </div>
    )
}

export default PieCharts
