document.addEventListener('DOMContentLoaded', () => {
  let today = new Date()
  let thisYear = today.getFullYear()

  const footer = document.querySelector('footer')
  const copyright = document.createElement('p')
  copyright.innerHTML = `&copy; Abner Rivera ${thisYear} `
  footer.appendChild(copyright)

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

  // Stretch task #1
  const messageSection = document.querySelector('#messages')
  const messageH2 = messageSection.firstElementChild
  messageH2.style.display = 'none'

  const messageList = messageSection.querySelector('ul')
  //start From add action listener
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //select fields to log them in the console
    const name = e.target.children[2].value
    const email = e.target.children[6].value
    const message = e.target.children[11].value
    console.log( `Name: ${name}\nEmail: ${email}\nMessage: ${message}`)

    //clear the input fields
    messageForm.reset()

    // make Message heading lvl 2 visible again
    messageH2.style.display = ''

    //put list item messages in ul
    const newMessage = document.createElement('li')
    newMessage.innerHTML = `<a href="mailto:${email}">${name}</a><span> wrote: ${message} </span>`

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

          //check if Message list is empty to hide Message heading again
          if(messageList.children.length === 0){
            messageH2.style.display = 'none'
          }//end changing button name
        },

        edit: () =>{
          const li = button.parentNode
          const span = li.firstElementChild.nextElementSibling
          const input = document.createElement('input')
          input.type = 'text'

          li.insertBefore(input, span)
          li.removeChild(span)

          //do nothing
          //change from edit to save
          if(button.innerHTML === 'edit'){
            button.innerHTML = 'save'
          }//end changing button name
        },

        save: () => {
          const li = button.parentNode
          const input = li.firstElementChild.nextElementSibling
          const span = document.createElement('span')
          span.innerHTML = ` wrote: ${input.value} `

          li.insertBefore(span, input)
          li.removeChild(input)

          //change from save to edit
          if(button.innerHTML === 'save'){
            button.innerHTML = 'edit'
          }//end changing button name
        }
      }// end Object
      namedActions[action]();// run the function

    }// end checking if it's a button
  })// end messageList add action listener

})// end DOM Content Loaded
