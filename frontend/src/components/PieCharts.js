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
                style={{ marginLeft: "vw", height: "250%", width: "250%" }}
                data={[
                  {
                    title: "Heard Back: ",
                    value: allJobs[0].heardBackJobs.length || 10,
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
                label={({ dataEntry }) =>{
                if (dataEntry.percentage === 0){
                return  `${dataEntry.title} ${Math.round(dataEntry.percentage=100)} %`
                }else{
                    return `${dataEntry.title} ${Math.round(dataEntry.percentage)} %`
                }
                }
              }
              />
            </div>


            <div id="pie2">
              <h2 id="heardBack">
                {" "}
                Heard Back: {allJobs[0].heardBackJobs.length}{" "}
              </h2>
              <PieChart
                style={{ marginLeft: "vw", height: "250%", width: "250%" }}
                data={[
                  {
                    title: "Moved Fwrd: ",
                    value: allJobs[0].inProgressJobs.length || 100,
                    color: "#DB7093",
                  },
                  {
                    title: "Rejected: ",
                    value: allJobs[0].deniedFromJobs.length || 0,
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
