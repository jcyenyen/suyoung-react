import SuMap from "./SuMap"
import SuMapBeauty from './SuMapBeauty'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// function App() {
//   return (
//    <>
//     </>
//     <Route path
//    </>
//   );
// }

// export default App;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SuMap />} />
        <Route path="beauty" element={<SuMapBeauty/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
