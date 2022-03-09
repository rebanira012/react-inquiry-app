import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import {
    useNavigate,
} from 'react-router-dom';
import {
    TextField,
    Grid,
    MenuItem
} from "@mui/material";
import { doc, addDoc, collection, onSnapshot, query, arrayUnion, Timestamp, where, getDoc } from '@firebase/firestore'
import { init, send } from 'emailjs-com';
import InputArea from '../atoms/inputArea';
import PrimaryButton from '../atoms/PrimaryButton';
import FormatTime from '../utils/formatTime';
import { useDispatch } from 'react-redux';
import { notCompatibleIncrement, notCompatibleCountSet } from '../features/staffSlice';
import { makeStyles } from '@mui/styles';

const ProductSelects = [
    {
      value: 'A001',
      label: 'A001',
    },
    {
      value: 'A002',
      label: 'A002',
    },
    {
      value: 'A003',
      label: 'A003',
    },
    {
      value: 'A004',
      label: 'A004',
    }
  ];

  const useStyles = makeStyles({
    input: {
      "&:invalid": {
        border: "red solid 2px"
      }
    }
  });

  type Selects = {
      inquiryNumber: number,
      label: string
  }

const Inquiry = () => {
    const [email, setEmail] = useState('');
    const [productNo, setProductNo] = useState('1');
    const [content, setContent] = useState('');
    const [refid,setRefid] = useState('');
    const [productSelect,setProductSelect] = useState('1');
    const [productSelects,setProductSelects] = useState<Selects[]>([])
    // const Navigate = useNavigate();
    // const dispatch = useDispatch();
    const inputRef = useRef(null);
    const [contentInputError, setContentInputError] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        (async () => {
            let list = [];
            const docRef = await doc(db, 'products', 'products');
            const docSnap = await getDoc(docRef);
            await docSnap.data().products.map(e => {
                list.push(e);
            })
            setProductSelects(list)
            console.log(productSelects)
        })();
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductSelect(event.target.value);
        setProductNo(event.target.value);
    }

    const contentHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (inputRef.current) {
            const ref = inputRef.current;
            if (!ref.validity.valid) {
              setContentInputError(true);
              console.log('error')
              console.log(ref)
            } else {
              setContentInputError(false);
              console.log('noerror')
              console.log(ref)
            }
          }
          setContent(event.target.value)
    }

    const inquirySend = async() => {
        addDoc(collection(db, 'inquiries'), {
            email: email,
            productNo: productNo,
            content: content,
            supportState: "未対応",
            chats: arrayUnion(),
            staffNo: "",
            sendTime: FormatTime(Timestamp.now().toDate())
        })
        .then(async(docRef) => {
            onSnapshot(query(collection(db, 'inquiries'), where('supportState', '==', '未対応')), (querySnapshot) => {
                let length = 0;
                querySnapshot.forEach((doc) => {
                    length++;
                });
                // (async () => {
                //     await dispatch(notCompatibleCountSet(length));
                // })();
            });
            init("user_l8YFgNDtWCp1RT7y5AZG3");
            send("service_qzuegz5", "template_zs3osfd", {to_name: email, chat_url: docRef.id, to_send_address: email}).then(() => {
                window.alert('お問い合わせを送信致しました。');
            });
            // Navigate({ pathname: `/chat`, search: `?id=${docRef.id}` });
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    };

    return (
        <>
            <Grid container spacing={3} sx={{ width: '50%', marginTop: "64px" }} alignItems="center" mx="auto">
                <Grid item xs={12}>
                    <p>お問い合わせ送信フォーム</p>
                </Grid>
                <Grid item xs={12}>
                    <InputArea label={"メールアドレス"} name={"email"} onChange={e => setEmail(e.target.value)}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label={"製品種別"} select value={productSelect} onChange={handleChange}>
                        {productSelects.map((option, index) => (
                            <MenuItem key={index} value={option.label}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                <form>
                    <TextField 
                        fullWidth label="お問い合わせ内容" error={contentInputError}
                        inputRef={inputRef}
                        inputProps={{ 
                            pattern: '[0-9]',
                            onChange: contentHandleChange
                        }} helperText={inputRef?.current?.validationMessage} multiline minRows={3} placeholder='お問い合わせ内容を入力してください'
                    />
                </form>
                </Grid>
                <Grid item xs={12}>
                    <PrimaryButton color={'warning'} onClick={inquirySend}>送信</PrimaryButton>
                </Grid>
            </Grid>
            <button>受信</button>
        </>
    );
};

export default Inquiry;