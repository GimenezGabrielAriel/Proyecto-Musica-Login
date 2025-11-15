import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";

const OnePlaylist = ({ listaPlaylists, setListaPlaylists, logOut }) => {
  const [person, setPerson] = useState({});
  const [playlist, setPlaylist] = useState({});
  const [error, setError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const URL = `http://localhost:8000/api/playlists/${id}`;

  const getData = () => {
    axios(URL, { headers: { token_user: localStorage.getItem("token") } })
      .then((response) => setPerson(response.data))
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (error) return <NotFound />;

    const deleteOne =()=>{
        axios.delete(URL, {headers : {token_user : localStorage.getItem("token")}}).then(
            response => {

                setListaPlaylists(listaPlaylists.filter(playlist => playlist._id != id ))
                navigate('/playlists')
            } 
        ).catch(
            e => {
                console.log(e)
                if(e.status == 406){
                    logOut()
                }
            }
        )
    }
  const updatePlaylist = () => {
    navigate(`/playlists/update/${id}`);
  };

  return (
    <div>
      <h2>Detalle de Playlist</h2>
      <p>
        <strong>Nombre:</strong> {person.name}
      </p>
      <h3>Canciones:</h3>
      <ul>
        {person.songs?.length > 0 ? (
          person.songs.map((song) => (
            <li key={song._id}>
              {song.title} — {song.artist}
            </li>
          ))
        ) : (
          <p>No hay canciones en esta playlist.</p>
        )}
      </ul>
      <button onClick={deleteOne}>Eliminar</button> |{" "}
      <button onClick={updatePlaylist}>Editar</button>
    </div>
  );
};

export default OnePlaylist;
