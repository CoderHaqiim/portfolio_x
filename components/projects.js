import Modal2 from './modal.js'
import {projects as myProjects, icons as myIcons} from './db.js'

function Project(project){
    
    const skillMap = (id) => {
        const technologies = myProjects[id].technologies
        let tech = ' '
            technologies.forEach(item =>{
                    tech += `<li class="skill">
                        <span class="icons">
                            <img src= ${item.img} alt="html_icon"></img>
                        </span>
                        <span>${item.name}</span>
                    </li>`
        })
        return tech
    }

    const showModal = (event) =>{
        const codal = document.querySelector('.codal')
        let id = event.target.id
        cover.style.display = 'flex'
        setTimeout(()=>{
            codal.innerHTML += Modal2(id,myProjects,skillMap)
       },200)
    }
    window.showModal = showModal

    return(
        `<div onclick = "showModal(event)" class="project project${project.id+1}" id="${project.id}">
                        <div class="image_icon">
                            <img src= ${project.imgurl} alt="">
                        </div>
                    </div>`
    )
}

export default Project

{/* <div class="links">
                            <button class="link" id="to_git">
                                <img src="assets/github_x2.svg" alt="">
                            </button>
                            <button class="link" id="to_site">
                                Go to live site
                            </button>
                        </div> */}