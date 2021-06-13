// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>PetFinder App</h1>`;

//Auth Keys
const clientId = "RfRUR753OrhjgckQrvHV92oIyKyNXmmwvOY5FGRC2JOUzF8ISW";

const clientSecret = "b3W1zfT54mEls9WZPVWaFgzmko62oJh6vL1NrbJr";

// const apiToken = `curl -d grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret} https://api.petfinder.com/v2/oauth2/token`;

//Parameters variables
const dog = 'dog';
const pageNumber = 2;

//Auth data
var data = {
	access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJSZlJVUjc1M09yaGpnY2tRcnZIVjkyb0l5S3lOWG1td3ZPWTVGR1JDMkpPVXpGOElTVyIsImp0aSI6IjA3YmFmYTY1MTdhMmI2NmExMGRjMjcyY2YyYmRmYWI4MjEyYWFjMTg4OTJiZjNmNGNjMmI3Yzk0ZDI4YTRmNmEwMWM3ZGQ4N2RmNzZiZTM3IiwiaWF0IjoxNjIzNDkyOTA2LCJuYmYiOjE2MjM0OTI5MDYsImV4cCI6MTYyMzQ5NjUwNiwic3ViIjoiIiwic2NvcGVzIjpbXX0.WROdurBFG9rtzcp_Rq_9X3dy9ysWklg8QtCMObdEwSTzFK4s5dG2Xp8skkoQkvfnKPm2DBQs-oiiCKULFsDqCrrvYS2MYxs6Z2y-n1GXfoj5Pws7SU-1Azm629nQk8sWzEj-TJ74dOSQ_nJM6L3CJrDB7l2t-RiCsghuSNUuX5EoK4l7A0ZAss10zc3JMHqDAMlG7mk7_naI8CSX-0eBOfAdUOmm5zleuDMtXlRt17UkZ-bZ-IiSIA6afcu6upKhV9_-538YrONSow41J33dBDkIoQ1mL9TJx4VmQ9HHN8tfspxGsHrNL0e28r6C7TZ7dCR0Ch5_UmOR6qutmGeeOQ",
	expires_in: 3600,
	token_type: "Bearer"
};

//selecting the option details
const optionOne = document.querySelector('.first_option');

const optionTwo = document.querySelector('.second_option');

const main = document.getElementById('main');

//create an img for optionOne
const imgOne = document.createElement('a');

//add a class on it
imgOne.className = "img_options";

//We also create an h3
const headName = document.createElement('h3');

//we creat 3 paragraphs
const paraAge = document.createElement('p');
const paraLocation = document.createElement('p');
const paraEmail = document.createElement('p');
const paraDescription = document.createElement('p');

//APPEND ALL THE ELEMENTS TO THE MAIN DIV
const mainContent = document.querySelector('.main_content');


//Add an Event addEventListener to the 1st option
main.addEventListener('click', mainFunc);

function mainFunc(e) {

  if(headName.innerText||imgOne.innerText||paraAge||paraLocation||paraEmail||paraDescription != null){
  mainContent.appendChild(headName);
  mainContent.appendChild(paraAge);
  mainContent.appendChild(paraLocation);
  mainContent.appendChild(paraEmail);
  mainContent.appendChild(paraDescription);
  mainContent.appendChild(imgOne);
  } else {
    console.log('err');
  }
}
mainFunc();

//Run the fetch method to get the auth token

fetch('https://api.petfinder.com/v2/oauth2/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
})
.then(res => res.json())
.then((data) => {
  // console.log('token', data);

  //We create another fetch method since it returns a promise 
return fetch('https://api.petfinder.com/v2/animals?type=dog&page=2', {
  headers: {
    'Authorization':`${data.token_type} ${data.access_token}`,
    'content-type': 'application/x-www-form-urlencoded',
  }
})
.then(res => res.json())
.then((data) => {
  // optionOne.value = `${data.animals[0].name}`;
  optionOne.innerText = `${data.animals[0].name}`;
   //IMAGES HAVE SOME PROBLEMS
  imgOne.href = `${data.animals.url}`;
  
  headName.textContent = `Name: ${data.animals[0].name}`;
  paraAge.textContent = `Age: ${data.animals[0].age}`;
  paraLocation.textContent = `Address: ${data.animals[0].contact.address.address1}`;
  paraEmail.textContent = `Email: ${data.animals[0].contact.email}`;
  paraDescription.textContent = `Description: ${data.animals[0].description}`;

  console.log(data.animals[0]);
})
.catch(err => {
  console.log('Something went wrong', err)
})
})
.catch(err => console.log(err))


//optionTwo elememt
const mainTwo = document.querySelector('.pet');

const btn = document.querySelector('#btn');
btn.addEventListener('click', clicked);
function clicked(){
  window.location.reload();
}


// mainTwo.addEventListener('click', runEvent);
// function runEvent(e){
//   // var item = e.nextElementChild;
//   console.log(e);
// }
// runEvent();


// //Run the fetch method to get the auth token

// fetch('https://api.petfinder.com/v2/oauth2/token', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
// })
// .then(res => res.json())
// .then((data) => {
//   // console.log('token', data);

//   //We create another fetch for cats method since it returns a promise 
// return fetch(`https://api.petfinder.com/v2/animals?type=cat&page=3`, {
//   headers: {
//     'Authorization': data.token_type + ' ' + data.access_token,
//     'content-type': 'application/x-www-form-urlencoded',
//   }
// })
// .then(res => res.json())
// .then((data) => {

//   optionTwo.value = `${data.animals[0].name}`;
//   optionTwo.innerText = `${data.animals[0].name}`
//   img1.setAttribute('src', `${data.animals[1].photos[0].medium}`);
//   console.log(img1);
//   headName.textContent = `Name: ${data.animals[0].name}`;
//   paraAge.textContent = `Age: ${data.animals[0].age}`;
//   paraLocation.textContent = `Address: ${data.animals[0].contact.address.address1}`;
//   paraEmail.textContent = `Email: ${data.animals[0].contact.email}`;
//   paraDescription.textContent = `Description: ${data.animals[0].description}`;

//   console.log(data.animals[0]);
// })
// .catch(err => {
//   console.log('Something went wrong', err)
// })
// })
// .catch(err => console.log(err))


