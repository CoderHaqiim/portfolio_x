const canvas = document.querySelector('#myCanvas')
const ctx = canvas.getContext('2d')
const plot = document.querySelector('.particles')
const buttons = document.querySelectorAll('button')
canvas.height = innerHeight
canvas.width = innerWidth
const particlesArray = []
let hue = 10

window.addEventListener('resize',()=>{
    canvas.height = innerHeight
    canvas.width = innerWidth
})

const mouse = {
    x : undefined,
    y : undefined
}

window.addEventListener('mousemove',(e)=>{
    mouse.x = e.x
    mouse.y = e.y
    for(let i = 0; i < 10; i++){
        particlesArray.push(new Particle(4))
    }
    hue += 10
})

class Pointer{
    #ctx = ctx;
    constructor(){
        this.x = mouse.x
        this.y = mouse.y
        this.size = 10
    }
    draw(){
        this.#ctx.strokeStyle = '#000000'
        this.#ctx.lineWidth = 2
        this.#ctx.strokeRect(this.x,this.y,this.size,this.size)
    } 
}

class Particle {
    #ctx = ctx
    constructor(size){
        this.x = mouse.x
        this.y = mouse.y
        this.movementX = Math.random()*7 - 3.5
        this.movementY = Math.random()*7 - 3.5
        this.size = size
        this.color = `hsl(${hue},100%,50%)`
    }

    draw(){
        this.#ctx.fillStyle = this.color
        this.#ctx.beginPath()
        this.#ctx.arc(this.x,this.y,this.size,0,Math.PI * 2)
        this.#ctx.fill()
    }
    update(){
        this.x += this.movementX
        this.y += this.movementY
        this.size --
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    let pointer = new Pointer()
    pointer.draw()
    requestAnimationFrame(animate)
    handleParticles()
}

function handleParticles(){
    for(let i = 0; i < particlesArray.length; i++){
       particlesArray[i].draw()
       particlesArray[i].update()
       if(particlesArray[i].size < 2){
        particlesArray.splice(i,1)
    }
    }
}
animate()
















































// class Particles2{
//     constructor(effect,x,y,color){
//         this.effect = effect
//         this.x = Math.random()*this.effect.canvasWidth
//         this.y = 0
//         this.color = color
//         this.originX = x
//         this.originY = y
//         this.size = this.effect.gap
//         this.dx = 0
//         this.dy = 0
//         this.vx = 0
//         this.vy = 0
//         this.force = 0
//         this.angle = 0
//         this.distance = 0
//         this.friction = Math.random()*0.5 + 0.75
//         this.ease = Math.random()* 0.1 + 0.005
//     }
//     draw(){
//         this.effect.context.fillstyle = this.color
//         this.effect.context.fillRect(this.originX,this.originY,this.size,this.size)
//     }
//     update(){
//         this.x += (this.originX - this.x)*this.ease
//         this.y += (this.originY - this.y)*this.ease
//     }
// }

// class Effect{
//     constructor(context,canvasWidth,canvasHeight){
//         this.context = context
//         this.canvasWidth = canvasWidth
//         this.canvasHeight = canvasHeight
//         this.textX = this.canvasWidth / 2
//         this.textY = this.canvasHeight / 2
//         this.particles = []
//         this.gap = 1
//         this.mouse = {
//             radius:20000,
//             x : 0,
//             y : 0
//         }
//         window.addEventListener('mousemove',(e)=>{
//             this.mouse.x = e.x
//             this.mouse.y = e.y
//         })
//     }
//     wrapText(text){
//         this.context.strokeStyle = 'rgb(52, 51, 51)'
//         this.context.fillStyle = 'rgb(52, 51, 51)'
//         this.context.lineWidth = 20
//         this.context.font =  "200px sans-serif"
//         this.context.textAlign = 'center'
//         this.context.textBaseline = 'middle'
//         this.context.stroke()
//         this.context.lineCap = "round"
//         this.context.fill()
//         this.context.fillText(text,this.textX,this.textY)
//         this.context.strokeText(text,this.textX,this.textY)
//         this.convertToParticles()
//     }
//     convertToParticles(){
//         this.particles = []
//         const pixels = this.context.getImageData(0,0,this.canvasWidth,this.canvasHeight)
//         const data = pixels.data
//         this.context.clearRect(0,0,this.canvasWidth,this.canvasHeight)
//         for(let y = 0; y < this.canvasHeight; y += this.gap){
//             for(let x = 0; x < this.canvasWidth; x += this.gap){
//                 const index = (y * this.canvasWidth + x) * 4
//                 const alpha = data[index + 3]
//                 if(alpha > 0){
//                     const red = data[index]
//                     const green = data[index + 1];
//                     const blue = data[index + 2];
//                     const color = `rgb(${red},${green},${blue})`;
//                     this.particles.push(new Particles2(this,x,y,color))
//                 }
//             }
//         }
//     }
//     render(){
//         this.particles.forEach(particle => {
//             particle.update()
//             particle.draw()
//         })
//     }
// }

// let effect = new Effect(ctx2, canvas2.width,canvas2.height)
// effect.wrapText("HQ")
// effect.render()

// function animate2(){
//     ctx2.clearRect(0,0,canvas2.width,canvas2.height)
//     effect.render()
//     requestAnimationFrame(animate2)
// }
// animate2()