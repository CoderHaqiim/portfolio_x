"use strict";


import {projects as myProjects, icons as myIcons} from '../components/db.js'
import Project from '../components/projects.js'

const root = document.documentElement
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
const header1 = document.querySelector("#header1")
const header2 = document.querySelector("#header2")
const header3 = document.querySelector("#header3")
const skills = document.querySelectorAll(".skill")
const scrollUp = document.querySelector("#scroll-up")
const scrollDown = document.querySelector("#scroll-down")
const pagesId = document.querySelectorAll(".pageid")
const storageItems = [name,email,message]
const loading = document.querySelector("#loading")
const storage = window.localStorage
const body = document.getElementsByTagName('body')[0]
const menuBtn = document.querySelector(".menu-btn")
const menu = document.querySelector(".menu")
const themes = document.querySelectorAll(".theme-container")
menu.isOpen = false
const togglebar = document.querySelector('.togglebar')
const knob = document.querySelector('.knob')
const menuDots = document.querySelectorAll(".menu-dot")
const [dotOne, dotTwo, dotThree] = menuDots
const moon = document.querySelector(".moon-item")
const cloud = document.querySelector(".cloud")
const logos = document.querySelectorAll(".logo-img")
const ray = document.querySelector(".ray")
let selectedTheme = "light"
const hum = document.querySelector("#hum")
// const musicPermission =  confirm("Would you like to enable background music on our website? You can turn it off in the menu.")
// let soundIsOn = musicPermission

// window.onclick = () =>{
//     if(soundIsOn){
//         innerWidth < 800 ? knob.style.animationName = "knobRight": knob.style.animationName = "knobRight2"
//         hum.play()
//     } else{
//           innerWidth < 800? knob.style.animationName = "knobLeft": knob.style.animationName = "knobLeft2"
//     }
// }

togglebar.onclick=()=>{
    if(soundIsOn === true){
        soundIsOn = false
    }else{
        soundIsOn = true
        innerWidth < 800 ? knob.style.animationName = "knobRight": knob.style.animationName = "knobRight2"
    }
}

function playSound(){
    hum.volume = 0.09
    hum.playing? hum.pause(): hum.play()
    hum.onended = () =>{
        hum.play()
    }
}

let hoverCube;
let current = 0;
const headers = [header1,header2,header3]

function loopLocation(direction){
    const locations = ["#section1","#section2","#section3","#section4"]
    if(direction == "scrolling-down"){
        if(current < 3 && current !== 3 ){
            current++
        }else{
            current = 3
        }
    }else{
        if(current !== 0){
            current--
        }else{
            return
        }
    }

    let currentPage = locations[current]
    scrollDown.href = currentPage
    scrollUp.href = currentPage
}

pagesId.forEach(id =>{
    id.onclick = () =>{
        if(id.id == "toHome"){
            current = 0
        }
        else if(id.id == "toProjects"){
            current = 1
        }
        else if(id.id == "toSkills"){
            current = 2
        }
        else{
            current = 3
        }
    }
})

if(scrollDown){
    scrollDown.onclick = () =>{
        loopLocation("scrolling-down")
     }
     scrollUp.onclick = () =>{
        loopLocation('scrolling-up')
    }
}

onload = () =>{ 
    storageItems.forEach(item =>{
        setStorage(item)
        getStorage(item,item.id)
    })

    const loadPromise = new Promise((resolve) => {
        setTimeout(()=>{
           resolve(
                loading.style.opacity = "0"
           )
        },10)
    }).then(()=>{
        loading.style.display = "none"
    })
}

function setStorage(input){
    input.addEventListener('change',()=>{
        const value = input.value
        storage.setItem(input.id,value)
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
    },10000)
}

function populateProjects(){
    myProjects.map((project) =>{
        projectss.innerHTML += Project(project)
    })
}

function showCover(){
    cover.style.display = 'flex'
    body.style.overflowY = 'hidden'
    setTimeout(()=>{
         modal.style.display = 'flex'
    },200)
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
    body.style.overflowY = 'scroll'
    modal && (modal.style.display = 'none')
})

function slideRightEffect(bottom,element,height){
    if(bottom < (height)){
        element.style.opacity ='1'
        element.style.transform = 'translateX(0px)'
    }else{
         element.style.opacity ='0'
         element.style.transform = 'translateX(-100px)'
    }
}

function scaleUpEffect(bottom,element,height){
    if(bottom < (height)){
        element.style.opacity ='1'
        element.style.transform = 'scale(1)'
    }else{
         element.style.opacity ='0'
         element.style.transform = 'scale(0.8)'
    }
}

function observer(element,func){
    let height = window.innerHeight
    addEventListener('scroll', function scrollListener(){
        let top = element.getBoundingClientRect().top
        let bottom = element.getBoundingClientRect().bottom
        let right = element.getBoundingClientRect().right
        let left = element.getBoundingClientRect(). left
        
        func(bottom,element,height,left,right)
    })
}

headers.forEach(header =>{
    observer(header,slideRightEffect)
})

skills.forEach(skill=>{
    observer(skill,scaleUpEffect)
})

function toggleMenuBar(){
    if(menu.isOpen === false){
        menu.style.display = "flex"
        menu.isOpen = true
        menuDotsAnimation(dotOne,dotTwo,dotThree,"10px","18px")
    }else{
        menu.style.display = "none"
        menu.isOpen = false
        if(innerWidth < 800){
            menuDotsAnimation(dotOne,dotTwo,dotThree,"6px","6px")
        }else{
            menuDotsAnimation(dotOne,dotTwo,dotThree,"4px","4px")
        }
    }
}

menuBtn.onclick = () =>{
    toggleMenuBar()
}

function menuDotsAnimation(elem1,elem2,elem3,size1,size2){
    elem1.style.width = size1
    elem2.style.width = size2
    elem3.style.width = size1
}

function themeAnimation(){
    moon.onclick = () =>{
        if(selectedTheme === "light"){
            cloud.style.animationName = "full-moon"
            innerWidth < 800 ? ray.style.animationName = "shine" : ray.style.animationName = "shine2"
            selectedTheme = "dark"
        }else{
            selectedTheme = "light"
            cloud.style.animationName = "half-moon"
            innerWidth < 800 ? ray.style.animationName = "dim" : ray.style.animationName = "dim2"
        }
        changeTheme(selectedTheme)
    }
}

const myThemes = {
    light:{
        "--light":"#ffffff",
        "--light2":"#eaecec",
        "--light3":"#cececa",
        "--color5":"#343333",
        "--accent": "#2270ca",
        "--accent2":"#76b3f9a5",
        "--footer-color":"#343333",
        "--menu-color":"#cececa"
    },
    dark:{
        "--light":"#060625",
        "--light2":"#161634",
        "--light3":"#5e5e81",
        "--color5":"#ffffffdd",
        "--accent2": "#192b3fe5",
        "--accent": "#4796f0",
        "--footer-color":"#010110",
        "--menu-color":"#131343"
    }
}

function setVariable(item1, item2){
    root.style.setProperty(item1,item2)
} 

function changeLogoTheme(){
    if(selectedTheme === "light"){
        logos.forEach(logo =>{
            logo.style.filter = "grayscale(0%) brightness(100%)"
        })
    }else{
        logos.forEach(logo =>{
            logo.style.filter = "grayscale(100%) brightness(200%)"
        })
    }
}

console.log(logos)
function changeTheme(){
    switch(selectedTheme){
        case "light" : (()=>{
            assignVariable(myThemes.light)
            changeLogoTheme()
        })(); break;
        case "dark" : (()=>{
            assignVariable(myThemes.dark)
            changeLogoTheme()
        })(); break;
        default: (()=>{
            assignVariable(myThemes.light)
        })()
    }
}
function assignVariable(theme){
    Object.entries(theme).forEach(([key,value])=>{
        setVariable(key,value)
    })
}
themeAnimation()
buttonHoverAnimation()
animateCube()
showAbout()
populateProjects()