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
  // <form id="job-post-form"></form>
  // bootstrap structure of a question:
  ////<div class="form-group">
  ////  <label for="exampleInputEmail1">Email address</label>
  ////  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
  ////  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  ////</div>
  job_object['questions'].forEach(question=>{
    if (question['fields'][0]['type']==='input_file'){
      let form_group = document.createElement('div')
      form_group.setAttribute('class','form-group')
      let input = document.createElement('input')
      input.setAttribute('type','file')
      input.setAttribute('class','form-control')
      input.setAttribute('id',question['label'])
      let label = document.createElement('label')
      label.setAttribute('for',question['label'])
      label.innerHTML = question['label']
      label.appendChild(input)
      form_group.appendChild(label)
      document.getElementById('job-post-form').appendChild(form_group)
    } else if (question['fields'][0]['type']==='input_text') {
      let form_group = document.createElement('div')
      form_group.setAttribute('class','form-group')
      let input = document.createElement('input')
      input.setAttribute('type','text')
      input.setAttribute('class','form-control')
      input.setAttribute('id',question['label'])
      let label = document.createElement('label')
      label.setAttribute('for',question['label'])
      label.innerHTML = question['label']
      label.appendChild(input)
      form_group.appendChild(label)
      document.getElementById('job-post-form').appendChild(form_group)
    } else if (question['fields'][0]['type']==='input_hidden') {
      let form_group = document.createElement('div')
      form_group.setAttribute('class','form-group')
      let input = document.createElement('input')
      input.setAttribute('type','hidden')
      input.setAttribute('class','form-control')
      input.setAttribute('id',question['label'])
      let label = document.createElement('label')
      label.setAttribute('for',question['label'])
      label.innerHTML = question['label']
      label.appendChild(input)
      form_group.appendChild(label)
      document.getElementById('job-post-form').appendChild(form_group)
    } else if (question['fields'][0]['type']==='textarea') {
      let form_group = document.createElement('div')
      form_group.setAttribute('class','form-group')
      let input = document.createElement('input')
      input.setAttribute('type','text')
      input.setAttribute('class','form-control')
      input.setAttribute('id',question['label'])
      let label = document.createElement('label')
      label.setAttribute('for',question['label'])
      label.innerHTML = question['label']
      label.appendChild(input)
      form_group.appendChild(label)
      document.getElementById('job-post-form').appendChild(form_group)
    } else if (question['fields'][0]['type']==='multi_value_single_select') {
      let form_check_batch = document.createElement('div')
      let p = document.createElement('p')
      p.innerHTML = question['label']
      form_check_batch.appendChild(p)
      question['fields'][0]['values'].forEach(value=>{
        let form_check = document.createElement('div')
        form_check.setAttribute('class','form-check')
        let input = document.createElement('input')
        input.setAttribute('type','radio')
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
    } else if (question['fields'][0]['type']==='multi_value_multi_select') {
      let form_check_batch = document.createElement('div')
      let p = document.createElement('p')
      p.innerHTML = question['label']
      form_check_batch.appendChild(p)
      question['fields'][0]['values'].forEach(value=>{
        let form_check = document.createElement('div')
        form_check.setAttribute('class','form-check')
        let input = document.createElement('input')
        input.setAttribute('type','checkbox')
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
