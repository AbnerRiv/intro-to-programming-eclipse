let today = new Date()
let thisYear = today.getFullYear()

const footer = document.querySelector('footer')

const copyright = document.createElement('p')

copyright.innerHTML = `Abner ${thisYear}`
footer.appendChild(copyright)

let skills = ['Javascript', 'HTML', 'CSS', 'Java', 'Python']

const skillsSection = document.querySelector('#skills')

const skillsList = skillsSection.querySelector('ul')

for(let skill in skills){
  let li = document.createElement('li')
  li.innerHTML = skills[skill]
  skillsList.appendChild(li)
}
