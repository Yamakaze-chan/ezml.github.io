/********************************
Const and variables
********************************/

var validImageTypes=['png','jpeg','jfif','jpg'], //valid types of images
    imageList=[], //to store uploaded images
    canvasIndex=0; //to count number of Canvas items

var Canvaselement = document.getElementById('canvasList');
var CanvaspositionInfo = Canvaselement.getBoundingClientRect();
var Canvasheight = CanvaspositionInfo.height;
var Canvaswidth = CanvaspositionInfo.width;

// Initiate canvas state
var state={
    isDragging:false,
    dragId:null
  }

// Distance to the left and top of Canvas
var extraPosition=document.getElementById('canvasList').getBoundingClientRect(),
    extraLeft=extraPosition.left,
    extraTop=extraPosition.top;

/********************************
Uploading images and text
********************************/

//Read uploaded image
function upload(){
  var file=document.getElementById('fileInput').files[0],
      nameArray=file.name.split(".");

  //check if valid file input
  if (validImageTypes.indexOf(nameArray[nameArray.length-1])===-1){
    alert('This file is not valid. Please upload "PNG" or "JPEG" files only!')
    return;
  }

  // read file and pass result to add Icon
  var fileName=nameArray.join(""),
      reader = new FileReader();
  reader.onload = (e) => {
    addIcon(e.target.result,fileName); //add icon
  };
  reader.readAsDataURL(file);

}

//Resize image
function resizeImage(image, width, height) {
    // Create a canvas element
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    // Draw the image onto the canvas
    let ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, width, height);

    // Get the resized image data
    let dataURL = canvas.toDataURL('image/jpeg');

    // Create a new image element
    let resizedImage = new Image();
    resizedImage.src = dataURL;

    return resizedImage;
}

// Add icon
function addIcon(image,fileName){

  //check if file is already added
  if (imageList.indexOf(fileName)!=-1){
    alert('This image was already added previously. Please choose another one!')
    return;
  }

  //add file to list
  imageList.push(fileName);
  
  // add new icon to iconList
  var iconList=document.getElementById('iconList'),
      newIcon=`<li><img id="${fileName}" src="${image}" class="img-rounded" onclick="addCanvas('${image}')"></li>`;

  iconList.insertAdjacentHTML('beforeend',newIcon)

}

//Add new Canvas Item 
function addCanvas(image){
  // set id of new canvas item to canvasIndex, and add to canvasList
  var id=canvasIndex,
      canvasList=document.getElementById('canvasList'),
      newCanvas=`<img style="max-height:${Canvasheight}px;
      max-width:${Canvaswidth}px; height:auto; width:auto;" class="item" id="${id}" src=${image} ondragstart="dragstart_handler(event, this.id,this.src);" draggable="true">`;
  
  canvasList.insertAdjacentHTML('beforeend',newCanvas);

  // set initial state for setting margin-left and top 
  
  var position=document.getElementById(id).getBoundingClientRect();
  
  state[id]={
    type: 'image',
    max_left: Canvaswidth-position.width,
    max_top: Canvasheight-position.height,
    left:0,
    top:0,
  }

  canvasIndex+=1;
}

// Add new text
function addText(){
  
  // get text content
  var text=prompt("Please enter your text:", "My favorite!");
  if (!text){
    return;
  }
  
  // get font-size
  var tags=['h1','h2','h3','h4','h5','h6','p'],
      tagName=prompt("Please enter one of the following tags:\n\nh1, h2, h3, h4, h5, h6, p","h3");
  
  if (tags.indexOf(tagName)===-1){
    return;
  }

  // set id of new canvas item to canvasIndex, and add to canvasList
  var id=canvasIndex,
      canvasList=document.getElementById('canvasList'),
      newCanvas=`<${tagName} class="text-block" id="${id}" ondragstart="dragstart_handler(event, this.id,this.src);" draggable="true" >${text}</${tagName}>`;
  
  canvasList.insertAdjacentHTML('beforeend',newCanvas);

  // set initial state for setting margin-left and top
  var position=document.getElementById(id).getBoundingClientRect();

  state[id]={
      type: 'text',
      max_left: Canvaswidth-position.width,
      max_top: Canvasheight-position.height,
      left:0,
      top:0
  }
  canvasIndex+=1;
}

/********************************
Drag canvas items
********************************/

// Start drag an item
function dragstart_handler(e,id,src) {
  state.isDragging=true; //change state to dragging
  state.dragId=id; //record which item is being dragged

  //record initial coordinate into state
  var x=e.clientX,
      y=e.clientY;

  state[id].xInitial=x;
  state[id].yInitial=y;

  //if canvas item is image, set ghost image (because default image is smaller than original)
  var ghostImg;
  
  if (state[id].type==="image"){

    ghostImg=document.createElement("img");
    ghostImg.style.width=Canvaswidth;
    ghostImg.style.height=Canvasheight;
    ghostImg.src=src;
    e.dataTransfer.setDragImage(ghostImg,x-state[id].left-extraLeft,y-state[id].top-extraTop);

  }
  
}

// Drag over
function dragover_handler(e) {
 e.preventDefault();
}

// Drop
function drop_handler(e) {

 e.preventDefault();

 // get which item was dropped
 var id=state.dragId,
     currentCanvas=document.getElementById(id),
     x=e.clientX,
     y=e.clientY;

 // make sure that item is not dragged out of drag zone
 state[id].left=Math.min(state[id].left + x - state[id].xInitial, state[id].max_left);
 state[id].left=Math.max(state[id].left, 0);
 state[id].top=Math.min(state[id].top + y - state[id].yInitial, state[id].max_top);
 state[id].top=Math.max(state[id].top, 0);

 // set new location for canvas item
 if (state[id].type==="text"){
currentCanvas.setAttribute('style',`margin-top:${state[id].top}px;margin-left:${state[id].left}px`);}
 else {
currentCanvas.setAttribute('style',`margin-top:${state[id].top}px;margin-left:${state[id].left}px;max-height:${Canvasheight}px;
max-width:${Canvaswidth}px; height:auto; width:auto; border-color: red;border-width: 3px;`);}

 // set state back to original
 state.isDragging=false;
 state.dragId=null;

}


/********************************
Drag to devare
********************************/

var bin=document.getElementById('bin');

function bin_dragover_handler(e) {

 e.preventDefault();
 bin.style.backgroundColor="red"; //set bin's background to red if drag item over

}

function bin_dragleave_handler(e){
 
 e.preventDefault();
 bin.style.backgroundColor="white"; //reset background color if drag out of bin

}

// if drop to bin, the item is devared from canvas
function bin_drop_handler(e) {
 
 var id=state.dragId,
     currentCanvas=document.getElementById(id);

 e.preventDefault();

 currentCanvas.parentNode.removeChild(currentCanvas);
 bin.style.backgroundColor="white";
 
 //remove item from state
 delete state[id];
}