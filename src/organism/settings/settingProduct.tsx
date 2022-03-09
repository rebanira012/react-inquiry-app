import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
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
import { doc, addDoc, collection, onSnapshot, query, arrayUnion, Timestamp, where, getDoc, updateDoc } from '@firebase/firestore'

function SettingProduct() {
    const [productNo, setProductNo] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false)
    const [open, setOpen] = useState(false);
    const [productList,setProductList] = useState<Object[]>([])
    const [addOrDelete,setAddOrDelete] = useState('');
    const [deleteProduct, setDeleteProduct] = useState('')

    useEffect(() => {
        onSnapshot(doc(db, 'products', 'products'), (doc) => {
        let list = [];
            doc.data().products.map(e => {
                list.push(e);
            })
            setProductList(list)
        });
        console.log(productList)
    }, [])

    const productNoControl = (command) => {
        if(command == '追加'){
            setOpen(false)
            setProductNo('')
            updateDoc(doc(db, 'products', 'products'), {
                products: arrayUnion({
                    label: productNo,
                    inquiryNumber: 0
                })
            });
        } else {
            setProductNo('')
            productList.map((e, index) => {
                if(e.label == deleteProduct) productList.splice(index, 1) ;
            })
            updateDoc(doc(db, 'products', 'products'), {
                products: productList
            });
            setOpen(false)
        }
    }

    const modalOpen = (control, DeleteProduct) => {
        setOpen(true);
        setAddOrDelete(control);
        if(control == '削除') setProductNo(DeleteProduct)
    }

    return (
        <>
            <Grid container spacing={3} sx={{ width: '50%', marginTop: "64px" }} alignItems="center" mx="auto">
                <TextField  fullWidth id="outlined-basic" value={productNo} label={'製品番号'} name={'productNo'} onChange={e => setProductNo(e.target.value)}/>
                <PrimaryButton color={'primary'} onClick={() => modalOpen('追加', '')}>追加する</PrimaryButton>
            </Grid>
            <Grid container spacing={3} sx={{ width: '80%', marginTop: "64px" }} alignItems="center" mx="auto">
            {(() => {
                    let elements = [];
                    {productList.map((product) => {
                        elements.push(
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.35)", width: '90%', mx: 'auto', py: '1%', my: '1%'}}>    
                                <Typography>{product.label}</Typography>
                                <PrimaryButton color={'warning'} onClick={() => modalOpen('削除', product.label)}>削除</PrimaryButton>
                            </Box>
                        )
                    })}
                    return elements;
                })()}
            </Grid>
            <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={{position: 'absolute' as 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'white',border: '2px solid #000', boxShadow: 24, p: 4,}}>
                    <Typography>以下の製品を{addOrDelete}しますか</Typography>
                    <Typography>製品番号：{productNo}</Typography>
                    <PrimaryButton color={'warning'} onClick={() => productNoControl(addOrDelete)}>OK</PrimaryButton>
                </Box>
            </Modal>
        </>
    );
}

export default SettingProduct
