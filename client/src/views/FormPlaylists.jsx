import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import formStyles from "../../css/formStyles.module.css"; // Asegúrate de que la ruta sea correcta

const FormPlaylist = ({ listaPlaylists, setListaPlaylists, logOut }) => {
    const [playlistName, setPlaylistName] = useState("");
    const [songs, setSongs] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get("http://localhost:8000/api/songs", { 
                headers: { token_user: token }
            })
            .then((res) => setSongs(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleSongSelect = (title) => {
        if (selectedSongs.includes(title)) {
            setSelectedSongs(selectedSongs.filter((song) => song !== title));
        } else {
            setSelectedSongs([...selectedSongs, title]);
        }
    };

    const addPlaylist = (e) => {
        e.preventDefault();
        const URL = "http://localhost:8000/api/playlists";
        const data = {
            name: playlistName,
            songs: selectedSongs,
        };
        axios
            .post(URL, data, {
                headers: { token_user: localStorage.getItem("token") },
            })
            .then((response) => {
                setListaPlaylists([...listaPlaylists, response.data]);
                navigate("/playlists");
            })
            .catch((e) => {
                if (e.status == 406) {
                    logOut();
                }
                setErrors(e.response.data.errors);
            });
    };

    return (
        <div className={formStyles.formContainer}>
            <h2>Crear nueva Playlist</h2>
            <form onSubmit={addPlaylist}>
                <div className={formStyles.formGroup}>
                    <label htmlFor="playlistName" className={formStyles.label}>Nombre de la Playlist:</label>
                    <input
                        type="text"
                        id="playlistName"
                        className={formStyles.inputField}
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                    />
                    {errors.name && <p className={formStyles.errorMessage}>{errors.name.message}</p>}
                </div>

                <h3>Selecciona las canciones:</h3>
                {songs.length > 0 ? (
                    <ul className={formStyles.songList}>
                        {songs.map((song) => (
                            <li key={song._id} className={formStyles.songItem}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedSongs.includes(song.title)}
                                        onChange={() => handleSongSelect(song.title)}
                                    />
                                    {song.title} — {song.artist}
                                </label>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay canciones disponibles.</p>
                )}

                <button type="submit" className={formStyles.submitButton}>Crear Playlist</button>
            </form>
        </div>
    );
};

export default FormPlaylist;