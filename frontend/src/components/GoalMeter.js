import React from 'react'
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

//imports for dropdown menu
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';


function GoalMeter({codingGoal, codingProgress, appGoal, appProgress, changeCodingGoal, changeGoalProgress, changeAppGoal, changeAppProgress}) {

  const goalOptions = [
    {label: '1', value: 1},
    {label: '2', value: 2},
    {label: '3', value: 3},
    {label: '4', value: 4},
    {label: '5', value: 5},
    {label: '6', value: 6},
    {label: '7', value: 7},
    {label: '8', value: 8},
    {label: '9', value: 9},
    {label: '10', value: 10}
  ]


  const result = Math.round((codingProgress / codingGoal) * 100);
  const result2 = Math.round((appProgress / appGoal) * 100);

    return (
        <div>
            <h4>Coding Goals:</h4>
            Set a Coding Goal:
            <Select options={goalOptions} onChange={(event)=> {changeCodingGoal(event)}}/>

            <Progress
              theme={{
                success: {
                  symbol: "🎉‍",
                  color: "rgb(50, 205, 50)",
                },
                active: {
                  symbol: "😀",
                  color: "#fbc630",
                },
                default: {
                  symbol: "😱",
                  color: "#FF6347",
                },
              }}
              percent={result}
              //status="success"
            />

            <div id="goalTextDiv">
              {" "}
              Goal: {codingGoal} &nbsp; Completed: {codingProgress} 
              <button onClick={(event) => {changeGoalProgress("subtract")}}>{" "}-{" "} </button>
              <button onClick={(event) => {changeGoalProgress("add")}}>{" "}+{" "} </button>
            </div>

            <h4>Job Application Goals:</h4>
            Set an Application Goal:
            <Select options={goalOptions} onChange={(event)=> {changeAppGoal(event)}}/>

            <Progress
              theme={{
                success: {
                  symbol: "🎉‍",
                  color: "rgb(50, 205, 50)",
                },
                active: {
                  symbol: "😀",
                  color: "#fbc630",
                },
                default: {
                  symbol: "😱",
                  color: "#FF6347",
                },
              }}
              percent={result2}
              //status="success"
            />

            <div id="goalTextDiv">
              {" "}
              Goal: {appGoal} &nbsp; Completed: {appProgress} 
              <button onClick={(event) => {changeAppProgress("subtract")}}>{" "}-{" "} </button>
              <button onClick={(event) => {changeAppProgress("add")}}>{" "}+{" "} </button>
            </div>
        </div>
    )
}

export default GoalMeter
