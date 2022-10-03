console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#one')
const msgTwo = document.querySelector('#two')
msgThree = document.querySelector('#first')

// msgOne.textContent= 'From JS'
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    msgThree.textContent='Loading'
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data)=>{
        if(data.error){
            return msgOne.textContent = data.error
        }
        msgOne.textContent = data.forecast
        msgTwo.textContent = data.location
    })
}) 
    
})