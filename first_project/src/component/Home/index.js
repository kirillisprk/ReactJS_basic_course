import React, {useState} from "react";
import {SignForm} from "../SignForm";
import {logIn} from "../../services/firebase";

export const Home = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignIn = async (email, password) => {
        setLoading(true)
        try {
            await logIn(email, password);
        } catch (err) {
            console.log(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    const link = {
        url: "/signup",
        name: "Прейти к регистрации"
    }
    return <div className="container">
        <SignForm onSubmit={handleSignIn} error={error} loading={loading} nameForm="Войти" linkTo={link}/>
    </div>
}
