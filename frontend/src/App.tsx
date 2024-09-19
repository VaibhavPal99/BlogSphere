import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Signup} from './pages/Signup'
import {Signin} from './pages/Signin'
import {Blog} from './pages/Blog'
import {Blogs} from './pages/Blogs'
import { Publish } from './components/Publish'


import './App.css'


function App() {
  

  return (
    <div>
      <BrowserRouter>

      <Routes>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/signin" element={<Signin></Signin>}></Route>
        <Route path="/blog/:id" element={<Blog></Blog>}></Route>
        <Route path="/blogs" element={<Blogs></Blogs>}></Route>
        <Route path="/publish" element={<Publish></Publish>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
