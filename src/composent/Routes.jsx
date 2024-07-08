import React from 'react'
import {BrowserRouter ,  Outlet,  Route, Routes} from 'react-router-dom' 
import Detail from './Detail';
import SearchFilms from './searchFilms';

function RouteURL() {
  return (<> 
   <BrowserRouter>
        <Routes>           
          <Route path='/detail/:id/:search' element={<Detail/>}/>
          <Route index path='/' element={<SearchFilms/>}/>
        </Routes>

    </BrowserRouter>
      <Outlet/>
      </>
   
  )
}

export default RouteURL