import React, { useState, useEffect } from 'react'
import { currentStaffGet, currentStaffSet, selectCurrentStaff } from '../features/staffSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { currentStaffGet } from '../features/staffSlice';
import { Typography } from '@mui/material';
import { Box, shadows } from '@mui/system';
import PrimaryButton from '../atoms/PrimaryButton';
import Header from '../organism/header';
import InquiryListTable from '../organism/inquiryListTable';

function InquiryListCommon() {
    const currentStaff = useSelector(selectCurrentStaff);
    const [DisplayState, setDisplayState] = useState('未対応');
    const [ModalFunctionName, setModalFunctionName] = useState('対応する');
    const [notCompatibleButtonColor, setNotCompatibleButtonColor] = useState('warning');
    const [onGoingButtonColor, setOnGoingButtonColor] = useState('warning');
    const [respondedButtonColor, setRespondedButtonColor] = useState('warning');
    const [notCompatibelParams, setNotCompatibelParams] = useState({
        email: 'メールアドレス',
        sendTime: '送信時間',
        productNo: '製品番号',
      });
    const [onGoingParams, setOnGoingParams] = useState({
        email: 'メールアドレス',
        sendTime: '送信時間',
        productNo: '製品番号',
        staffNo: '対応中のスタッフ'
      });
    const [respondedParams, setRespondedParams] = useState({
        email: 'メールアドレス',
        sendTime: '送信時間',
        productNo: '製品番号',
      });
    const [Params, setParams] = useState(notCompatibelParams);

    useEffect(() => {
        if(DisplayState == '未対応'){
            setParams(notCompatibelParams);
            setModalFunctionName('対応する');
            setNotCompatibleButtonColor('error');
            setOnGoingButtonColor('warning');
            setRespondedButtonColor('warning');
        }else if(DisplayState == '対応中'){
            setParams(onGoingParams);
            setModalFunctionName('チャットへ');
            setNotCompatibleButtonColor('warning');
            setOnGoingButtonColor('error');
            setRespondedButtonColor('warning');
        }else if(DisplayState == '対応済み'){
            setParams(respondedParams);
            setModalFunctionName('未対応にする');
            setNotCompatibleButtonColor('warning');
            setOnGoingButtonColor('warning');
            setRespondedButtonColor('error');
        }
    }, [DisplayState])
    

    return (
        <div>
            <Header />
            <Typography  fontSize={25}>ようこそ! {currentStaff}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '50%', mx: 'auto', boxShadow: 3, my: '2%'}}>
                <PrimaryButton color={notCompatibleButtonColor} onClick={() => setDisplayState('未対応')}>未対応</PrimaryButton>
                <PrimaryButton color={onGoingButtonColor} onClick={() => setDisplayState('対応中')}>対応中</PrimaryButton>
                <PrimaryButton color={respondedButtonColor} onClick={() => setDisplayState('対応済み')}>対応済み</PrimaryButton>
            </Box>
            <InquiryListTable displayState={DisplayState} params={Params} modalFunctionName={ModalFunctionName} />
        </div>
    )
}

export default InquiryListCommon