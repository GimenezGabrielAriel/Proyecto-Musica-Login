import { useState } from "react";
import { Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
import "./App.css";
import styles from ".././css/App.module.css";

import SongsApi from "./components/SongsApi";
import PlaylistsApi from "./components/PlaylistsApi";

import ListaCanciones from "./views/ListaCanciones";
import OneSong from "./views/OneSong";
import FormSongs from "./views/FormSongs";
import UpdateSongsForm from "./views/UpdateSongsForm";

import Login from "./views/Login";
import Register from "./views/Register";

import ListaPlaylists from "./views/ListaPlaylists";
import OnePlaylist from "./views/OnePlaylist";
import FormPlaylist from "./views/FormPlaylists";
import UpdatePlaylistForm from "./views/UpdatePlaylistForm";

import Home from "./views/Home";
import NotFound from "./components/NotFound";

function App() {
  const [listaSongs, setListasSongs] = useState([]);
  const [listaPlaylists, setListaPlaylists] = useState([]);

  const [login, setLogin] = useState(false);
  const [me, setMe] = useState({});
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    setLogin(false);
    navigate("/login");
  };

  return (
    <>
      {login ? (
        <>
          <div className={styles.saludo}>
            <h2>
              Hola {me.firstName} {me.lastName}
            </h2>
            <button onClick={logOut} className={styles.btn}>Log out</button>
          </div>
          <header className={styles.header}>
            <nav className={styles.navBar}>
              <Link to={"/"} className={styles.link}>
                Home
              </Link>
              <span className={styles.separator}> | </span>
              <Link to={"/songs"} className={styles.link}>
                Listado Canciones
              </Link>
              <span className={styles.separator}> | </span>
              <Link to={"/songs/new"} className={styles.link}>
                Agregar Cancion
              </Link>
              <span className={styles.separator}> | </span>
              <Link to={"/playlists"} className={styles.link}>
                Tus Playlists
              </Link>
              <span className={styles.separator}> | </span>
              <Link to={"/playlists/new"} className={styles.link}>
                Agregar Playlist
              </Link>
            </nav>
          </header>
        </>
      ) : (
        <>
          <nav className={styles.navBar}>
            <Link to={"/login"}>Login</Link> |{" "}
            <Link to={"/register"}>Registro </Link>
          </nav>
        </>
      )}

      <SongsApi
        setListasSongs={setListasSongs}
        login={login}
        setLogin={setLogin}
        setMe={setMe}
      />
      <PlaylistsApi
        setListaPlaylists={setListaPlaylists}
        login={login}
        setLogin={setLogin}
        setMe={setMe}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/songs"
          element={<ListaCanciones listaSongs={listaSongs} />}
        />
        <Route
          path="/songs/:id"
          element={
            <OneSong
              listaSongs={listaSongs}
              setListasSongs={setListasSongs}
              logOut={logOut}
            />
          }
        />
        <Route
          path="/songs/new"
          element={
            <FormSongs
              listaSongs={listaSongs}
              setListasSongs={setListasSongs}
              logOut={logOut}
              login={login}
            />
          }
        />
        <Route
          path="/songs/update/:id"
          element={
            <UpdateSongsForm
              listaSongs={listaSongs}
              setListasSongs={setListasSongs}
              logOut={logOut}
            />
          }
        />

        <Route
          path="/playlists"
          element={<ListaPlaylists listaPlaylists={listaPlaylists} />}
        />
        <Route
          path="/playlists/:id"
          element={
            <OnePlaylist
              listaPlaylists={listaPlaylists}
              setListaPlaylists={setListaPlaylists}
              logOut={logOut}
            />
          }
        />
        <Route
          path="/playlists/new"
          element={
            <FormPlaylist
              listaPlaylists={listaPlaylists}
              setListaPlaylists={setListaPlaylists}
              logOut={logOut}
            />
          }
        />
        <Route
          path="/playlists/update/:id"
          element={
            <UpdatePlaylistForm
              listaPlaylists={listaPlaylists}
              setListaPlaylists={setListaPlaylists}
              logOut={logOut}
            />
          }
        />

        <Route path="/login" element={<Login setLogin={setLogin} />} />
        <Route path="/register" element={<Register setLogin={setLogin} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
