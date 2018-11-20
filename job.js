let url = location.href.split("/")
let jobID = location.href.split("/")[url.length-1].split("=")[1]
let job_url = `https://api.greenhouse.io/v1/boards/cardboard/jobs/${jobID}?questions=true`

fetch(job_url).then(response=>response.json()).then(job_object=>{
  // <div id="job-post-title"></div>
  let title = document.createElement('h2')
  title.innerHTML = job_object['title']
  document.getElementById('job-post-title').appendChild(title)
  // <div id="job-post-office"></div>
  let office = document.createElement('h5')
  office.innerHTML = job_object['location']['name']
  document.getElementById('job-post-office').appendChild(office)
  // <div id="job-post-description"></div>
  document.getElementById('job-post-description').innerHTML=job_object['content'].replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#39;/g,"'")
  // <div id="job-post-form"></div>
  let form = document.createElement('form')
  form.setAttribute('id','form')
  document.getElementById('job-post-form').appendChild(form)
  job_object['questions'].forEach(question=>{
    let input = document.createElement('input')
    input.setAttribute('style','display:inline')
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
    let label = document.createElement('label')
    label.setAttribute('for',question['label'])
    label.innerHTML = question['label']
    label.appendChild(input)
    document.getElementById('form').appendChild(label)
  })
})
