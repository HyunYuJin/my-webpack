import { sum } from './math'
import './app.css'
import nyancat from './nyancat.jpg'

document.addEventListener('DOMContentLoaded', () => {
    console.log('Naver UI')
    console.log(sum(1, 2))
})

console.log(process.env.NODE_ENV) // development