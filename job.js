let url = location.href.split("/")
let jobID = location.href.split("/")[url.length-1]
let job_url = `https://api.greenhouse.io/v1/boards/cardboard/jobs/${jobID}?questions=true`

let job_object = fetch(job_url).then(response=>response.json())
// <div id="job-post-title"></div>
let title = document.createElement('h2')
title.innerHTML = job_object['title']
document.getElementById('job-post-title').appendChild(title)
// <div id="job-post-location"></div>
let location = document.createElement('h5')
location.innerHTML = job_object['location']['name']
document.getElementById('job-post-location').appendChild(location)
// <div id="job-post-description"></div>
let description = document.createElement('p')
description.innerHTML = job_object['content']
document.getElementById('job-post-description').appendChild(description)
// <div id="job-post-form"></div>
let form = document.createElement('form')
document.getElementById('job-post-form').appendChild(form)
job_object.forEach(question=>{
  let input = document.createElement('input')
  if (question['fields'][0]['type']==='input_file'){
    input.setAttribute('type','file')
  } else if (question['fields'][0]['type']==='input_text') {
    input.setAttribute('type','text')
  } else if (question['fields'][0]['type']==='input_hidden') {
    input.setAttribute('type','hidden')
  } else if (question['fields'][0]['type']==='textarea') {
    input.setAttribute('type','text')
  } else if (question['fields'][0]['type']==='multi_value_single_select') {
    // need to write for the diff values
  } else if (question['fields'][0]['type']==='multi_value_multi_select') {
    // need to write for the diff values
  }
})
