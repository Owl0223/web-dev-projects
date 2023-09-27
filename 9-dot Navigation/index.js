const nav= document.querySelector('.nav');
const cross = document.getElementById('cross')

nav.addEventListener('click', (event)=>{
    event.stopPropagation()
    nav.classList.toggle('active') 
})
cross.addEventListener('click', (event)=>{
    event.stopPropagation()
    nav.classList.remove('active')
})