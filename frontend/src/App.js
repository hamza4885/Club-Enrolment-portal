import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/User/login';
import Signup from './Components/User/signup';
import ForgotPassword from './Components/User/forgotpassword';
import ResetPassword from './Components/User/ResetPassword';
import ClubRegistrationForm from './Components/Admin/CreateClub';
import ClubPage from './Components/Layout/Home';
import LandingPage from './Components/Layout/CentHome';
import AdminPanel from './Components/Admin/adminPanel';
import UserProfile from './Components/User/userProfile';
import UserLandingPage from './Components/User/userPage';
import { useEffect, useState } from 'react';
import WebFont from "webfontloader";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Payment from './Components/Payment/PaymentModal';
import PaymentSuccess from './Components/Payment/Sucess';
import PremiumMembers from './Components/Layout/PremiumMembersList';
import ClubMembers from './Components/Layout/ClubMembers';
import AllUsers from './Components/Admin/AllUsers';

function App() {
  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
   
    localStorage.removeItem("user","token");
  }, []);

   return (
    <>
   <Router>
  
        <Elements stripe={loadStripe('pk_test_51PrcukJekgKfbnevCXFSScX2YZ13WAdk4yu3FhgNPIlb7icHYURSRhnZiHNJvzSKh3H2gXGhsGxHFVSzSMlWDlrf00y8qAzj30')}>
          <Routes>
            <Route path='/payment/process' element={<Payment />} />
            <Route path='/clubs/:id/subscription' element={<Payment/>}></Route>
            <Route path='/clubs/:id/subscription/success' element={<PaymentSuccess/>}></Route>
          </Routes>
        </Elements>
    
    <Routes>
      <Route path='/clubs/:id' element={<UserLandingPage/>}></Route>
      <Route path='/' element={<LandingPage/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
      <Route path='/password/reset/:token' element={<ResetPassword/>}></Route>
      <Route path='/clubs/userProfile' element={<UserProfile/>}></Route>
       {/* Admin Routes */}
      <Route path='/createClub' element={<ClubRegistrationForm/>}></Route>
      <Route path='/clubs/manager/:id' element={<ClubPage/>}></Route>
      <Route path='AllUsers' element={<AllUsers/>}></Route>
      
      
      {/* <Route path='/clubs/user/:id' element={<user/>}></Route> */}
      <Route path='/clubs/adminPanel' element={<AdminPanel/>}></Route>
      <Route path='/clubs/PremiumMembers' element={<PremiumMembers/>}></Route>
      <Route path='/clubMembers/:clubId' element={<ClubMembers/>}></Route>
    </Routes>


   </Router>
   </>
  );
}

export default App;
