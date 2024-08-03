// import  React, { useRef, useState } from 'react'

// export default function Draggable (props) {
//     const drag = (ev) => {
//         ev.dataTransfer.setData("index", props.index);
//     }
//     const allowDrop = (ev) => {
//         ev.preventDefault();
//     }
//     const drop =(ev) => {
//         ev.preventDefault();
//         let id = ev.target.parentElement.attributes.index.value
//         let newIndex = ev.dataTransfer.getData("index")
//         props.callBack((prev) => {
//             [prev[id], prev[newIndex]] = [prev[newIndex], prev[id]]
//             return [...prev]
//         })
//       }
//     return (
//       <div
//         onDragStart={drag}
//           draggable='true'
//           className='bg-blue-500'
//           onDrop={drop}
//           onDragOver={allowDrop}
//           index={props.index}>
//           {props.component}
//       </div>
//     )
// }
