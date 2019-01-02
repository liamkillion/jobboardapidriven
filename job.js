// grab the URL of the job post page
let url = location.href.split("/")
// parse the URL for the job ID
let jobID = location.href.split("/")[url.length-1].split("=")[1]
//construct the URL for making GET Retrieve Job endpoint using the jobID, including the questions=true querystring parameter
let job_url = `https://api.greenhouse.io/v1/boards/cardboard/jobs/${jobID}?questions=true`

// make a call to the GET Retrieve Job endpoint
fetch(job_url).then(response=>response.json()).then(job_object=>{
  // Generate a header element
  let title = document.createElement('h2')
  // set the text of the header to be the job post title
  title.innerHTML = job_object['title']
  // add the job post title under the corresponding div
  document.getElementById('job-post-title').appendChild(title)
  // Generate a header element
  let office = document.createElement('h5')
  // set the text of the header to be the location for the job post
  office.innerHTML = job_object['location']['name']
  // add the job post location under the corresponding div
  document.getElementById('job-post-office').appendChild(office)
  // the job post description comes with HTML tags, but with elements in unicode.  This replaces the unicode and drops it into the div so that it appears as html in the browser
  document.getElementById('job-post-description').innerHTML=job_object['content'].replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#39;/g,"'")
  // For reference, here is the bootstrap structure of a question:
  ////<div class="form-group">
  ////  <label for="exampleInputEmail1">Email address</label>
  ////  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
  ////  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  ////</div>
  job_object['questions'].forEach(question=>{
    // helper method for building single response inputs
    function constructQuestionByType(questionType){
      // create a div  element for containing the input and label
      let form_group = document.createElement('div')
      // give the div the boostrap class
      form_group.setAttribute('class','form-group')
      // create an input element
      let input = document.createElement('input')
      // set the input's type to the function's argument
      input.setAttribute('type',questionType)
      // give the input the boostrap class
      input.setAttribute('class','form-control')
      // give the input a unique ID
      input.setAttribute('id',question['label'])
      // create an label element
      let label = document.createElement('label')
      // setting for attribute of label to match input
      label.setAttribute('for',question['label'])
      // set the label's text to match the value
      label.innerHTML = question['label']
      // add the input as a child of the label
      label.appendChild(input)
      // add the label as a child of the div
      form_group.appendChild(label)
      // add the  div to the target form div
      document.getElementById('job-post-form').appendChild(form_group)
    }

    // helper method for building multiple response inputs
    function constructMultipleResponseValueQuestion(questionType){
      // create a div element for containing the form-check divs, label and multi/single select values
      let form_check_batch = document.createElement('div')
      // add a paragraph element tag for the question
      let p = document.createElement('p')
      // set the p tag's text to be the question
      p.innerHTML = question['label']
      // add the p tag to the div
      form_check_batch.appendChild(p)
      // for each multi/single select value for the question, do the following
      question['fields'][0]['values'].forEach(value=>{
        // create a div  element for containing the input and label
        let form_check = document.createElement('div')
        // give the div the boostrap class
        form_check.setAttribute('class','form-check')
        // create an input element
        let input = document.createElement('input')
        // set the input's type to the function's argument
        input.setAttribute('type',questionType)
        // give the input the boostrap class
        input.setAttribute('class','form-check-input')
        // give the input a unique ID
        input.setAttribute('id',value['label'])
        // give the input a collective "name"
        input.setAttribute('name',question['label'])
        // create an label element
        let label = document.createElement('label')
        // give the label the boostrap class
        label.setAttribute('class','form-check-label')
        // setting for attribute of label to match input
        label.setAttribute('for',value['label'])
        // set the label's text to match the value
        label.innerHTML = value['label']
        // add the input as a child of the form_check
        form_check.appendChild(input)
        // add the label as a child of the form_check
        form_check.appendChild(label)
        // add the form_check as a child of the batch div
        form_check_batch.appendChild(form_check)
      })
      document.getElementById('job-post-form').appendChild(form_check_batch)
    }
    // now, with helper methods defined, we can loop through the questions and create inputs accordingly
    if (question['fields'][0]['type']==='input_file'){
      constructQuestionByType('file')
    } else if (question['fields'][0]['type']==='input_text') {
      constructQuestionByType('text')
    } else if (question['fields'][0]['type']==='input_hidden') {
      constructQuestionByType('hidden')
    } else if (question['fields'][0]['type']==='textarea') {
      constructQuestionByType('text')
    } else if (question['fields'][0]['type']==='multi_value_single_select') {
      constructMultipleResponseValueQuestion('radio')
    } else if (question['fields'][0]['type']==='multi_value_multi_select') {
      constructMultipleResponseValueQuestion('checkbox')
    }
  })
  // create a button element
  let button = document.createElement('button')
  // set the button's type to submit
  button.setAttribute('type','submit')
  // set the button's bootstrap class
  button.setAttribute('class','btn btn-primary')
  // make the button say submit
  button.innerHTML="Submit"
  // add the button to the target div (done last so it is at the bottom)
  document.getElementById('job-post-form').appendChild(button)
})

// a similar process can be done for demographic and EEOC questions, also contained in the response.

// const API_ROOT="http://localhost:3000/api/v1"
// const getHeaders = () => {
//   return {
//     "Content-Type": "application/json",
//     Accept: "application/json"
//   };
// }
//
// const createNewJobApp = newJobApp => {
//   debugger
//   return fetch(`${API_ROOT}`, {
//     method: "POST",
//     headers: getHeaders(),
//     body: JSON.stringify(newJobApp)
//   }).then(res => res.json());
// }
