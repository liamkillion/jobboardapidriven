let offices_url = "https://api.greenhouse.io/v1/boards/cardboard/offices?content=true"
let departments_url = "https://api.greenhouse.io/v1/boards/cardboard/departments?content=true"
let jobs_url = "https://api.greenhouse.io/v1/boards/cardboard/jobs?content=true"

// make a call to the offices endpoint
fetch(offices_url).then(resp=>resp.json()).then(data=>data['offices']).then(offices=>{
  offices.forEach(office=>{
    // exclude offices w/o a name (presumes all jobs will be assigned to an office)
    if (office['name']!=="No Office"){
      // generate header element for each office
      let h3 = document.createElement('h3')
      // give the office header an id matching the office ID
      h3.setAttribute('id',`${office['name']}-header`)
      // set the text of the header to be the office name
      h3.innerHTML=office['name']
      // add the office name hadder under the "jobs by office" section
      document.getElementById('jobs-by-office').appendChild(h3)
      // create an unordered list under the office header
      let ul = document.createElement('ul')
      // give unordered list an id of the office name
      ul.setAttribute('id',`${office['name']}`)
      // attach unordered list under the corresponding office header
      document.getElementById(`${office['name']}-header`).appendChild(ul)
    }
  })
  // make a GET request to the Greenhouse Job Board API jobs endpoint, and then for each job post
  fetch(jobs_url).then(resp=>resp.json()).then(data=>data['jobs']).then(jobs=>{
    jobs.forEach(job=>{
      // create list item
      let li = document.createElement('li')
      // set list item to be links to job post
      li.innerHTML = (`<a href='./job.html?gh_jid=${job['id']}'>${job['title']}</a>`)
      // find and add the list item to the corresponding unordered list for each office
      let office_ul = document.getElementById(`${job['offices'][0]['name']}`)
      office_ul.appendChild(li)
    })
  })
})

// make a GET request to the Greenhouse Job Board API departments endpoint, and then for each department
fetch(departments_url).then(resp=>resp.json()).then(data=>data['departments']).then(departments=>{
  departments.forEach(department=>{
    // exclude jobs w/ No Department
    if(department['name']!=="No Department"){
      // generate headers element
      let h3 = document.createElement('h3')
      // give header id of department name
      h3.setAttribute('id',`${department['name']}-header`)
      // set header text to department name
      h3.innerHTML=department['name']
      // add header under the right section of the page
      document.getElementById('jobs-by-department').appendChild(h3)
      // create an unordered list
      let ul = document.createElement('ul')
      // give unordered list an id of the department name
      ul.setAttribute('id',`${department['name']}`)
      // attach unordered list under the corresponding department header
      document.getElementById(`${department['name']}-header`).appendChild(ul)
    }
  })
  // make a GET request to the Greenhouse Job Board API jobs endpoint, and then for each job post
  fetch(jobs_url).then(resp=>resp.json()).then(data=>data['jobs']).then(jobs=>{
    jobs.forEach(job=>{
      // create list item
      let li = document.createElement('li')
      // set list item to be links to job post
      li.innerHTML = (`<a href='./job.html?gh_jid=${job['id']}'>${job['title']}</a>`)
      // find and add the list item to the corresponding unordered list for each department
      let dept_ul = document.getElementById(`${job['departments'][0]['name']}`)
      dept_ul.appendChild(li)
    })
    // add placeholder for offices/departments that have no job posts
    // create an array of unordered lists, and for each list
    Array.from(document.getElementsByTagName('ul')).forEach(ul=>{
      // if the unordered list has no child elements
      if(ul.childElementCount===0){
        // create list item
        let li=document.createElement('li')
        // set list item text to be "No openings at this time"
        li.innerHTML="No openings at this time"
        // add list item to the previously-identified empty list
        ul.appendChild(li)
      }
    })
  })
})
