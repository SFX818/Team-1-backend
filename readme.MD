# The Tracker App.
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) `#f03c15`


Link:  
Test Email:
Test Password:



###Concept: 
This application provides an efficient service that farms out and selects the best available jobs matching your search criteria. 



Your results can be based on the following:

* Specific Coding Language
* Framework
* Location


In addition, our application helps the user stay organized and track their progress. We have incorporated a to-do list that manages their weekly tasks and goals. Lastly, the network dashboard allows the user to keep track of their contacts and growing professional network. 



### User Story: 

As a user: 
* Be able to view and choose jobs by specific coding language(s) and location.
* Be able to save favorite jobs.
* Be able to set and keep track of weekly goals.
* Be able to keep track of the number of submitted application.
* Be able to keep track of the number of jobs they have heard back from.
* Be able to write notes on how an interview went: good/bad/space to improve.
* Be able to keep track and organize contacts and network.

 ### Wireframe: 

 ##### Home:

 <img width="711" alt="Screen Shot 2020-12-24 at 2 48 21 PM" src="https://user-images.githubusercontent.com/69879822/103104781-4b730580-45f7-11eb-8501-54b134aa12c7.png">

##### Search Page:
<img width="800" alt="Screen Shot 2020-12-24 at 2 53 13 PM" src="https://user-images.githubusercontent.com/69879822/103105083-5890f400-45f9-11eb-9e8e-24c7a8c4d021.png">

##### Profile:

<img width="808" alt="Screen Shot 2020-12-24 at 3 07 10 PM" src="https://user-images.githubusercontent.com/69879822/103105141-cc330100-45f9-11eb-895b-804d722d49c5.png">

##### Results:
<img width="875" alt="Screen Shot 2020-12-24 at 3 20 17 PM" src="https://user-images.githubusercontent.com/69879822/103105400-a0b11600-45fb-11eb-97fd-1bd0f161347e.png">

##### Network Dashboard: 
<img width="871" alt="Screen Shot 2020-12-24 at 3 22 40 PM" src="https://user-images.githubusercontent.com/69879822/103105454-f5549100-45fb-11eb-8eb8-94cfeb8910c1.png">

Website Used: [Lucid App](https://lucid.app/)

### ERD

<img width="1196" alt="Screen Shot 2020-12-24 at 4 09 08 PM" src="https://user-images.githubusercontent.com/69879822/103106342-9e05ef00-4602-11eb-80ef-9c0ae13759ed.png">


Website Used: [Whimsical](http://whimsical.com)


### Technologies Used: 

* Node/Express
* Bcrypt for authentification and password hashing.
* Mongoose for data structure.
* MongoDB for data storage.
* Axios for API calls/fetch data.
* CSS for styling,
* HTML for basic structure
* JavaScript used to make web page interactive 
* Postman used to help with RESTful apis.


### Routes:

CRUD | Route | Function
--------------- | --------------- | -----------------
POST | /api/auth/signup | Register new user
POST | /api/auth/signin | Login user
GET  | /profile | Display the profile page with the app and coding goals, and the todo list
PUT  | /profile/todos | Edit the todo list
PUT  | /profile/goals | Edit the app and coding goals
POST | /newnetwork | Creates a new contact on the network page
GET  | /findnetwork | Shows all our saved contacts on our network page
DELETE | /delete/network/:id | Deletes a contact by id
PUT | /updatenetwork/:id | Edit the contact and saves by id
GET | /profile/savedJobs | Displays all of the specifics user's favorited jobs on profile page
POST | /newsavedJob | Creates a new savedJob and assigns it to the current user
DELETE | /deletejob/:id | Deletes the savedJob
PUT | /updatenote/:id | Updates the notes inside the appliedTo object
GET | /findjob/:id | Retrieve a job by its id
PUT | /changestatus/:id | grab and save updated statuses on their savedJob


### Models: 
MODEL | SCHEMA 
------ | --------
Network | name, company,phone,email,notes[]
SavedJob | jobId,location,language,company,jobTitle,heardBack:{status,scheduledInterview,closed},appliedTo:{appstatus,date,notes[]}
User | username,email,password,roles:[{ref:Role}],todos[], savedJobs:[{SavedJob}], codingGoal:{goal,progress},appGoal{goal,progress}, network[{ref:Network}]
Role | name








