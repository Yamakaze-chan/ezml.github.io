const draggableElements = document.querySelectorAll('.draggable');
const droppableElements = document.querySelectorAll('.droppable');
const hkPersons = document.querySelector('.hk-persons');
let draggedElement = null;
let intervalId;

draggableElements.forEach((draggable) => {
  
  draggable.addEventListener('dragstart', (e) => {
    draggedElement = draggable;
    draggable.classList.add('dragging');
    console.log('dragged');
    setTimeout(() => {
       draggable.classList.add('drag-item-transparent');
    });
  });
  
  draggable.addEventListener('dragend', () => {
    draggedElement = null;
    clearInterval(intervalId);
    draggable.classList.remove('dragging');
    draggable.classList.remove('drag-item-transparent');
  });
});

droppableElements.forEach((droppable) => {
  droppable.addEventListener('mousedown', (e) => {
    console.log(e.pageX - hkPersons.offsetLeft);
  });
  
  droppable.addEventListener('dragover', (e) => {
    // e.preventDefault();
    const nearestElement = getNearestElement(droppable, e.clientY);
    const draggable = document.querySelector('.dragging');
    // console.log(hkPersons.scrollWidth - hkPersons.offsetWidth);
    // console.log(hkPersons.clientWidth);
    if (nearestElement == null) {
      droppable.appendChild(draggable);
    } else {
      droppable.insertBefore(draggable, nearestElement);
    }
  });
  
  droppable.addEventListener('dragenter', (e) => {
    // console.log(window.innerWidth - e.pageX);
    // console.log(hkPersons.clientWidth - e.pageX);
    scrollAmount = 0;
    if ((window.innerWidth - e.pageX) < 200) {
      var slideTimer = setInterval(function() {
        hkPersons.scrollLeft += 10;
        scrollAmount += 10;
        if(scrollAmount >= 200){
          clearInterval(slideTimer);
        }
      }, 50);
    } else if ((e.pageX - hkPersons.offsetLeft) < 200 && hkPersons.scrollLeft) {
      var slideTimer = setInterval(function() {
        hkPersons.scrollLeft -= 10;
        scrollAmount += 10;
        if(scrollAmount >= 200){
          clearInterval(slideTimer);
        }
      }, 25);
    }
  });
  
  droppable.addEventListener('drop', (e) => {
    // const draggable = document.querySelector('.dragging');
    // draggable.classList.add('animate-element');
    console.log('dropped');
    isDown = false;
  });
});

function getNearestElement (container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
  
  return draggableElements.reduce((closest, draggable) => {
    const box = draggable.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: draggable };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Mouse scroll events for Housekeeping persons
// let isDown = false;
// let pageX;
// let scrollLeft;
// let clickedOverCard = false;
// hkPersons.addEventListener('mouseup', () => {
//   isDown = false;
// });

// hkPersons.addEventListener('mousedown', (e) => {
//   isDown = true;
//   pageX = e.pageX - hkPersons.offsetLeft;
//   scrollLeft = hkPersons.scrollLeft;
//   console.log(clickedOverCard);
// });

// hkPersons.addEventListener('mouseleave', () => {
//   isDown = false;
// });

// hkPersons.addEventListener('mousemove', (e) => {
//   console.log(draggedElement);
//   if (!draggedElement) return;
//   e.preventDefault();
//   let x = e.pageX - hkPersons.offsetLeft;
//   console.log(x);
//   let walk = x - pageX;
//   hkPersons.scrollLeft = scrollLeft - walk;
// });
