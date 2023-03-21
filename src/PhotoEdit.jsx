import React,{useState,useEffect} from 'react'
import blurimg from "./images/blur.png"
import brightnss from "./images/brightnss.png"
import contrast from "./images/contrast.png"
import invert from "./images/invert.png"
import opactiy from "./images/opactiy.png"
import flip from "./images/flip.png"
import rotateleft from "./images/rotateleft.png"
import rotateright from "./images/rotateright.png"

const PhotoEdit = () => {
  const [inputval, setinputval] = useState({
    brightness : 100,
    contrast : 100,
    saturate : 100,
    invert : 0,
    blur : 1

  })
const [rangeTitle, setrangeTitle] = useState({
  title : 'brightness',
  num : 100
})
  let selectImginput
  let image
let brightness = 100
let filter_name

  
//   filter_name = document.getElementById("filter_name")
//   let filter_buttons = document.querySelectorAll(".icons_room button");
// let range = document.querySelectorAll(".range")
//   filter_buttons.forEach((e,id)=>{
      
//     e?.addEventListener("click", () => {
//       document.querySelector(".active")?.classList.remove("active");
//       document.querySelector(".show")?.classList.remove("show");
//       e.classList.add("active");
//        range[id]?.classList.add("show");
       
//        rangeTitle = e.id 
//        console.log(inputval.rangeTitle)
//       if (e.id === "brightness") {
//         // range.max = "200";
//         // setinputval(brightness)
//       }

//     })
  
  
//     })
 
// const randomfloat = () =>{
//   let floatdiv = document.querySelector(".img-float")
//   let float2 = document.querySelector(".float2")
//   let float3 = document.querySelector(".float3")

//     // console.log(floatdiv)
//     floatdiv.style.left = Math.floor( Math.random() * 100) + "%"
//     floatdiv.style.top = Math.floor( Math.random() * 100) + "%"
//     float2.style.left = Math.floor( Math.random() * 100) + "%"
//     float2.style.top = Math.floor( Math.random() * 100) + "%"   
//     float3.style.left = Math.floor( Math.random() * 100) + "%"
//     float3.style.top = Math.floor( Math.random() * 100) + "%"

//   // console.log(Math.floor( Math.random() * 500))
//   console.log(Math.floor( Math.random() * 100))
// }
// setInterval(()=>{
//   randomfloat()
// },7000)

const selectbtn = (i) =>{
  let filter_buttons = document.querySelectorAll(".icons_room button");
   let range = document.querySelectorAll(".range")
  document.querySelector(".active")?.classList.remove("active");
      document.querySelector(".show")?.classList.remove("show");
      filter_buttons[i].classList.add("active");
       range[i]?.classList.add("show");
let temptitle = filter_buttons[i].id
       setrangeTitle((perv) => ({...perv, title :  temptitle, num : inputval[filter_buttons[i].id]})) 
  
}

const imagechange = ()=>{
  selectImginput =  document.getElementById('selectImg')
  image = document.getElementById("image")
  let file = selectImginput.files[0];
  if (!file) return;
  image.src = URL.createObjectURL(file);
if(file){
  document.querySelector(".controlls-area").classList.remove("disable")
}


}








const getphoto =  () => {
  selectImginput =  document.getElementById('selectImg')
  selectImginput.click()

  }

  const changInput = (e) =>{
    image = document.getElementById("image")
  setinputval((perv) => ({...perv, [e.target.name]:e.target.value}))
  setrangeTitle((perv) => ({...perv, num : e.target.value})) 
   image.style.filter = `brightness(${inputval.brightness}%) contrast(${inputval.contrast}%) saturate(${inputval.saturate}%) invert(${inputval.invert}%) blur(${inputval.blur}px)`;
  
  }

  let rotate = 0
let flip_x = 1
let flip_y = 1
const rotate_btns = (prems) => {
  console.log(prems)
  image = document.getElementById("image")

    if (prems === "rotate_left") {
      rotate -= 90;
    } else if (prems === "rotate_right") {
      rotate += 90;
    } else if (prems === "flip_x") {
      flip_x = flip_x === 1 ? -1 : 1;
    } else if (prems === "flip_y") {
      flip_y = flip_y === 1 ? -1 : 1;
    }
console.log(rotate)
    image.style.transform = `rotate(${rotate}deg) scale(${flip_x}, ${flip_y})`;


};

const resetbtn = () =>{
  let filter_buttons = document.getElementById("brightness");
  image = document.getElementById("image")
setinputval({
  brightness : 100,
  contrast : 100,
  saturate : 100,
  invert : 0,
  blur : 1

})
document.querySelector(".active")?.classList.remove("active");
filter_buttons.classList.add("active")
setrangeTitle({  title : 'brightness',
num : 100})
  rotate = 0;
  flip_x = 1;
  flip_y = 1;
  image.style.transform = `rotate(${rotate}deg) scale(${flip_x}, ${flip_y})`;
  image.style.filter = `brightness(${inputval.brightness}%) contrast(${inputval.contrast}%) saturate(${inputval.saturate}%) invert(${inputval.invert}%) blur(${inputval.blur}px)`;
}
const saveimg = () =>{
  image = document.getElementById("image")
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = image.naturalWidth-5;
  canvas.height = image.naturalHeight;
  ctx.filter = `brightness(${inputval.brightness}%) contrast(${inputval.contrast}%) saturate(${inputval.saturate}%) invert(${inputval.invert}%) blur(${inputval.blur}px)`;
  // ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(flip_x, flip_y );
  ctx.rotate(Math.PI / 180 * (rotate));
  ctx.drawImage(
    image,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  link.click();
}
  return (
<main>
  <div className='circle'></div>
  {/* <div className='img-float'><img src='/images/watercolor.png' alt='nothing'></img></div>
  <div className='img-float float2'><img src='/images/paintbrush.png' alt='nothing'></img></div>
  <div className='img-float float3'><img src='/images/popsicle.png' alt='nothing'></img></div> */}
<div className='sub-main'>
  <div className='controlls-area disable'>
<div className='heading'> 
<h1>beautyPlus
    <span>beautyPlus Photo Editor</span>
  </h1></div>
<div className='sub-controls '>

  <div className='Filters-control '>
  <h3>Filters</h3>
  <div class="icons_room">
          <button title="brightness" id="brightness" class="active" onClick={()=>selectbtn(0)}>
            <img src={brightnss} alt="" />
          </button>
          <button title="contrast" id="contrast"onClick={()=>selectbtn(1)}>
            <img src={contrast} alt="" />
          </button>
          <button title="saturate" id="saturate" onClick={()=>selectbtn(2)}>
            <img src={opactiy} alt="" />
          </button>
          <button title="invert" id="invert" onClick={()=>selectbtn(3)}>
            <img src={invert} alt="" />
          </button>
          <button title="blur" id="blur" onClick={()=>selectbtn(4)}>
            <img src={blurimg} alt="d" />
          </button>
        </div>
  </div>
  <div className='range-control'>
  <div className='select-btn'><div id='filter_name'>{rangeTitle.title}</div><div>{rangeTitle.num}% </div></div>

    <input type="range" id='range' name="brightness" className='range show' max='200'  value={inputval.brightness} onChange={(e)=> changInput(e)}/>
    <input type="range" id='range' name='contrast' className='range' max='200' value={inputval.contrast} onChange={(e)=> changInput(e)}/>
    <input type="range" id='range' name='saturate' className='range' max='200' value={inputval.saturate} onChange={(e)=> changInput(e)}/>
    <input type="range" id='range' name='invert' className='range' max='200' value={inputval.invert} onChange={(e)=> changInput(e)}/>
    <input type="range" id='range' name='blur' className='range' max='10' value={inputval.blur} onChange={(e)=> changInput(e)}/>
  </div>
  <div className='other-controls-main'>
  <h3>Rotate & Flip</h3>
  <div className='other-controls'>

  <button title="rotate left" id="rotate_left"><img src={rotateleft} alt="" onClick={()=>rotate_btns('rotate_left')}/></button>
          <button title="rotate right" id="rotate_right"><img  src={rotateright} alt="" onClick={()=>rotate_btns('rotate_right')} /></button>
          <button title="flip x" id="flip_x"><img src={flip} alt="" onClick={()=>rotate_btns('flip_x')}/></button>
          <button title="flip y" id="flip_y"><img src={flip} alt="" onClick={()=>rotate_btns('flip_y')}/></button>
        </div>

</div>
<div className='controls-buttons'>
  <button className="btns" onClick={resetbtn}>Reset</button>
</div>
  </div>
  
  </div>
  <div className='photo-area'>
<div className='img-area'>
<input type="file" name="" id="selectImg" accept="image/*" onChange={imagechange}  hidden />
<img src="https://cdn.dribbble.com/users/34020/screenshots/3993396/media/de9e4cdb950d3dbf6798d100eed14442.gif" alt="" id='image'></img>
</div>
<div className='image-btns'>
  <button onClick={getphoto} className="btns">Choose Image</button>
  <button onClick={saveimg} className="btns" >Save Image</button>
</div>
  </div>
</div>
</main>
  )
}

export default PhotoEdit