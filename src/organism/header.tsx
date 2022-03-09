import React, { useEffect, useState } from 'react'
import {
    AppBar,
    Button,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
    Badge,
} from "@mui/material";
import { Box } from "@mui/system";
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';
import DialogWindow from '../molecules/dialogWindow'
import PrimaryButton from '../atoms/PrimaryButton';
import { db } from '../firebase';
import { doc, addDoc, collection, query, arrayUnion, Timestamp, onSnapshot, where } from '@firebase/firestore'
import { signOut } from '@firebase/auth';
import { auth } from '../firebase';
import { spacing } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { currentStaffGet, currentStaffSet, selectCurrentStaff, selectNotCompatibleCount, notCompatibleIncrement } from '../features/staffSlice';

function Header() {
    const [open, setOpen] = React.useState(false);
    // const Navigate = useNavigate();
    // const dispatch = useDispatch();
    const [notCompatibleCount,setNotCompatibleCount] = useState<number>(0)
    // const currentStaff = useSelector(selectCurrentStaff);
    // const notCompatibleCount = useSelector(selectNotCompatibleCount);
    const [masterFlag, setMasterFlag] = useState(false);

    useEffect(() => {
      onSnapshot(query(collection(db, 'inquiries'), where('supportState', '==', '未対応')), (querySnapshot) => {
        let length = 0;
        querySnapshot.forEach((doc) => {
            length++;
        });
        setNotCompatibleCount(length);
      });
      // if(currentStaff == 'master@example.com') setMasterFlag(true);
    }, []);

    const onClickSignOut = () => {
      signOut(auth)
      .then((success) => {
        alert("サインアウトしました。");
        // dispatch(currentStaffSet(''));
        // Navigate(`/login`);
      })
      .catch((error) => {
        alert("サインアウトに失敗しました。");
      });
    };

    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Oshirisu
              </Typography>
              {/* {masterFlag && <PrimaryButton color={'primary'} onClick={() => Navigate('/setting')}><SettingsIcon color='inherit'/></PrimaryButton>}
              <PrimaryButton color={'primary'} onClick={() => Navigate('/inquiryList')}>
                <Badge badgeContent={notCompatibleCount} color="error">
                  <MailIcon color="inherit" />
                </Badge>
              </PrimaryButton> */}
              {masterFlag && <PrimaryButton color={'primary'} onClick={() => console.log('setting')}><SettingsIcon color='inherit'/></PrimaryButton>}
              <PrimaryButton color={'primary'} onClick={() => console.log('inquiryList')}>
                <Badge badgeContent={notCompatibleCount} color="error">
                  <h1>{notCompatibleCount}</h1>
                </Badge>
              </PrimaryButton>
              <PrimaryButton color={'warning'} onClick={() => setOpen(true)}>ログアウト</PrimaryButton>
              <DialogWindow open={open} setOpen={setOpen} DialogMessage={'本当にログアウトしますか？'} agreeButtonMessage={'ログアウトする'} disagreeButtonMessage={'キャンセル'} agreeOnClick={onClickSignOut}/>
            </Toolbar>
          </AppBar>
        </Box>
        <Box sx={{ p: 5 }}></Box>
      </>
    );
}

export default Header
