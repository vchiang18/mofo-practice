
import  React, { useRef, useState } from 'react'

export default function Draggable (props) {

    const drag = (ev) => {
        ev.dataTransfer.setData("index", props.index);
    }

    const allowDrop = (ev) => {
        ev.preventDefault();
    }

    const drop =(ev) => {
        ev.preventDefault();
        let id = ev.target.parentElement.attributes.index.value
        let newIndex = ev.dataTransfer.getData("index")
        props.callBack((prev) => {
            [prev[id], prev[newIndex]] = [prev[newIndex], prev[id]]
            return [...prev]
        })

      }
    return (

      <div
        onDragStart={drag}
          draggable='true'
          className='bg-blue-500'
          onDrop={drop}
          onDragOver={allowDrop}
          index={props.index}>
          {props.component}
      </div>


    )






    // const [dragging, setDragging] = useState(false)
    // const [pos, setPos] = useState({x:0, y:0})
    // const [rel, setRel] = useState(null)

    // const draggableRef = useRef(null)
    // const boundingRect = draggableRef.current ? draggableRef.current.getBoundingClientRect() : null

    // const handleDrag = (e) => {
    //     if (dragging){
    //         setRel({
    //             x: e.clientX,
    //             y: e.clientY
    //         })
    //         console.log("rel", rel)
    //         if (rel > boundingRect.x && rel < boundingRect.x + boundingRect.width && rel > boundingRect.y && rel < boundingRect.y + boundingRect.height){
    //             console.log("BINGO")
    //             // setPos({
    //             //     x: rel.x - boundingRect.x,
    //             //     y: rel.y - boundingRect.y
    //             // })
    //         }
    //     }
    // }

    // const handleDragEnd = () => {
    //     setDragging(false)
    //     console.log("ref", boundingRect)
    //     console.log("rel", rel)

    //     setPos(rel)

    // }



    // return (
    //     <div
    //     ref={draggableRef}
    //     draggable='true'
    //     className='bg-blue-500 p-4 cursor-pointer'
    //     onDrag={handleDrag}
    //     onDragEnd={handleDragEnd}
    //     onDragStart={() => setDragging(true)}
    //     on>
    //             {props.component}
    //         </div>
    // )


}
