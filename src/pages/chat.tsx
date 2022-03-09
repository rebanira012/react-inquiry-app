import React, { useEffect, useState, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentStaffGet, currentStaffSet, selectCurrentStaff } from '../features/staffSlice';
import { useLocation } from 'react-router-dom';
import { collection, onSnapshot, query, where, getDoc, doc, updateDoc, arrayUnion } from '@firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, st } from '../firebase'
import { Card, CardContent, CardMedia, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Header from '../organism/header';
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';
import SendIcon from '@mui/icons-material/Send';
import PrimaryButton from '../atoms/PrimaryButton';
import { useNavigate } from 'react-router-dom';

type Chat = {
    contents: string,
    sender: string,
    imageFlag: boolean
}

function Chat() {
    const id = new URLSearchParams(useLocation().search).get('id');
    const currentStaff = useSelector(selectCurrentStaff);
    const [currentUser, setCurrentUser] = useState('customer')
    const [message, setMessage] = useState('')
    const [chats, setChats] = useState<Chat[]>([]);
    const [image,setImage] = useState<any>("");
    const messagesEndRef = createRef<HTMLDivElement>();
    const Navigate = useNavigate();
    

    useEffect(() => {
        (async () => {
            const docRef = doc(db, "inquiries", id);
            await onSnapshot((docRef), (doc) => {
                setChats(doc.data().chats);
            });
        })();
        if(currentStaff == '') setCurrentUser('customer');
        else setCurrentUser('staff');
    }, [])

    useEffect(() => {
        messagesEndRef?.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messagesEndRef]);

    const ChatSend = () => {
        console.log(id);
        const docRef = doc(db, "inquiries", id);
        updateDoc(docRef, {
            chats: arrayUnion({
                contents: message,
                sender: currentUser,
                imageFlag: false
            })
        });
        setMessage('');
    }

    const handleImage = (event) => {
        const image = event.target.files[0];
        setImage(image);
        console.log(image.name);
    };

    const ImageSend = async() => {
        console.log(image.name);
        const docRef = doc(db, "inquiries", id);
        if(image.type === 'image/png' || image.type === 'image/jpeg') {
            console.log(uploadBytes(ref(st, 'images'), image));
            await uploadBytes(ref(st, `images/${image.name}`), image).then();
            getDownloadURL(ref(st, `images/${image.name}`)).then((url) => {
                updateDoc(docRef, {
                    chats: arrayUnion({
                        contents: url,
                        sender: currentUser,
                        imageFlag: true
                    })
                });
            })
        } else alert('この画像はアップロードできません');
    }

    const Responded = () => {
        const docRef = doc(db, "inquiries", id);
        updateDoc(docRef, {
            supportState: '対応済み'
        });
        Navigate('/inquiryList');
    }

    return (
        <div>
            {currentStaff && <Header />}
            <Box sx={{ width: '90%', mx: 'auto' }}>
                {(() => {
                    let elements = [];
                    chats.map((chat) => {
                        if(chat.imageFlag) {
                            if(chat.sender == 'staff') {
                                elements.push(
                                    <Box sx={{ width: '35%', m: '3% auto 3% 3%', display: 'flex', justifyContent: 'space-around' }} ref={messagesEndRef}>
                                        <Box sx={{ width: '30%' }}>
                                            <img style={{width: '100%'}} src='https://www.silhouette-illust.com/wp-content/uploads/2019/10/person_staff_46819-300x300.jpg' alt='rrr'/>
                                        </Box>
                                        <Card sx={{ width: '70%', height: '0' }}>
                                            <CardMedia
                                                sx={{ width: '100%' }}
                                                component="img"
                                                image={chat.contents}
                                                alt="green iguana"
                                            />
                                        </Card>
                                    </Box>
                                )
                            }else {
                                elements.push(
                                    <Box sx={{ width: '35%', m: '3% 3% 3% auto', display: 'flex', justifyContent: 'space-around' }} ref={messagesEndRef}>
                                        <Card sx={{ width: '70%', height: '0' }}>
                                            <CardMedia
                                                sx={{ width: '100%' }}
                                                component="img"
                                                image={chat.contents}
                                                alt="green iguana"
                                            />
                                        </Card>
                                        <Box sx={{ width: '30%'}}>
                                            <img style={{width: '100%'}} src='https://us.123rf.com/450wm/alekseyvanin/alekseyvanin1704/alekseyvanin170403663/76699411-%E3%83%A6%E3%83%BC%E3%82%B6-%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3-%E3%83%99%E3%82%AF%E3%83%88%E3%83%AB%E3%80%81%E3%83%97%E3%83%AD%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E5%9B%BA%E4%BD%93%E3%83%AD%E3%82%B4-%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88-%E3%83%BB%E7%B5%B5%E6%96%87%E5%AD%97%E7%99%BD%E3%81%A7%E9%9A%94%E9%9B%A2.jpg?ver=6' alt='rrr'/>
                                        </Box>
                                    </Box>
                                )
                            }
                        } else {
                            if(chat.sender == 'staff') {
                                elements.push(
                                    <Box sx={{ width: '35%', m: '3% auto 3% 3%', display: 'flex', justifyContent: 'space-around' }} ref={messagesEndRef}>
                                        <Box sx={{ width: '30%' }}>
                                            <img style={{width: '100%'}} src='https://www.silhouette-illust.com/wp-content/uploads/2019/10/person_staff_46819-300x300.jpg' alt='rrr'/>
                                        </Box>
                                        <Card sx={{ width: '70%', height: '0' }}>
                                            <CardContent>
                                                <Typography sx={{ whiteSpace: "pre-line" }}>{chat.contents}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                )
                            }else {
                                elements.push(
                                    <Box sx={{ width: '35%', m: '3% 3% 3% auto', display: 'flex', justifyContent: 'space-around' }} ref={messagesEndRef}>
                                        <Card sx={{ width: '70%', height: '0'  }}>
                                            <CardContent>
                                                <Typography sx={{ whiteSpace: "pre-line" }}>{chat.contents}</Typography>
                                            </CardContent>
                                        </Card>
                                        <Box sx={{ width: '30%'}}>
                                            <img style={{width: '100%'}} src='https://us.123rf.com/450wm/alekseyvanin/alekseyvanin1704/alekseyvanin170403663/76699411-%E3%83%A6%E3%83%BC%E3%82%B6-%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3-%E3%83%99%E3%82%AF%E3%83%88%E3%83%AB%E3%80%81%E3%83%97%E3%83%AD%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E5%9B%BA%E4%BD%93%E3%83%AD%E3%82%B4-%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88-%E3%83%BB%E7%B5%B5%E6%96%87%E5%AD%97%E7%99%BD%E3%81%A7%E9%9A%94%E9%9B%A2.jpg?ver=6' alt='rrr'/>
                                        </Box>
                                    </Box>
                                )
                            }
                        }
                    })
                    return elements;
                })()}
            </Box>
            <Box sx={{ height: '80px'}}></Box>
            <Box sx={{ position: 'fixed', bottom: 0, width: '90%', px: '4%', display: 'flex', py: '2%', zIndex: 3, bgcolor: 'rgba(255,255,255,1)' }}>
                <TextField
                    value={message}
                    sx={{ width: '100%' }}
                    fullWidth label=""
                    multiline
                    minRows={1}
                    placeholder='メッセージを入力してください'
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={(e)=> {
                        if(e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            ChatSend()
                        }
                    }}
                />
                <input type="file" onChange={handleImage} />
                <PrimaryButton color={'primary'} onClick={ImageSend}>Upload</PrimaryButton>
                <PrimaryButton color={'primary'} onClick={ChatSend}><SendIcon /></PrimaryButton>
                <PrimaryButton color={'error'} onClick={Responded}>対応完了</PrimaryButton>
            </Box>
        </div>
    )
}

export default Chat;

