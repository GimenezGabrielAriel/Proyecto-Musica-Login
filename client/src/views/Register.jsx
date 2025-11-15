import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import formStyles from "../../css/formStyles.module.css"; 


const Register = ({setLogin})=> {
    const navigate = useNavigate();
    const [state, setState] = useState({
        firstName : '',
        lastName : '',
        email : '',
        password : '',
        passwordConfirmation : '',
    })
    const [errors, setErrors] = useState({})

    const updateState = (e)=>{
        setState({...state, [e.target.name] : e.target.value})
    }

    const registerUser = (e)=>{
        e.preventDefault()
        const URL = 'http://localhost:8000/api/users/new'
        axios.post(URL,state).then(
            response => {
                localStorage.setItem("token",response.data.token)
                setLogin(true)
                setErrors({})
                navigate('/songs')
            }
        ).catch(e=> setErrors(e.response.data.errors))
    }


    return(
        <div className={formStyles.formContainer}>
            <h2>Registro de Usuario</h2>
            <form onSubmit={e=> registerUser(e)}>
                <div className={formStyles.formGroup}>
                    <label htmlFor="firstName" className={formStyles.label}>First Name:</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        id="firstName" 
                        className={formStyles.inputField}
                        value={state.firstName} 
                        onChange={(e)=> updateState(e)}
                    />
                    {errors.firstName && <p className={formStyles.errorMessage}>{errors.firstName}</p>}
                </div>
                <div className={formStyles.formGroup}>
                    <label htmlFor="lastName" className={formStyles.label}>Last Name:</label>
                    <input 
                        type="text" 
                        name="lastName" 
                        id="lastName" 
                        className={formStyles.inputField}
                        value={state.lastName} 
                        onChange={(e)=> updateState(e)}
                    />
                    {errors.lastName && <p className={formStyles.errorMessage}>{errors.lastName}</p>}
                </div>
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
                <div className={formStyles.formGroup}>
                    <label htmlFor="passwordConfirmation" className={formStyles.label}>Password Confirmation:</label>
                    <input 
                        type="password" 
                        name="passwordConfirmation" 
                        id="passwordConfirmation" 
                        className={formStyles.inputField}
                        value={state.passwordConfirmation} 
                        onChange={(e)=> updateState(e)}
                    />
                    {errors.passwordConfirmation && <p className={formStyles.errorMessage}>{errors.passwordConfirmation}</p>}
                </div>
                <button type="submit" className={formStyles.submitButton}>
                    Register
                </button>
            </form>
        </div>
    )

}


export default Register;