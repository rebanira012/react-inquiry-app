import { useState } from 'react';
import {db, auth} from './firebase';
// import ReactDOM from 'react-dom';
import {
    // HashRouter as Router,
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';
//   import List from './list';
// import history from './commponents/history';
import Chat from './pages/chat'
import InquiryList from './pages/inquiryList';
import Login from './pages/login';
import Inquiry from './pages/inquiry';
import Setting from './pages/setting';
// import StaffSignUp from './commponents/pages/staffSignUp';
// import Auth from './commponents/Auth';
import { Provider } from 'react-redux';
import { store } from './store/store'
import SettingProduct from './organism/settings/settingProduct';
import SettingGeneralAccount from './organism/settings/settingGeneralStaff';

const App = () => {
    return (
        <Router>
            <Provider store={store}>
            <Routes>
                <Route path='/inquiryList' element={<InquiryList />} />
                <Route path='/login' element={<Login />} />
                <Route path='/inquiry' element={<Inquiry />} />
                <Route path='/chat' element={<Chat />} />
                <Route path='/setting/*' element={<Setting />}>
                    <Route path=":id" />
                </Route>
                {/* <Route path="/setting/product" element={<SettingProduct />}/>
                <Route path="/setting/generalStaff" element={<SettingGeneralAccount />}/> */}
                {/* <Route exact path='/listNoSupport' component={ListNoSupport} />  */}
                {/* <Route exact path='/staffSignUp' component={StaffSignUp} />  */}
                {/* <Auth>
                    <Switch>
                        <Route exact path='/listNoSupport' component={ListNoSupport} /> 
                    </Switch>
                </Auth> */}
            </Routes>
            </Provider>
        </Router>
    );
};

export default App;