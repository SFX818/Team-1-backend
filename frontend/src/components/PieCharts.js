import React from "react";
import { PieChart } from "react-minimal-pie-chart";


function PieCharts({ allJobs }) {
  if(allJobs[0].appliedToJobs.length> 0 && allJobs[0].heardBackJobs.length > 0 && allJobs[0].inProgressJobs.length > 0 && allJobs[0].deniedFromJobs.length >0 ){ 
  return (
    <div>
      <div id="pie">
        <h2 id="stats"> Stats: </h2>
        <h2 id="applied"> Applied to: {allJobs[0].appliedToJobs.length} </h2>
        <PieChart
          style={{ marginLeft: "vw", height: "250%", width: "250%" }}
          data={[
            {
              title: "Heard Back: ",
              value: allJobs[0].heardBackJobs.length,
              color: "#6CDACA",
            },
            {
              title: "Waiting: ",
              value:
                allJobs[0].appliedToJobs.length -
                allJobs[0].heardBackJobs.length,
              color: "#6CB3DA",
            },
          ]}
          // label={({ dataEntry }) => dataEntry.title}
          label={({ dataEntry }) =>
            `${dataEntry.title} ${Math.round(dataEntry.percentage)} %`
          }
        />
      </div>
      <div id="pie2">
        <h2 id="heardBack"> Heard Back: {allJobs[0].heardBackJobs.length + 1} </h2>
        <PieChart
          style={{ marginLeft: "vw", height: "250%", width: "250%" }}
          data={[
            {
              title: "Moved Fwrd: ",
              value: allJobs[0].inProgressJobs.length,
              color: "#65F4BC",
            },
            {
              title: "Rejected: ",
              value: allJobs[0].deniedFromJobs.length,
              color: "#65E5F4",
            },
          ]}
          //   label={({ dataEntry }) => dataEntry.title}
          label={({ dataEntry }) =>
            `${dataEntry.title} ${Math.round(dataEntry.percentage)} %`
          }
        />
      </div>
    </div>
  );
} 
return <div id="fakePieDiv">  
  <h2 id="stats2"> Stats: </h2>
  <div id='fake-pie-text'>
  <p>You've applied to {allJobs[0].appliedToJobs.length} jobs.</p>  
  {/* <p>You've heard back from {allJobs[0].heardBackJobs.length} jobs.</p> */}
 </div>
 <img id="fakePie" style={{ height: "130%", width: "130%" }} src="https://i.imgur.com/BbVwLvl.png"></img>
 <div id='fake-pie-text'>
  {/* <p>You've applied to {allJobs[0].appliedToJobs.length} jobs.</p>   */}
  <p>You've heard back from {allJobs[0].heardBackJobs.length} jobs.</p>
 </div>

 </div>;
}
export default PieCharts;


