import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import formStyles from "../../css/formStyles.module.css"; // Asegúrate de que la ruta sea correcta

const FormSongs = ({listaSongs, setListasSongs, logOut})=>{
    const [data, setData] = useState({
        title : "",
        artist : "",
        yearOfRealease : 0,
        genre : ""
    })
    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const updadatState = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }


    const addSong = (e) =>{
        e.preventDefault();
        const URL = 'http://localhost:8000/api/songs'
        
        axios.post(URL,data, {headers : {token_user : localStorage.getItem("token")}}).then(
            response => {
                setListasSongs([...listaSongs, response.data])
                navigate('/songs')
            }
        ).catch(
            e=> {
                if(e.status == 406){
                    logOut()
                }
                setErrors(e.response.data.errors)
            }
        )
    }

    return(
        <div className={formStyles.formContainer}>
            <h2>Agregar Nueva Canción</h2>
            <form onSubmit={(e) =>addSong(e) }>
                <div className={formStyles.formGroup}>
                    <label htmlFor="title" className={formStyles.label}>Titulo:</label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        className={formStyles.inputField}
                        value={data.title} 
                        onChange={(e)=>{ updadatState(e)}} 
                    />
                    {errors?.title  && <p className={formStyles.errorMessage}>{errors.title}</p>}
                </div>
                <div className={formStyles.formGroup}>
                    <label htmlFor="artist" className={formStyles.label}>Artista:</label>
                    <input 
                        type="text" 
                        name="artist" 
                        id="artist" 
                        className={formStyles.inputField}
                        value={data.artist}  
                        onChange={(e)=>{ updadatState(e)}}
                    />
                    {errors?.artist  && <p className={formStyles.errorMessage}>{errors.artist}</p>}
                </div>
                <div className={formStyles.formGroup}>
                    <label htmlFor="yearOfRealease" className={formStyles.label}>Lanzamiento:</label>
                    <input 
                        type="text" 
                        name="yearOfRealease" 
                        id="yearOfRealease" 
                        className={formStyles.inputField}
                        value={data.yearOfRealease}  
                        onChange={(e)=>{ updadatState(e)}}
                    />
                    {errors?.yearOfRealease  && <p className={formStyles.errorMessage}>{errors.yearOfRealease}</p>}
                </div>
                <div className={formStyles.formGroup}>
                    <label htmlFor="genre" className={formStyles.label}>Genero:</label>
                    <input 
                        type="text" 
                        name="genre" 
                        id="genre" 
                        className={formStyles.inputField}
                        value={data.genre}  
                        onChange={(e)=>{ updadatState(e)}}
                    />
                    {errors?.genre  && <p className={formStyles.errorMessage}>{errors.genre}</p>}
                </div>
                <button type="submit" className={formStyles.submitButton}>Enviar</button>
            </form>
        </div>
    )
}

export default FormSongs;