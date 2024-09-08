import Modal2 from './modal.js'
import {projects as myProjects} from './db.js'
const body = document.getElementsByTagName("body")[0]

function Project(project){
    const skillMap = (id) => {
        const technologies = myProjects[id].technologies
        let tech = ' '
            technologies.forEach(item =>{
                    tech += `<li class="skill2">
                        <span>${item.name}</span>
                    </li>`
        })
        return tech
    }

    const showModal = (event) =>{
        const codal = document.querySelector('.codal')
        let id = event.target.id
        body.style.overflowY= 'hidden'
        cover.style.display = 'flex'
        setTimeout(()=>{
            codal.innerHTML += Modal2(id,myProjects,skillMap)
       },200)
    }
    window.showModal = showModal

    return(
        `<div onclick = "showModal(event)" class="project project${project.id+1}" id="${project.id}">
                        <div class="image_icon" style="background-image:url(${project.imgUrl})"> </div>
                    </div>`
    )
}

export default Project