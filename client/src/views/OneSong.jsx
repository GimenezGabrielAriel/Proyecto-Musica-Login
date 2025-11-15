import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import styles from "../../css/One.module.css"

const OneSong = ({listaSongs, setListasSongs, logOut})=> {
    const [person, setPerson] = useState({})
    const [error, setError] = useState('')
    const {id} = useParams();
    const URL = `http://localhost:8000/api/songs/${id}`
    const navigate = useNavigate();
    const getData = ()=>{
        axios(URL, {headers : {token_user : localStorage.getItem("token")}}).then(response => 
            setPerson(response.data)
        ).catch(
            e=> {
                setError(e)
                if(e.status == 406){
                    logOut()
                }
            }
        )
    }

    useEffect(()=>{
        getData()
    },[])

    if(error){
        return <NotFound/>
    }


    const deleteOne =()=>{
        axios.delete(URL, {headers : {token_user : localStorage.getItem("token")}}).then(
            response => {

                setListasSongs(listaSongs.filter(song => song._id != id ))
                navigate('/songs')
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

    const updateSong = ()=>{
        navigate(`/songs/update/${id}`)
    }

    return(
        <div className={styles.container}>
                <h2>Detalle de cancion</h2>
                <p>Title: {person.title}</p>
                <p>Artist: {person.artist}</p>
                <p>Lanzamiento: {person.yearOfRealease}</p>
                <p>Genero: {person.genre}</p>
                <div className={styles.botones}>
                    <button onClick={deleteOne} className={styles.btn}>Eliminar</button> | <button onClick={updateSong} className={styles.btn}>Editar</button>

                </div>
        </div>
    )
}

export default OneSong;