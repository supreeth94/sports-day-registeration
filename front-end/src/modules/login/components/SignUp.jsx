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
    const userSignupFailedState = useSelector(state => state.user.userSignupFailed);
    const isUsersignedUp = useSelector(state => state.user.userSignupSuccess);

    useEffect(() => {
        if(isUsersignedUp) {
            navigate("/login");
        }
    },[isUsersignedUp]);

    const changeHandler = (e) => {
        setPersonalInfo((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signUpUser(personalInfo));
    }

    const handleLoginClick = () => {
        navigate("/login");
    }

    return(
        <div>
            <h1>Sign Up Page</h1>
            <hr/>
            <br/>
            <form onSubmit={handleSubmit}>
                <input name="firstName" type="text" placeholder="First Name" onChange={changeHandler}/>
                <br/>
                <br/>
                <input name="lastName" type="text" placeholder="Last Name" onChange={changeHandler}/>
                <br/>
                <br/>
                <input name="email" type="text" placeholder="Email Address" onChange={changeHandler}/>
                <br/>
                <br/>
            { !userSignupFailedState
                &&  <input type="submit" value={props.type}/>}
            </form>

            { userSignupFailedState && <div>
            <p>User already exists, please login instead</p>
            <button onClick={handleLoginClick}>Login</button>
            </div>}
        </div>
    );
}
export default Login;