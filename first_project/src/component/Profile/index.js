import React, {useEffect, useState} from "react"
import {auth, logOut} from "../../services/firebase";
import {useDispatch, useSelector} from "react-redux";
import {selectProfileName} from "../../store/profile/selectors";
import {editNameUser} from "../../store/profile/actions";
import Button from "@mui/material/Button";
import {Edit, Logout} from "@mui/icons-material";
import {
    CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Snackbar,
    TextField, Tooltip,
    Typography
} from "@mui/material";

import "./style.scss"

export const Profile = () => {
    const [enterUserName, setEnterUserName] = useState('');
    const [snack, setSnack] = useState(false);
    const dispatch = useDispatch();
    const userName = useSelector(selectProfileName);
    const [openDialog, setOpenDialog] = React.useState(false);

    useEffect(() => {
        setEnterUserName(userName)
    }, [userName]);

    const handleChange = (e) => {
        setEnterUserName(e.target.value);
    }
    const handleEditUserName = () => {
        dispatch(editNameUser(enterUserName));
        handleCloseDialog();
        setSnack(true);
    }

    const handleLogOutClick = async () => {
        try {
            await logOut();
        } catch (err) {
            console.log(err);
        }
    }

    //Функции для
    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnack(false);
    };

    return (<div className="profile">
        <div>
            <Typography className="header" variant="h4" gutterBottom component="div">
                {!userName ? (<CircularProgress/>) : <>
                    Профиль пользователя,{userName}
                    <Tooltip title="Изменить имя">
                        <IconButton onClick={handleClickOpenDialog} size="large">
                            <Edit/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Выйти">
                        <IconButton size="large" onClick={handleLogOutClick}>
                            <Logout/>
                        </IconButton>
                    </Tooltip>
                </>}
            </Typography>
            <div className="colorWhite">
                <Typography variant="h6" gutterBottom component="div">
                    Информация о пользователе
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                    Электронная почта: {auth?.currentUser ? auth.currentUser.email : <CircularProgress/>}
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                    Вход выполнен: {auth?.currentUser ? auth.currentUser.metadata.lastSignInTime : <CircularProgress/>}
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                    Дата создания: {auth?.currentUser ? auth.currentUser.metadata.creationTime : <CircularProgress/>}
                </Typography>

            </div>

        </div>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Изменить имя пользователя</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Имя пользователя"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={enterUserName}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Отмена</Button>
                <Button
                    onClick={handleEditUserName}
                    disabled={!enterUserName || (enterUserName === userName)}>
                    Изменить
                </Button>
            </DialogActions>
        </Dialog>
        <Snackbar
            open={snack}
            autoHideDuration={2000}
            onClose={handleCloseSnack}
            message="Имя изменено"
        />
    </div>);
}
