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
    function constructQuestionByType(questionType){
      let form_group = document.createElement('div')
      form_group.setAttribute('class','form-group')
      let input = document.createElement('input')
      input.setAttribute('type',questionType)
      input.setAttribute('class','form-control')
      input.setAttribute('id',question['label'])
      let label = document.createElement('label')
      label.setAttribute('for',question['label'])
      label.innerHTML = question['label']
      label.appendChild(input)
      form_group.appendChild(label)
      document.getElementById('job-post-form').appendChild(form_group)
    }

    function constructMultipleResponseValueQuestion(questionType){
      let form_check_batch = document.createElement('div')
      let p = document.createElement('p')
      p.innerHTML = question['label']
      form_check_batch.appendChild(p)
      question['fields'][0]['values'].forEach(value=>{
        let form_check = document.createElement('div')
        form_check.setAttribute('class','form-check')
        let input = document.createElement('input')
        input.setAttribute('type',questionType)
        input.setAttribute('class','form-check-input')
        input.setAttribute('id',value['label'])
        input.setAttribute('name',question['label'])
        let label = document.createElement('label')
        label.setAttribute('class','form-check-label')
        label.setAttribute('for',value['label'])
        label.innerHTML = value['label']
        form_check.appendChild(input)
        form_check.appendChild(label)
        form_check_batch.appendChild(form_check)
      })
      document.getElementById('job-post-form').appendChild(form_check_batch)
    }

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
  let button = document.createElement('button')
  button.setAttribute('type','submit')
  button.setAttribute('class','btn btn-primary')
  button.innerHTML="Submit"
  document.getElementById('job-post-form').appendChild(button)
})

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
