import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
// import Signup from './components/Signup'
import Login from './components/Login'
import Create from './components/Create'
import Blog from "./components/Blog"
import User from './components/User'
import Update from "./components/Update"


function App () {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className='pages'>
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate to="/api/v1" />}
                        />
                        <Route
                            path="/api/v1"
                            element={<Home />}    
                        />
                        <Route 
                            path='/api/v1/creator/login'
                            element={<Login />}
                        />
                        <Route 
                            path='/api/v1/create'
                            element={<Create />}
                        />
                        <Route
                            path='/api/v1/blog/:id'
                            element={<Blog />}
                        />
                        <Route
                            path='/api/v1/user/:id'
                            element={<User />}
                        />
                        <Route
                            path='api/v1/blog/:id/update'
                            element={<Update />}
                        />    
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;
