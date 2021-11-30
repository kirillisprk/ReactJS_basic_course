import React, {useState} from "react";
import {Alert, Card, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import "./style.scss"
import {Link} from "react-router-dom";

export const SignForm = ({onSubmit, error, loading, nameForm, linkTo}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(email, password);
        setEmail('');
        setPassword('');
    }

    return (
        <div className="login-container">
            <Card>
                {error && <Alert severity="error">{error}</Alert>}
                <form className="login-form" onSubmit={handleSubmit}>
                    <TextField value={email} onChange={handleChangeEmail} label="Email"/>
                    <TextField value={password} onChange={handleChangePassword} type="password" label="Пароль"/>
                    <Button onClick={handleSubmit} variant="contained"
                            disabled={loading}>{!nameForm ? "Submit" : nameForm}
                    </Button>
                    <Link className="link" to={linkTo.url}>{linkTo.name}</Link>
                </form>
            </Card>
        </div>
    )
}
