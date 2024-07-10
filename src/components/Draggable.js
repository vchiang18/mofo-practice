import React, { useState, useRef, useEffect } from "react";

export default function Draggable(props) {
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const draggableRef = useRef(null);
  const containerRef = useRef(null);

  // requestAnimationFrame for smoother movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        const newX = e.clientX - draggableRef.current.offsetWidth / 2;
        const newY = e.clientY - draggableRef.current.offsetHeight / 2;
        requestAnimationFrame(() => {
          draggableRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
        });
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
      const transform = draggableRef.current.style.transform;
      const match = transform.match(/translate\((.+)px, (.+)px\)/);
      if (match) {
        setPos({
          x: parseFloat(match[1]),
          y: parseFloat(match[2]),
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  //   centers box on initial render
  useEffect(() => {
    if (draggableRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const draggableRect = draggableRef.current.getBoundingClientRect();
      setPos({
        x: (containerRect.width - draggableRect.width) / 2,
        y: (containerRect.height - draggableRect.height) / 2,
      });
      draggableRef.current.style.transform = `translate(${
        (containerRect.width - draggableRect.width) / 2
      }px, ${(containerRect.height - draggableRect.height) / 2}px)`;
    }
  }, []);

  const handleDragStart = () => {
    setDragging(true);
  };

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100vh" }}
    >
      <div
        ref={draggableRef}
        style={{
          position: "absolute",
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          transition: "transform 0.1s",
        }}
        className="bg-blue-500 p-4 cursor-pointer"
        onMouseDown={handleDragStart}
      >
        {props.component}
      </div>
    </div>
  );
}

// simple drag and drop with useEffect to manage render logic
// import React, { useState, useRef, useEffect } from "react";

// export default function Draggable(props) {
//   const [dragging, setDragging] = useState(false);
//   const [pos, setPos] = useState({ x: 500, y: 100 });
//   const [rel, setRel] = useState(null);

//   const draggableRef = useRef(null);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (dragging) {
//         setRel({
//           x: e.clientX,
//           y: e.clientY,
//         });
//       }
//     };

//     const handleMouseUp = () => {
//       setDragging(false);
//       if (rel) {
//         setPos({
//           x: rel.x - boundingRect.x,
//           y: rel.y - boundingRect.y,
//         });
//       }
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [dragging, rel]);

//   const handleDragStart = (e) => {
//     setDragging(true);
//     const boundingRect = draggableRef.current.getBoundingClientRect();
//     setRel({
//       x: e.clientX - boundingRect.left,
//       y: e.clientY - boundingRect.top,
//     });
//   };

//   const boundingRect = draggableRef.current
//     ? draggableRef.current.getBoundingClientRect()
//     : null;

//   return (
//     <div
//       ref={draggableRef}
//       style={{ position: "absolute", left: pos.x, top: pos.y }}
//       className="bg-blue-500 p-4 cursor-pointer"
//       onMouseDown={handleDragStart}
//     >
//       {props.component}
//     </div>
//   );
// }

// original code
// export default function Draggable (props) {
//     const [dragging, setDragging] = useState(false)
//     const [pos, setPos] = useState({x:0, y:0})
//     const [rel, setRel] = useState(null)

//     const draggableRef = useRef(null)
//     const boundingRect = draggableRef.current ? draggableRef.current.getBoundingClientRect() : null

//     const handleDrag = (e) => {
//         if (dragging){
//             setRel({
//                 x: e.clientX,
//                 y: e.clientY
//             })
//             console.log("rel", rel)
//             if (rel > boundingRect.x && rel < boundingRect.x + boundingRect.width && rel > boundingRect.y && rel < boundingRect.y + boundingRect.height){
//                 console.log("BINGO")
//                 // setPos({
//                 //     x: rel.x - boundingRect.x,
//                 //     y: rel.y - boundingRect.y
//                 // })
//             }
//         }
//     }

//     const handleDragEnd = () => {
//         setDragging(false)
//         console.log("ref", boundingRect)
//         console.log("rel", rel)

//         setPos(rel)

//     }

//     return (
//         <div
//         ref={draggableRef}
//         draggable='true'
//         className='bg-blue-500 p-4 cursor-pointer'
//         onDrag={handleDrag}
//         onDragEnd={handleDragEnd}
//         onDragStart={() => setDragging(true)}
//         on>
//                 {props.component}
//             </div>
//     )

// }
