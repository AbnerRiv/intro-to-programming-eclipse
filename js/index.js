document.addEventListener('DOMContentLoaded', () => {
  let today = new Date()
  let thisYear = today.getFullYear()

  const footer = document.querySelector('footer')
  const copyright = document.createElement('p')
  const myDiv = document.createElement('div')

  copyright.innerHTML = `&copy; Abner Rivera ${thisYear} `
  myDiv.appendChild(copyright)
  footer.appendChild(myDiv)

  let skills = ['Javascript', 'HTML', 'CSS', 'Java', 'Python']

  const skillsSection = document.querySelector('#skills')

  const skillsList = skillsSection.querySelector('ul')

  for(let skill in skills){
    let li = document.createElement('li')
    li.innerHTML = skills[skill]
    skillsList.appendChild(li)
  }

  /*
  Adding code as Week 06/02
  */
  const messageForm = document.querySelector("[name='leave_message']")
  const messageLink = document.querySelector("[href='#messages']")
  // Stretch task #1
  const messageSection = document.querySelector('#messages')
  const messageH2 = messageSection.firstElementChild
  const messageList = messageSection.querySelector('ul')

  // set an empty string to keep adding things to it
  if(localStorage['str'] !== undefined  && localStorage['str'] !== ''){
    let myArr = localStorage['str'].split("*")
    myArr.forEach( (item) => {
      if(item.includes("<a")){
        const li = document.createElement('li')
        li.innerHTML = item
        messageList.appendChild(li)
      }// end checking if
    })// end for each
  }else{
    // this is the first time loading tha page
    messageH2.style.display = 'none'
    messageLink.style.display = 'none'
    localStorage.setItem('str', '')
  }

  const getTime = () =>{
    // get today's date
    let thisDay = new Date()
    return thisDay.toLocaleString('en-US')
  }

// used to change to a more readable time format
// than the default from created_at from JSON object
  const changeTime = (myStr) =>{
    // get today's date
    let thisDay = new Date(myStr)
    return thisDay.toLocaleString('en-US')
  }

/* Check input from user because the character "*"
   will crash the page due to how LocalStorage.str is set up.
   Using method bubbling check input for messageForm and messageSection */
   function checkFormInput(){
     const submitButton = messageForm.lastElementChild.firstElementChild
     const nameInput = document.querySelector('#name')
     const emailInput = document.querySelector('#email')
     const messageInput = document.querySelector('#message')

     if(nameInput.value.includes('*') || emailInput.value.includes('*') ||
        messageInput.value.includes('*')){
      submitButton.disabled = true;
      submitButton.style.color = '#f2edf4'
      submitButton.style.backgroundColor = '#f7f7f7'
    }else{
      submitButton.disabled = false;
      submitButton.style.color = '#4904dd'
      submitButton.style.backgroundColor = '#efefef'
    }// end if else
  }

  function checkListInput(e){
    if(e.target.tagName === 'INPUT'){
      const input = e.target
      const saveButton = input.nextElementSibling.nextElementSibling
      if( input.value.includes('*')){
        saveButton.disabled = true;
        saveButton.style.color = '#f2edf4'
        saveButton.style.backgroundColor = '#f7f7f7'
      }else{
        saveButton.disabled = false;
        saveButton.style.color = '#4904dd'
        saveButton.style.backgroundColor = '#efefef'
      }// enc checking if-else
    }//end check if it's an input
  }// enc checking checkListInput

  messageForm.addEventListener('input', checkFormInput);
  //add this listener after all buttons are clicked
  messageSection.addEventListener('input', checkListInput);

  //start From add action listener
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //select fields to log them in the console
    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const message = document.querySelector('#message').value
    console.log( `Name: ${name}\nEmail: ${email}\nMessage: ${message}`)

    //clear the input fields
    messageForm.reset()

    // make Message heading lvl 2 visible again
    messageH2.style.display = ''
    messageLink.style.display = ''
    //put list item messages in ul
    const newMessage = document.createElement('li')
    newMessage.innerHTML = `<p>${getTime()}</p><a href="mailto:${email}">${name}</a><span> wrote: ${message} </span>`

    //create Remove button
    const removeButton = document.createElement('button')
    removeButton.innerHTML = 'remove'
    removeButton.type = 'button'

    // Stretch task #2
    const editButton = document.createElement('button')
    editButton.innerHTML = 'edit'
    editButton.type = 'button'

    const myBr = document.createElement('br')
    const myHr = document.createElement('hr')
    //add them to the DOM
    newMessage.appendChild(editButton)
    newMessage.appendChild(removeButton)
    newMessage.insertBefore(myBr, editButton)
    newMessage.appendChild(myHr)
    messageList.appendChild(newMessage)

    localStorage['str'] += name + "*"
    localStorage['str'] += newMessage.innerHTML + "*"

  })// end messageFrom action listener


  //stretch Task #2
  messageList.addEventListener('click', (e) => {
    //using method bubbling check it's a button
    if(e.target.tagName === 'BUTTON'){
      const button = e.target
      const action = button.innerHTML

      const namedActions = {

        remove: () => {
          const li = button.parentNode
          const ul = li.parentNode

          ul.removeChild(li)

          /* erasing from local storage */
          //get the string and convert it to an array
          let myArr = localStorage['str'].split("*")
          let name = li.firstElementChild.nextElementSibling.textContent
          myArr.splice(myArr.indexOf(name)+ 1, 1)
          myArr.splice(myArr.indexOf(name), 1)
          localStorage['str'] = myArr.join("*")
          //check if Message list is empty to hide Message heading again
          if(messageList.children.length === 0){
            localStorage.removeItem('str')
            messageH2.style.display = 'none'
            messageLink.style.display = 'none'
          }//end changing button name
        },

        edit: () =>{
          const li = button.parentNode
          const span = li.firstElementChild.nextElementSibling.nextElementSibling
          const input = document.createElement('input')
          input.type = 'text'
          input.title = "Don't Insert asterisk: *"

          li.insertBefore(input, span)
          li.removeChild(span)

          //change from edit to save
          if(button.innerHTML === 'edit'){
            button.innerHTML = 'save'
          }//end changing button name
        },

        save: () => {

          const li = button.parentNode
          const input = li.firstElementChild.nextElementSibling.nextElementSibling

          // ensure that the input is not empty
          if(input.value.length !== 0){
          const span = document.createElement('span')
          span.innerHTML = ` wrote: ${input.value} `


          //changing time to last edited:
          const myPara = li.firstElementChild
          myPara.innerHTML = `${getTime()} (Last Edited)`

          li.insertBefore(span, input)
          li.removeChild(input)

          //change from save to edit
          if(button.innerHTML === 'save'){
            button.innerHTML = 'edit'
          }//end changing button name

          /* editing from local storage */
          let myArr = localStorage['str'].split("*")
          let name = li.firstElementChild.nextElementSibling.textContent
          myArr[myArr.indexOf(name) + 1] = li.innerHTML
          localStorage['str'] = myArr.join("*")
        }else{
          //alert that input cannot be empty
          alert('Input cannot be empty')
        }

        }// end save
      }// end Object
      namedActions[action]();// run the function

    }// end checking if it's a button
  })// end messageList add action listener

  /*
   Code for Assignment 6.2 Week 07/07
   */
   function fetchData(url){
     return fetch(url)
            .then(checkStatus)
            .then(result => result.json())
            .then(showRepos)
            .catch(error => alert('Looks like there was a problem connecting to Github'))
   }

    function checkStatus(response){
      if(response.ok){
        return Promise.resolve(response)
      }else{
        return Promise.reject()
      }
    }

    function showRepos(repositories){
      const projectSection = document.querySelector("#projects")
      const projectList = projectSection.querySelector("ul")
      //got through every repo with foreach
      repositories.forEach(({html_url, name, created_at, language, description}) => {
        const project = document.createElement('li')

        //add links for repos and paragraphs for additional info
        project.innerHTML =
        `
        <a href="${html_url}" target="_blank" >${name}</a>
        <p>Time of Creation: ${(changeTime(created_at))}</p>
        <p>Main Language: ${language}</p>
        <p>Description: ${description}</p>
        `
        projectList.appendChild(project)
      }); // end foreach
    }

    fetchData("https://api.github.com/users/AbnerRiv/repos")

})// end DOM Content Loaded
