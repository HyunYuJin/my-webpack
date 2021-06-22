import { sum } from './math'
import './app.css'
import nyancat from './nyancat.jpg'

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `
        <img src="${nyancat}" alt="" />
    `
})

console.log(sum(1, 2))