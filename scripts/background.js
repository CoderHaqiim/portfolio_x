window.addEventListener('resize',()=>{
    createBackground()
})

function createBackground(){
    const tiles = []
    const background = document.querySelector('#background')
    const blocks2 = document.querySelector('.blocks')

    blocks2 && blocks2.remove()

    function getBackgroundSize(){
        const width = background.clientWidth
        const height = background.clientHeight
        return ({width, height})
    }

    const createBlocks = () =>{
        const blocks = document.createElement('div')
        blocks.classList.add('blocks')

        const createBlock =()=>{
            const block = document.createElement('div')
            block.classList.add('block')
            block.style.width = `${(getBackgroundSize().width/10)-2}px`
            block.style.height = `${(getBackgroundSize().height/5)-2}px`
            return block
        }
        for(let i = 0; i < 50; i++){
            tiles.push(createBlock())
            blocks.append(createBlock())
        }
        return blocks
    }
    background && background.append(createBlocks())
}

if(innerWidth > 900){
    createBackground()
}

