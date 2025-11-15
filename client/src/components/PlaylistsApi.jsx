import axios from 'axios'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'

const PlaylistsApi = ({setListaPlaylists, login, setLogin, setMe})=>{
    const navigate = useNavigate();

    const getDataPlaylists = ()=> {
        const URL = 'http://localhost:8000/api/playlists'
        axios(URL, {headers : {token_user : localStorage.getItem("token")}}).then(response => {
            setListaPlaylists(response.data)
            setLogin(true)
            setMe(jwtDecode(localStorage.getItem("token")))
        }).catch((e=> 
        {
            navigate('/login')
            setLogin(false)
        }
        ))
    }

    useEffect(()=> {
        getDataPlaylists()
    },[])

    return (
        <></>
    )

}


export default PlaylistsApi;