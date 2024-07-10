// import Draggable from './Draggable'
import  Draggable  from './Draggable'

export default function Test() {
    return (
        <div className="p-4">
      <div
      className="flex flex-wrap items-center justify-center gap-24"
      >

      <Draggable
      component={<h1>Test</h1>}

      />
      <div className="flex flex-wrap">
        <div className="p-2 w-full">
        </div>
        </div>
        </div>
        </div>
    )
}
