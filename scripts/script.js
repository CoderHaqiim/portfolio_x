

import {projects as myProjects, icons as myIcons} from '../components/db.js'
import Project from '../components/projects.js'

const animator = document.querySelector('#animator')
const btns = document.querySelectorAll('button')
const closebtn = document.querySelector('#close1')
const profile = document.querySelector('#profile')
const cover = document.querySelector('#cover')
const modal = document.querySelector('#modal')
const about_btn = document.querySelector("#about")
const cube = document.querySelector('.cube')
const projectss = document.querySelector('.projects')
const pop = document.querySelector('#pop')
const name = document.querySelector('#sender')
const email = document.querySelector('#email')
const message = document.querySelector('#message')
const storageItems = [name,email,message]
const storage = window.localStorage
let hoverCube;

onload = () =>{
    storageItems.forEach(item =>{
        setStorage(item)
        getStorage(item,item.id)
    })
}

function setStorage(input){
    input.addEventListener('change',()=>{
        const value = input.value
        storage.setItem(input.id,value)
        console.log(storage)
    })
}

function getStorage(output,input){
    const item = storage.getItem(input)
    output.value = item 
}

cube.addEventListener('mouseover',()=>{
    hoverCube = true
})

cube.addEventListener('mouseout',()=>{
    hoverCube = false
})

function animateCube(){
    setInterval(()=>{
        if(hoverCube == false || hoverCube == undefined ){
            cube.style.animationName = 'rotate2'
            setTimeout(()=>{
                cube.style.animationName = ''
            },6000)
        }else{
            return
        }
    },20000)
}

function populateProjects(){
    myProjects.map((project) =>{
        projectss.innerHTML += Project(project)
    })
}

function showCover(){
    cover.style.display = 'flex'
    setTimeout(()=>{
         modal.style.display = 'flex'
    },200)
}

function showProfile(){
    profile.addEventListener('click',()=>{
        showCover()
    })
}
function showAbout(){
    about_btn.addEventListener('click',()=>{
        showCover()
    })
}
function buttonHoverAnimation(){
    btns.forEach(btn =>{
        btn.addEventListener('mouseenter',(e)=>{
            const client = btn.getBoundingClientRect()
            const positionX = e.x - client.left
            const positionY = e.y - client.top
            animator.style.left = `${positionX}px`
            animator.style.top = `${positionY}px`
            btn.append(animator)
            animator.style.display = 'flex'
        })
        btn.addEventListener('mouseleave',()=>{
            animator.style.display = 'none'
        })
    })
}

btns.forEach(btn =>{
    btn.addEventListener('click',()=>{
        pop.volume = 0.05
        pop.play()
        btn.style.animationName = 'clicked'
        window.setTimeout(()=>{
            btn.style.animationName = "none"
        },300)
    })
})

closebtn.addEventListener('click',()=>{
    setTimeout(()=>{
        cover.style.display = 'none'
    },200)

    modal && (modal.style.display = 'none')
})

buttonHoverAnimation()
animateCube()
showAbout()
showProfile()
populateProjects()