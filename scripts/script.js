

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
    console.log(current)
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


scrollDown.onclick = () =>{
   loopLocation("scrolling-down")
}
scrollUp.onclick = () =>{
    loopLocation('scrolling-up')
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
        },3000)
    }).then(()=>{
        loading.style.display = "none"
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
    body.style.overflowY = 'scroll'
    modal && (modal.style.display = 'none')
})

function slideRightEffect(bottom,element,height){
    if(bottom < (height - 50)){
        element.style.opacity ='1'
        element.style.transform = 'translateX(0px)'
    }else{
         element.style.opacity ='0'
         element.style.transform = 'translateX(-100px)'
    }
}

function scaleUpEffect(bottom,element,height){
    if(bottom < (height - 70)){
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

buttonHoverAnimation()
animateCube()
showAbout()
showProfile()
populateProjects()