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
  // job_object['questions'].forEach(question=>{
  //   let input = document.createElement('input')
  //   input.setAttribute('style','display:inline')
  //   if (question['fields'][0]['type']==='input_file'){
  //     input.setAttribute('type','file')
  //   } else if (question['fields'][0]['type']==='input_text') {
  //     input.setAttribute('type','text')
  //   } else if (question['fields'][0]['type']==='input_hidden') {
  //     input.setAttribute('type','hidden')
  //   } else if (question['fields'][0]['type']==='textarea') {
  //     input.setAttribute('type','text')
  //   } else if (question['fields'][0]['type']==='multi_value_single_select') {
  //     question['fields'][0]['values'].each(value=>{})
  //   } else if (question['fields'][0]['type']==='multi_value_multi_select') {
  //     // need to write for the diff values
  //   }
  //   let label = document.createElement('label')
  //   label.setAttribute('for',question['label'])
  //   label.innerHTML = question['label']
  //   label.appendChild(input)
  //   document.getElementById('form').appendChild(label)
  // })
  job_object['questions'].forEach(question=>{
    if (question['fields'][0]['type']==='input_file'){
      let input = document.createElement('input')
      input.setAttribute('style','display:inline')
      input.setAttribute('type','file')
      let label = document.createElement('label')
      label.setAttribute('for',question['label'])
      label.innerHTML = question['label']
      label.appendChild(input)
      document.getElementById('form').appendChild(label)
    } else if (question['fields'][0]['type']==='input_text') {
      let input = document.createElement('input')
      input.setAttribute('style','display:inline')
      input.setAttribute('type','text')
      let label = document.createElement('label')
      label.setAttribute('for',question['label'])
      label.innerHTML = question['label']
      label.appendChild(input)
      document.getElementById('form').appendChild(label)
    } else if (question['fields'][0]['type']==='input_hidden') {
      let input = document.createElement('input')
      input.setAttribute('style','display:inline')
      input.setAttribute('type','hidden')
      let label = document.createElement('label')
      label.setAttribute('for',question['label'])
      label.innerHTML = question['label']
      label.appendChild(input)
      document.getElementById('form').appendChild(label)
    } else if (question['fields'][0]['type']==='textarea') {
      let input = document.createElement('input')
      input.setAttribute('style','display:inline')
      input.setAttribute('type','text')
      let label = document.createElement('label')
      label.setAttribute('for',question['label'])
      label.innerHTML = question['label']
      label.appendChild(input)
      document.getElementById('form').appendChild(label)
    } else if (question['fields'][0]['type']==='multi_value_single_select') {
      let multi_value_single_select = document.createElement('div')
      question['fields'][0]['values'].each(value=>{
        let input = document.createElement('input')
        input.setAttribute('style','display:inline')
        input.setAttribute('type','radio')
        input.setAttribute('value',value['value'])
        input.setAttribute('name',question['fields']['name'])
        let label = document.createElement('label')
        label.setAttribute('for',value['label'])
        label.innerHTML = value['label']
        label.appendChild(input)
        multi_value_single_select.appendChild(label)
      })
    } else if (question['fields'][0]['type']==='multi_value_multi_select') {
      let multi_value_multi_select = document.createElement('div')
      question['fields'][0]['values'].each(value=>{
        let input = document.createElement('input')
        input.setAttribute('style','display:inline')
        input.setAttribute('type','checkbox')
        input.setAttribute('value',value['value'])
        input.setAttribute('name',question['fields']['name'])
        let label = document.createElement('label')
        label.setAttribute('for',value['label'])
        label.innerHTML = value['label']
        label.appendChild(input)
        multi_value_multi_select.appendChild(label)
      })
    }
  })
})

const API_ROOT="http://localhost:3000/api/v1"
const getHeaders = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
}

const createNewJobApp = newJobApp => {
  debugger
  return fetch(`${API_ROOT}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(newJobApp)
  }).then(res => res.json());
}
