import React, { useState, VFC, memo } from 'react';
import { auth } from '../../firebase';
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
    FormControl,
    Modal,
    Box,
    Typography
} from "@mui/material";
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useDispatch } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PrimaryButton from '../../atoms/PrimaryButton';
import InputArea from '../../atoms/inputArea';

function SettingGeneralStaff() {
    const [staffAddres, setStaffAddres] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false)
    const [open, setOpen] = useState(false);

    const staffSignUp = () => {
        createUserWithEmailAndPassword(auth, staffAddres, password)
        .then((userCredential) => {
            alert("スタッフを新規登録しました")
            setOpen(false);
            setStaffAddres('');
            setPassword('');
        })
        .catch((error) => {
            alert("スタッフの新規登録に失敗しました。もう一度お願いします。")
            setStaffAddres('');
            setPassword('');
        });
    }

    return (
        <>
            <Grid container spacing={3} sx={{ width: '50%', marginTop: "64px" }} alignItems="center" mx="auto">
                <Grid item xs={12}>
                    <p>スタッフ追加</p>
                </Grid>
                <Grid item xs={12}>
                    <TextField  fullWidth id="outlined-basic" value={staffAddres} label={"スタッフアドレス"} name={"staffNo"} onChange={e => setStaffAddres(e.target.value)}/>
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
                    <PrimaryButton color={'warning'} onClick={() => setOpen(true)}>サインアップ</PrimaryButton>
                </Grid>
            </Grid>
            <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={{position: 'absolute' as 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'white',border: '2px solid #000', boxShadow: 24, p: 4,}}>
                    <Typography>以下の内容でスタッフを新規登録しますか</Typography>
                    <Typography>スタッフアドレス：{staffAddres}</Typography>
                    <Typography>パスワード：{password}</Typography>
                    <PrimaryButton color={'warning'} onClick={staffSignUp}>OK</PrimaryButton>
                </Box>
            </Modal>
        </>
    );
}

export default SettingGeneralStaff
