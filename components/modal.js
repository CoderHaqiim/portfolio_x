
function Modal2(id,myProjects,skillMap){
    function closeModal(){
        const modal2 = document.querySelector('.modal2')
        if(modal2){
            modal2.remove()
            setTimeout(()=>{
                cover.style.display = 'none'
            },200)
        }
    }

    function removeLoadingAnimation(){
        const loader = document.querySelector('.loader')
        loader.style.display = 'none'
    }
    
    window.closeModal = closeModal
    window.removeLoadingAnimation = removeLoadingAnimation

    return(
        `   <div class="modal2">
            <button onclick = "closeModal()" class="close">
                <img src="assets/close_icon.svg" alt="close button">
            </button>
            <div class="content">
                <h1 class="title"> ${myProjects[id].name || 'project ' + (myProjects[id].id + 1 )}</h1>
                <div class="description">
                    <div class="abt_project">
                        <h2 class="tiptip">Description</h2>
                        <p>
                           ${myProjects[id].description}
                        </p>
                    </div>
                    <div class="frame">
                        <div class="loader">
                            <div id = "load">
                                <img src="assets/loading.svg" alt="process icon"></img>
                            </div>
                        </div>
                        <iframe onload = "removeLoadingAnimation()" id ='frame1' src="https://jayehaqiim.netlify.app" frameborder="0"></iframe>
                    </div>
                </div>

                <div class="technologies">
                    <h2 class="tiptip">Technologies Used</h2>
                    <ul id='skilled'>
                        ${skillMap(id)}
                    </ul>
                </div>
            </div>
        </div>`
    )
}

export default Modal2