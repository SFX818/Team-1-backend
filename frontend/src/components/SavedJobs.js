import React, { useState, useEffect} from 'react';

//backend function import 
import { getJobs } from '../services/savedjob.service'


const SavedJobs = () => {
    const getjobs = getJobs()

    return (
        <div className = 'whole-div'>
            <h1>~User's Saved Jobs</h1>
            <div className = 'outer-div'>
                <div className = 'all-jobs'>
                    <h2>All Jobs:</h2>
                

                </div>

                <div className = 'need-action slide-box'>
                    <h2>Job Title: {getjobs.jobTitle}</h2>

                </div>

                <div className = 'applied-to slide-box'>
                    <h2>Applied To:</h2>

                </div>

                <div className = 'heard-back slide-box'>
                    <h2>Heard Back:</h2>

                </div>

                <div className = 'closed slide-box'>
                    <h2>REJECTED:</h2>

                </div>
            </div>
        </div>
    )
}
// component that renders on the page when the link is clicked undered saved jobs on the profile home page
// const SavedJobs = () => {
//     //setting a state that will hold the saved jobs
//     const [allJobs, setAllJobs] = useState({});

//     //use useEffect to run the getJobs function 
//     useEffect(() => {
//         let alljobs = getJobs();
//         console.log(jobs);
//         console.log('use effect')
//         setAllJobs(jobs);
//     }, []);


//     return (
//         <div className = 'whole-div'>
//             <h1>~User's Saved Jobs</h1>
//             <div className = 'outer-div'>
//                 <div className = 'all-jobs'>
//                     <h2>All Jobs:</h2>
                

//                 </div>

//                 <div className = 'need-action slide-box'>
//                     <h2>Need Action:</h2>

//                 </div>

//                 <div className = 'applied-to slide-box'>
//                     <h2>Applied To:</h2>

//                 </div>

//                 <div className = 'heard-back slide-box'>
//                     <h2>Heard Back:</h2>

//                 </div>

//                 <div className = 'closed slide-box'>
//                     <h2>REJECTED:</h2>

//                 </div>
//             </div>
//         </div>
//     )
// }

export default SavedJobs
