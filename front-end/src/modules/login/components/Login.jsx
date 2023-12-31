import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser, signUpUser} from "../../../redux/user/userActions"
import { useSelector, useDispatch } from "react-redux";
import { userLoginFailed, userSignup} from "../../../redux/user/userSlice";



const Login= (props) => {

    const [personalInfo, setPersonalInfo] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLoginFailedState = useSelector(state => state.user.userLoginFailed);
    const isUserLoggedIn = useSelector(state => state.user.isUserLoggedIn);

    useEffect(() => {
        if(isUserLoggedIn) {
            navigate("/register");
        }
    },[isUserLoggedIn]);

    const changeHandler = (e) => {
        setPersonalInfo((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(validateUser(personalInfo));
    }

    const handleRegisterClick = () => {
        navigate("/signup");
    }

    return(
        <div>
            <h1>Login Page</h1>
            <hr/>
            <form onSubmit={handleSubmit}>
                <br/>
                <input name="email" type="text" placeholder="Email Address" onChange={changeHandler}/>
                <br/>
                <br/>
            { (!userLoginFailedState) 
                &&  <input type="submit" value={props.type}/>}
            </form>

            { userLoginFailedState && <div>
                <p>User does not exist, please sign up</p>
                <button onClick={handleRegisterClick}>Sign Up</button>
                </div>
                }
        </div>
    );
}
export default Login;