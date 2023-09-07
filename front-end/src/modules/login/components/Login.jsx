import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../../store/actions";

const Login= (props) => {

    const [personalInfo, setPersonalInfo] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        setPersonalInfo((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(props.type == "Login") {
            navigate("/register");
            dispatch(validateUser(personalInfo));
        } else {
            navigate("/login");
        }
    }

    return(
        <div>
            <h1>{props.type} Page</h1>
            <form onSubmit={handleSubmit}>
                <input name="firstName" type="text" placeholder="First Name" onChange={changeHandler}/>
                <br/>
                <br/>
                <input name="LastName" type="text" placeholder="Last Name" onChange={changeHandler}/>
                <br/>
                <br/>
                <input name="email" type="text" placeholder="Email Address" onChange={changeHandler}/>
                <br/>
                <br/>
                <input type="submit" value={props.type}/>
            </form>
        </div>
    );
}
export default Login;