"use strict";

import {projects as myProjects} from '../components/db.js'
import Project from '../components/projects.js'

//Accessing elements
const btns = document.querySelectorAll('button')
const cover = document.querySelector('#cover')
const modal = document.querySelector('#modal')
const aboutBtn = document.querySelector("#about")
const cube = document.querySelector('.cube')
const projectss = document.querySelector('.projects')
const name = document.querySelector('#sender')
const email = document.querySelector('#email')
const message = document.querySelector('#message')
const headers = document.querySelectorAll(".headers")
const skills = document.querySelectorAll(".skill")
const scrollUp = document.querySelector("#scroll-up")
const scrollDown = document.querySelector("#scroll-down")
const pagesLink = document.querySelectorAll(".pageid")
const loadingPage = document.querySelector("#loading")
const storage = window.localStorage
const body = document.getElementsByTagName('body')[0]
const menuBtn = document.querySelector(".menu-btn")
const menu = document.querySelector(".menu")
const togglebar = document.querySelector('.togglebar')
const knob = document.querySelector('.knob')
const menuDots = document.querySelectorAll(".menu-dot")
const moon = document.querySelector(".moon-item")
const cloud = document.querySelector(".cloud")
const logos = document.querySelectorAll(".logo-img")
const ray = document.querySelector(".ray")
const hum = document.querySelector("#hum")
const soundConfirmBtns = document.querySelectorAll(".tune-toggle")

//Working global variables
let selectedTheme = storage.getItem("selectedTheme")
let soundIsOn
let hoverCube;
let current = 0;
menu.isOpen = false
const [dotOne, dotTwo, dotThree] = menuDots
const formItems = [name,email,message]

//Function declarations

//Form input storage
window.onload = () =>{ 
    formItems.forEach(item =>{
        setFormInputToStorage(item)
        getFormInputFromStorage(item,item.id)
    })
}

function setFormInputToStorage(input){          /*Refs: 50 */
    input.addEventListener('change',()=>{
        const value = input.value
        storage.setItem(input.id,value)
    })
}

function getFormInputFromStorage(output,input){     /*Refs: 51 */
    const item = storage.getItem(input)
    output.value = item 
}
//


//Theme
const myThemes= {
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

function makeLightTheme (){     /*Refs: 112, 119 */
    selectedTheme = "light"
    cloud.style.animationName = "half-moon"
    innerWidth < 800 ? ray.style.animationName = "dim" : ray.style.animationName = "dim2"
    changeTheme(selectedTheme)
}

function makeDarkTheme (){           /*Refs: 110, 119 */
    cloud.style.animationName = "full-moon"
    innerWidth < 800 ? ray.style.animationName = "shine" : ray.style.animationName = "shine2"
    selectedTheme = "dark"
    changeTheme(selectedTheme)
}

function themeToggleAnimation(){         /*Refs: 402 */
    moon.onclick = () =>{
        if(selectedTheme === "light"){
           makeDarkTheme()
        }else{
           makeLightTheme()
        }
        storage.setItem("selectedTheme",selectedTheme)
    }
}

function implementThemeOnLoad(){         /*Refs: 401 */
    selectedTheme === "light"? makeLightTheme() : makeDarkTheme()
}

function setVariableTemplate(item1, item2){     /*Refs: 129*/
    const root = document.documentElement
    root.style.setProperty(item1,item2)
} 

function assignCssVariableToRoot(theme){        /*Refs: 148, 152, 156*/
    Object.entries(theme).forEach(([key,value])=>{
        setVariableTemplate(key,value)
    })
}

function changeLogoTheme(){         /*Refs: 149, 153 */
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

function changeTheme(){             /*Refs: 97, 104 */
    switch(selectedTheme){
        case "light" : (()=>{
            assignCssVariableToRoot(myThemes.light)
            changeLogoTheme()
        })(); break;
        case "dark" : (()=>{
            assignCssVariableToRoot(myThemes.dark)
            changeLogoTheme()
        })(); break;
        default: (()=>{
            assignCssVariableToRoot(myThemes.light)
        })()
    }
}
//


//Sound
function setBackgroundSound(){          /*Refs: 409 */
    const confirm = document.querySelector(".confirm")

    soundConfirmBtns.forEach(item =>{
        item.onclick = () =>{
            item.id === "yes"? (()=>{turnSoundOn(); playSound()})(): turnSoundOff()
            
            confirm.style.display = "none"

            setTimeout(()=>{
                loadingPage.style.opacity = "0";
                setTimeout(()=>{
                    loadingPage.style.display = "none"
                },1200)
            },1000)
        }
    })
}

function turnSoundOn(){         /*Refs: 169, 195 */
    soundIsOn = true
    innerWidth < 800? knob.style.animationName = "knobRight": knob.style.animationName = "knobRight2"
}
function turnSoundOff(){        /*Refs: 169, 195 */
    soundIsOn = false
    innerWidth < 800? knob.style.animationName = "knobLeft": knob.style.animationName = "knobLeft2" 
}


function toggleBackgroundSound (){      /*Refs: 407 */
    togglebar.onclick=()=>{
        soundIsOn ? turnSoundOff() : turnSoundOn()
        playSound()
    }
}

function playSound(){       /*Refs: 169, 196*/
    hum.volume = 0.09
    console.log({hum})
    !hum.paused? hum.pause(): hum.play()
    hum.onended = () =>{
        hum.play()
    }
}
//


//Scrolling & pagination
pagesLink.forEach((pageLink, index)=>{
    pageLink.onclick = () =>{
        current = index
    }
})

function changePage(direction){         /*Refs: 233, 236 */
    const pages = ["#section1","#section2","#section3","#section4"]
    if(direction === "scrolling-down"){
        current < 3 ? current++ : current = 3
    }else{
        current > 0 ? current-- : current = 0
    }

    let currentPage = pages[current]
    scrollDown.href = currentPage
    scrollUp.href = currentPage
}

if(scrollDown){
    scrollDown.onclick = () =>{
        changePage("scrolling-down")
     }
     scrollUp.onclick = () =>{
        changePage('scrolling-up')
    }
}
//


//Animating cube
cube.addEventListener('mouseover',()=>{
    hoverCube = true
})

cube.addEventListener('mouseout',()=>{
    hoverCube = false
})

function animateCube(){         /*Refs: 404 */
    setInterval(()=>{
        if(hoverCube == false || hoverCube == undefined ){
            cube.style.animationName = 'rotate2'
            setTimeout(()=>{
                cube.style.animationName =''
            },6000)
        }else{
            return
        }
    },10000)
}
//


//General buttons
function showAbout(){           /*Refs: 405 */
    aboutBtn.addEventListener('click',()=>{
        showCover()
    })
}

function buttonHoverAnimation(){        /*Refs: 403 */
    const animator = document.querySelector('#animator')
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
        const pop = new Audio()
        pop.src = "assets/pop.mp3"
        pop.volume = 0.05
        pop.play()
        btn.style.animationName = 'clicked'
        window.setTimeout(()=>{
            btn.style.animationName = "none"
        },300)
    })
})

function closeModal(){          /*Refs: 408 */
    const closeBtn = document.querySelector('#close1')
    closeBtn.addEventListener('click',()=>{
        setTimeout(()=>{
            cover.style.display = 'none'
        },200)
        body.style.overflowY = 'scroll'
        modal && (modal.style.display = 'none')
    })
}
//

//Scroll Animations
function observer(element,func){        /*Refs: 350, 354*/
    let height = window.innerHeight
    addEventListener('scroll', function scrollListener(){
        // let top = element.getBoundingClientRect().top
        let bottom = element.getBoundingClientRect().bottom
        let right = element.getBoundingClientRect().right
        let left = element.getBoundingClientRect(). left
        
        func(bottom,element,height,left,right)
    })
}

function slideRightEffect(bottom,element,height){       /*Refs: 350 */
    if(bottom < (height)){
        element.style.opacity ='1'
        element.style.transform = 'translateX(0px)'
    }else{
         element.style.opacity ='0'
         element.style.transform = 'translateX(-100px)'
    }
}

function scaleUpEffect(bottom,element,height){      /*Refs: 354 */
    if(bottom < (height)){
        element.style.opacity ='1'
        element.style.transform = 'scale(1)'
    }else{
         element.style.opacity ='0'
         element.style.transform = 'scale(0.5)'
    }
}

headers.forEach(header =>{
    observer(header,slideRightEffect)
})

skills.forEach(skill=>{
    observer(skill,scaleUpEffect)
})
//

//Menu and menubar
function toggleMenubar(){       /*Refs: 375*/
    if(!menu.isOpen){
        menu.style.display = "flex"
        menu.isOpen = true
        menuDotsAnimation(dotOne,dotTwo,dotThree,"10px","18px")
    }else{
        menu.style.display = "none"
        menu.isOpen = false

        innerWidth < 800 ? 
        menuDotsAnimation(dotOne,dotTwo,dotThree,"6px","6px"):
        menuDotsAnimation(dotOne,dotTwo,dotThree,"4px","4px")
    }
}

menuBtn.onclick = () =>{
    toggleMenubar()
}

function menuDotsAnimation(elem1,elem2,elem3,size1,size2){
    elem1.style.width = size1
    elem2.style.width = size2
    elem3.style.width = size1
}
//


function showCover(){
    cover.style.display = 'flex'        /*Refs: 269 */
    body.style.overflowY = 'hidden'
    setTimeout(()=>{
         modal.style.display = 'flex'
    },200)
}

//Projects data
function populateProjects(){        /*Refs: 406 */
    myProjects.map((project) =>{
        projectss.innerHTML += Project(project)
    })
}

//Function initializations
implementThemeOnLoad()
themeToggleAnimation()
buttonHoverAnimation()
animateCube()
showAbout()
populateProjects()
toggleBackgroundSound()
closeModal()
setBackgroundSound()