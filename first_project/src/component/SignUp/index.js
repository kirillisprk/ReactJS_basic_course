import {SignForm} from "../SignForm";
import {Link} from "react-router-dom";
import {signUp} from "../../services/firebase";
import {useState} from "react";

export const SignUp = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (email, password) => {
        setLoading(true);
        try {
            await signUp(email, password);
        } catch (err) {
            console.log(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const link = {
        url: "/",
        name: "Я уже зарегистрирован"
    }
    return (<>
            <SignForm onSubmit={handleSignUp} error={error} loading={loading} nameForm="Зарегистрироваться"
                      linkTo={link}/>
        </>
    )
}
