import React from 'react';
import { Route,Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import UserPage from "./pages/UserPage";
import UserPosts from "./pages/UserPosts";
import UserAlbums from "./pages/UserAlbums";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import './index.css'

function App() {
  return (
    <Provider store={store}>
      <div className="App my-16 mx-[10%] border rounded-xl p-10 shadow-xl bg-slate-50">
        <BrowserRouter>
         <Routes>
            <Route path={'/'} element={<MainPage />} />
            <Route path={'users/'} >
              <Route path={':userId/'} element={<UserPage />} />
              <Route path={':userId/posts'} element={<UserPosts />}/>
              <Route path={':userId/albums'} element={<UserAlbums />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
