const express = require('express');
const router = express.Router();

fetchCandidates();

// All candidates route
router.get('/', (req, res) => {
  res.render('candidates/index');
});

async function fetchCandidates() {
  const authString = process.env.JFUser + ':' + process.env.JFAuth;
  const options = {
    headers: {
      Authorization: 'Basic' + btoa(authString),
    },
  };
  // const response = await fetch(process.env.boond_url & '/candidates', options);
  // const data = await response.json();
  // console.log(data);
  console.log(authString);
}
// function renderFromBoond() {
//   const apiUrl = process.env.boond_url & "/candidates"

// fetch(apiUrl)
// .then(express.response => express.response.json())
// .catch(error => console.log(error))
// }

module.exports = router;
