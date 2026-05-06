import { ruleBook } from "./items/ruleBook.mjs";
import { bulletin } from "./items/bulletin.mjs";
export class console {
    constructor(booth) {
        this.booth = booth;

        this.bulletin = new bulletin(this);
        this.ruleBook = new ruleBook(this);

        this.transcript = document.getElementById('transcript');
        this.transcriptOpenBox = document.getElementById('transcript-hitbox');
        this.transcriptOut = false;
    }
    addEvents() {
        //this.addDragAndDrop([this.bulletin, this.ruleBook.ruleBookOuter]);
        this.transcriptOpenBox.addEventListener('mousedown', () => {

        });
        this.transcriptOpenBox.addEventListener('mouseup', () => {

        });
    }
    addDragAndDrop(elements) {
        elements.forEach(element => {
          element.onmousedown = function(event) {
              // (1) prepare to moving: make absolute and on top by z-index
              element.style.position = 'absolute';
              element.style.zIndex = 1000;
            
              // move it out of any current parents directly into body
              // to make it positioned relative to the body
              // document.body.append(element);
            
              // centers the element at (pageX, pageY) coordinates
              function moveAt(pageX, pageY) {
                element.style.left = pageX - element.offsetWidth / 2 + 'px';
                element.style.top = pageY - element.offsetHeight / 2 + 'px';
              }
            
              // move our absolutely positioned element under the pointer
              moveAt(event.pageX, event.pageY);
            
              function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
              }
            
              // (2) move the element on mousemove
              document.addEventListener('mousemove', onMouseMove);
            
              // (3) drop the element, remove unneeded handlers
              element.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                element.onmouseup = null;
              };
          };
          element.ondragstart = function() {
              return false;
            };
        });
    }
    takeTranscriptFileOut() {
        
    }
    genTranscriptOutput() {
        
    }
}


// ball.onmousedown = function(event) {
//     // (1) prepare to moving: make absolute and on top by z-index
//     ball.style.position = 'absolute';
//     ball.style.zIndex = 1000;
  
//     // move it out of any current parents directly into body
//     // to make it positioned relative to the body
//     document.body.append(ball);
  
//     // centers the ball at (pageX, pageY) coordinates
//     function moveAt(pageX, pageY) {
//       ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
//       ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
//     }
  
//     // move our absolutely positioned ball under the pointer
//     moveAt(event.pageX, event.pageY);
  
//     function onMouseMove(event) {
//       moveAt(event.pageX, event.pageY);
//     }
  
//     // (2) move the ball on mousemove
//     document.addEventListener('mousemove', onMouseMove);
  
//     // (3) drop the ball, remove unneeded handlers
//     ball.onmouseup = function() {
//       document.removeEventListener('mousemove', onMouseMove);
//       ball.onmouseup = null;
//     };
// };
// ball.ondragstart = function() {
//     return false;
//   };



// document.addEventListener('DOMContentLoaded', () => {
//   const draggables = document.querySelectorAll('.draggable');

//   draggables.forEach(draggable => {
//     draggable.addEventListener('mousedown', (e) => {
//       const dragArea = draggable.closest('.drag-area');
//       let offsetX = e.clientX - draggable.getBoundingClientRect().left;
//       let offsetY = e.clientY - draggable.getBoundingClientRect().top;
//       draggable.style.cursor = 'grabbing';

//       const mouseMove = (e) => {
//         const rect = dragArea.getBoundingClientRect();

//         let x = e.clientX - rect.left - offsetX;
//         let y = e.clientY - rect.top - offsetY;

//         // Ensure the draggable stays within the drag area
//         x = Math.max(0, Math.min(x, rect.width - draggable.offsetWidth));
//         y = Math.max(0, Math.min(y, rect.height - draggable.offsetHeight));

//         draggable.style.left = `${x}px`;
//         draggable.style.top = `${y}px`;
//       };

//       const mouseUp = () => {
//         draggable.style.cursor = 'grab';
//         document.removeEventListener('mousemove', mouseMove);
//         document.removeEventListener('mouseup', mouseUp);
//       };

//       document.addEventListener('mousemove', mouseMove);
//       document.addEventListener('mouseup', mouseUp);
//     });
//   });
// });