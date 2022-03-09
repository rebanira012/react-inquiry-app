import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { onAuthStateChanged, signOut, getAuth } from '@firebase/auth';
import { db, auth } from '../firebase';
import { collection, onSnapshot, query, where } from "firebase/firestore";

type State = {
  currentStaff: string | null,
  notCompatibleCount: number
}

const notCompatibleCountInit = () => {
  onSnapshot(query(collection(db, 'inquiries'), where('supportState', '==', '未対応')), (querySnapshot) => {
    let length = 0;
    querySnapshot.forEach((doc) => {
        length++;
        console.log(length);
    })
    length = 0
    return 0
  })
}

export const staffSlice = createSlice({
  name: "staff",
  initialState: {
    currentStaff: '',
    notCompatibleCount: 5,
  },
  reducers: {
    currentStaffGet: (state) => {
      return {...state, currentStaff: state.currentStaff};
    },
    currentStaffSet: (state: State, action) => {
      let Staff: string | null;
      onAuthStateChanged(auth, (staff) => {
        if (staff) {
          Staff = staff.email;
          console.log('sccess');
        } else {
          console.log('error');
        }
      });
      state.currentStaff = action.payload;
    },
    notCompatibleIncrement: state => {
      console.log('increment');
      state.notCompatibleCount++;
    },
    notCompatibleDecrement: state => {
      console.log('decrement');
      state.notCompatibleCount--;
    },
    notCompatibleCountSet: (state, action) => {
      let length = 0;
      onSnapshot(query(collection(db, 'inquiries'), where('supportState', '==', '未対応')), (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            length++;
        })
      });
      console.log(length)
      state.notCompatibleCount = action.payload;
    }

    // currentStaff: 
    // updateUserProfile: (state, action: PayloadAction<USER>) => {
    //   state.user.displayName = action.payload.displayName;
    //   state.user.photoUrl = action.payload.photoUrl;
    // },
  },
});

export const { currentStaffGet, currentStaffSet, notCompatibleIncrement, notCompatibleDecrement, notCompatibleCountSet } = staffSlice.actions;
export const selectCurrentStaff = (state: RootState) => state.staff.currentStaff;
export const selectNotCompatibleCount = (state: RootState) => state.staff.notCompatibleCount;
export default staffSlice.reducer;