import  Draggable  from './Draggable'
import { useState, useEffect } from 'react'

export default function Test() {
  const [data, setData] = useState(['Test1', 'Test2'])

  useEffect(() => {
  }, [data])
    return (
        <div className="p-4">
      <div
      className="flex flex-wrap items-center justify-center gap-24"
      >
        {
          data.map((item, index) => (
            <div
            key={index}
            className="p-2"
            >
              <Draggable
              component={<h1>{item}</h1>}
              index={index}
              callBack={setData}
              />
            </div>
          ))
        }




      <div className="flex flex-wrap">
        <div className="p-2 w-full">
        </div>
        </div>
        </div>
        </div>
    )
}
