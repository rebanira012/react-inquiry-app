import { Grid, Typography, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, getDoc, doc, updateDoc, orderBy, limit } from '@firebase/firestore'
import { db } from '../firebase'
import { Box } from '@mui/system';
import PrimaryButton from '../atoms/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { notCompatibleDecrement, selectCurrentStaff, notCompatibleIncrement, notCompatibleCountSet, currentStaffSet } from '../features/staffSlice';

type Props = {
    displayState: string,
    params: Object,
    modalFunctionName: string
}

type Inquiry = {
    email: string,
    productNo: string,
    content: string,
    supportState: string,
    chats: any,
    staffNo: string,
    sendTime: any
}

function InquiryListTable(props: Props) {
    const { displayState, params, modalFunctionName } = props;
    const currentStaff = useSelector(selectCurrentStaff);
    // const [inquiryList, setInquiryList] = useState<Object<Inquiry[]>>([]);
    const [inquiryList, setInquiryList] = useState<any[]>([]);
    const [open, setOpen] = useState(false)
    const [DisplayModal, setDisplayModal] = useState<any>({});
    const [ModalId, setModalId] = useState('');
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        onSnapshot(query(collection(db, 'inquiries'), where('supportState', '==', displayState)), (querySnapshot) => {
            let list = [];
            querySnapshot.forEach((doc) => {
                list.push(doc);
            })
            list.sort(function(first, second){
                if (first.data().sendTime > second.data().sendTime){
                  return 1;
                }else if (first.data().sendTime < second.data().sendTime){
                  return -1;
                }else{
                  return 0;
                }
            });
            setInquiryList(list);
        });
        // onSnapshot(query(collection(db, 'inquiries'), where('supportState', '==', displayState)), (querySnapshot) => {
        //     let list = [];
        //     querySnapshot.forEach((doc) => {
        //         list.push(doc);
        //     })
        //     setInquiryList(list);
        // });
    }, [displayState])

    const ModalOpen = async(id) => {
        const docRef = doc(db, "inquiries", id);
        const docSnap = await getDoc(docRef);
        setDisplayModal(docSnap.data());
        console.log(docSnap.id);
        setOpen(true);
        setModalId(id);
    }

    const ModalFuncition = (id) => {
        const docRef = doc(db, "inquiries", id);
        if(displayState == '未対応') {
            updateDoc(docRef, {
                supportState: "対応中",
                staffNo: currentStaff,
            });
        }else if(displayState == '対応中'){
            Navigate({ pathname: `/chat`, search: `?id=${id}` });
        }else if(displayState == '対応済み'){
            updateDoc(docRef, {
                supportState: "未対応",
                staffNo: '',
            });
        }
        setOpen(false);
    }

    return (
        <div>
            <Box sx={{ boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.35)", width: '80%', mx: 'auto', py: '1%'}}>
                <Typography align='center' fontSize={20}>{displayState}のお問い合わせ：{inquiryList.length}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.35)", width: '90%', mx: 'auto', py: '1%', mt: '2%'}}>
                {
                    Object.keys(params).map((key) => (
                        <div>{params[key]}</div>
                    ))
                }
                <div>詳細</div>
            </Box>
            <Grid container spacing={1} sx={{ marginTop: "0", marginBottom: "20px", width: "100%" }} mx="auto">
                {(() => {
                    let elements = [];
                    if(displayState != '対応中'){
                        inquiryList.map((inquiry) => {
                            elements.push(
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.35)", width: '90%', mx: 'auto', py: '1%', my: '1%'}}>    
                                    {(() => {
                                        let element = [];
                                        Object.keys(params).map((p) => {
                                            Object.keys(inquiry.data()).map((key) => {
                                                if(key == p) {
                                                    element.push(
                                                        <Box sx={{}}>{inquiry.data()[key]}</Box>
                                                    )
                                                }
                                            })
                                        })
                                        return element;
                                    })()}
                                    <PrimaryButton color={'warning'} onClick={() => ModalOpen(inquiry.id)}>詳細</PrimaryButton>
                                </Box>
                            )
                        })
                        return elements;
                    } else {
                        inquiryList.map((inquiry) => {
                            if(inquiry.data()['staffNo'] == currentStaff) {
                                elements.push(
                                    <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.35)", width: '90%', mx: 'auto', py: '1%', my: '1%'}}>    
                                        {(() => {
                                            let element = [];
                                            Object.keys(params).map((p) => {
                                                Object.keys(inquiry.data()).map((key) => {
                                                    if(key == p && inquiry.data()['staffNo'] == currentStaff) {
                                                        element.push(
                                                            <Box sx={{}}>{inquiry.data()[key]}</Box>
                                                        )
                                                    }
                                                })
                                            })
                                            return element;
                                        })()}
                                        <PrimaryButton color={'warning'} onClick={() => ModalOpen(inquiry.id)}>詳細</PrimaryButton>
                                    </Box>
                                )
                            }
                        })
                        return elements;
                    }
                })()}
            </Grid>
            <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={{position: 'absolute' as 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'white',border: '2px solid #000', boxShadow: 24, p: 4,}}>
                    {(() => {
                        let element = [];
                        Object.keys(params).map((p) => {
                            Object.keys(DisplayModal).map((key) => {
                                if(key == p) {
                                    element.push(
                                        <Box sx={{}}>{params[key]}:{DisplayModal[key]}</Box>
                                    )
                                }
                            })
                        })
                        return element;
                    })()}
                    <Box>{DisplayModal['content']}</Box>
                    <PrimaryButton color={'warning'} onClick={() => ModalFuncition(ModalId)}>{modalFunctionName}</PrimaryButton>
                </Box>
            </Modal>
        </div>
    )
}

export default InquiryListTable
