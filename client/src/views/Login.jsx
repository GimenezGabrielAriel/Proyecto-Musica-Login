import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import formStyles from "../../css/formStyles.module.css";

const Login = ({setLogin}) =>{
    const [state, setState] = useState({
        email : '',
        password : ''
    })
    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const updateState = (e)=>{
        setState({...state, [e.target.name] : e.target.value})
    }


    const loginProcess = (e)=>{
        e.preventDefault();
        const URL= 'http://localhost:8000/api/users/login'
        axios.post(URL,state).then(
            response => {
                localStorage.setItem("token", response.data.token)
                setLogin(true)
                setErrors({})
                navigate('/')
            }
        ).catch(e=> setErrors(e.response.data.errors))
    }

    return (
    <div className={formStyles.formContainer}>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={e => loginProcess(e)}>
            <div className={formStyles.formGroup}>
                <label htmlFor="email" className={formStyles.label}>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    className={formStyles.inputField}
                    value={state.email} 
                    onChange={(e)=> updateState(e)}
                />
                {errors.email && <p className={formStyles.errorMessage}>{errors.email}</p>}
            </div>
            <div className={formStyles.formGroup}>
                <label htmlFor="password" className={formStyles.label}>Password:</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    className={formStyles.inputField}
                    value={state.password} 
                    onChange={(e)=> updateState(e)}
                />
                {errors.password && <p className={formStyles.errorMessage}>{errors.password}</p>}
            </div>
            <button type="submit" className={formStyles.submitButton}>
                Log in
            </button>
        </form>
    </div>
    )
}

export default Login;