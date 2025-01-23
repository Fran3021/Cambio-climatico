import './style.css'

let navHeader = document.querySelector('nav.menu-header')
let buttonDesplegable = document.querySelector('button.menu-desplegable')

buttonDesplegable.addEventListener('click', () =>{
    navHeader.classList.toggle('block')
})