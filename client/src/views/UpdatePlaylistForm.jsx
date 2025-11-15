import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import formStyles from "../../css/formStyles.module.css"; 

const UpdatePlaylistForm = ({ listaPlaylists, setListaPlaylists, logOut }) => {
    const [playlistName, setPlaylistName] = useState("");
    const [allSongs, setAllSongs] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]); 
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    const index = listaPlaylists.findIndex((pl) => pl._id == id);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get("http://localhost:8000/api/songs",{ 
                headers: { token_user: token }})
            .then((res) => setAllSongs(res.data))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        const found = listaPlaylists.find((pl) => pl._id == id);
        if (found) {
            setPlaylistName(found.name);
            setSelectedSongs(found.songs.map((s) => s.title)); 
        }
    }, [listaPlaylists, id]);

    const toggleSong = (songTitle) => { 
        if (selectedSongs.includes(songTitle)) {
            setSelectedSongs(selectedSongs.filter((title) => title !== songTitle));
        } else {
            setSelectedSongs([...selectedSongs, songTitle]);
        }
    };

    const updatePlaylist = (e) => {
        e.preventDefault();

        const data = {
            name: playlistName,
            songs: selectedSongs, 
        };

        const URL = `http://localhost:8000/api/playlists/${id}`;

        axios.put(URL,data,{headers : {token_user : localStorage.getItem("token")}}).then(
        response => {
            const updatedList = [...listaPlaylists];
            updatedList[index] = response.data;
            setListaPlaylists(updatedList);

            navigate(`/playlists/${id}`);
            })
            .catch((err) => {
                setErrors(err.response?.data?.errors || {}); 
            });
    };

    return (
        <div className={formStyles.formContainer}>
            <h2>Editar Playlist</h2>
            <form onSubmit={updatePlaylist}>

                <div className={formStyles.formGroup}>
                    <label className={formStyles.label}>Nombre:</label>
                    <input
                        type="text"
                        className={formStyles.inputField}
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                    />
                    {errors.name && <p className={formStyles.errorMessage}>{errors.name.message}</p>}
                </div>

                <h3>Canciones disponibles</h3>
                <ul className={formStyles.songList}>
                    {allSongs.map((song) => (
                        <li key={song._id} className={formStyles.songItem}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedSongs.includes(song.title)}
                                    onChange={() => toggleSong(song.title)}
                                />
                                {song.title} — {song.artist}
                            </label>
                        </li>
                    ))}
                </ul>

                <button type="submit" className={formStyles.submitButton}>Guardar cambios</button>
            </form>
        </div>
    );
};

export default UpdatePlaylistForm;