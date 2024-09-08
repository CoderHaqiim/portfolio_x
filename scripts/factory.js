// function selectTheme(){
//     let theme = "snow wolf"
//     themes.forEach(item =>{
//         item.onclick = () =>{
//             themes.forEach(theme =>{
//                 theme.classList.contains('selected-theme') && theme.classList.remove("selected-theme")
//             })

//            item.classList.add("selected-theme")
//            theme = item.id
//            changeTheme(theme)
//         }
//     })
// }



// function setVariable(item1, item2){
//     root.style.setProperty(item1,item2)
// }

// const mythemes= {
//   snowWolf:{
//     "--light":"#ffffff",
//     "--light2":"#eaecec",
//     "--light3":"#cecaca",
//     "--color4":"rgb(133, 131, 131)",
//     "--color5":"#343333",
//     "--accent": "#2270ca",
//     "--accent2":"#76b3f9a5",
//     "--accent_l": "#76b3f91c",
//   },
//   sandDune:{
//     "--light":"#f7e0ba",
//     "--light2":"#eaecec",
//     "--light3":"#cecaca",
//     "--color4":"rgb(133, 131, 131)",
//     "--color5":"#343333",
//     "--accent": "#ff6600",
//     "--accent2":"#76b3f9a5",
//     "--accent_l": "#76b3f91c",
//   },
//   darkChocolate:{
//     "--light":"#ffffff",
//     "--light2":"#eaecec",
//     "--light3":"#cecaca",
//     "--color4":"rgb(133, 131, 131)",
//     "--color5":"#343333",
//     "--accent": "#2270ca",
//     "--accent2":"#76b3f9a5",
//     "--accent_l": "#76b3f91c",
//   }
// }

// function changeTheme(theme){
//     switch(theme){
//         case "snow wolf": (()=>{
//             setVariable("--light","#ffffff")
//             setVariable("--accent","#2270ca")
//         })(); break;
//         case "sand dune": (()=>{
//             setVariable("--accent","#ff6600")
//             setVariable("--light","#fcf7ee")
//             setVariable("--light2","#faebb5")
//             setVariable("--accent2","#ff6600a5")
//             setVariable("--color2","#f5dc83")
//         })(); break;
//         case "dark chocolate": (()=>{})(); break;
//         default :
//     }
// }

// function showProfile(){
//     profile.addEventListener('click',()=>{
//         showCover()
//     })
// }

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