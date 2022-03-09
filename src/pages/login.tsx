import React, { useState, VFC, memo } from 'react';
import { auth } from '../firebase';
import {
    useNavigate,
} from 'react-router-dom';
import {
    TextField,
    Grid,
    MenuItem,
    Button,
    OutlinedInput,
    InputAdornment,
    IconButton,
    InputLabel,
    FormControl
} from "@mui/material";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from '@firebase/auth';
import InputArea from '../atoms/inputArea';
import PrimaryButton from '../atoms/PrimaryButton';
import Header from '../organism/header';
import { currentStaffGet, currentStaffSet } from '../features/staffSlice';
import { useDispatch } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login() {
    const [staffAddres, setStaffAddres] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false)

    const staffLogin = () => {
        signInWithEmailAndPassword(auth, staffAddres, password)
        .then(() => {
            dispatch(currentStaffSet(staffAddres));
            Navigate(`/inquiryList`);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("error");
            alert("スタッフアドレスかパスワードが間違っています")
        });
    }

    const passwordUpdate = () => {
        sendPasswordResetEmail(auth, staffAddres)
            .then(() => {
                console.log("complete");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <>
            <Grid container spacing={3} sx={{ width: '50%', marginTop: "64px" }} alignItems="center" mx="auto">
                <Grid item xs={12}>
                    <p>スタッフログイン</p>
                </Grid>
                <Grid item xs={12}>
                    <InputArea label={"スタッフアドレス"} name={"staffNo"} onChange={e => setStaffAddres(e.target.value)}/>
                </Grid>
                <Grid item xs={12}>
                    {/* <TextField
                        sx={{width: '100%'}}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                    /> */}
                    <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">パスワード</InputLabel>
                    <OutlinedInput
                        sx={{width: '100%'}}
                        label="Password"
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={() => setShowPassword(!showPassword)}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <PrimaryButton color={'warning'} onClick={staffLogin}>ログイン</PrimaryButton>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={passwordUpdate}>パスワードを忘れた</Button>
                </Grid>
            </Grid>
        </>
    );
}

export default Login
