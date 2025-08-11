import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserAccountForm from './pages/userAccount/UserAccountForm.jsx';
import AccessRequest from './pages/accessRequest/AccessRequestMain.jsx';
import EmployeeTransfer from './pages/employeeTransfer/EmployeeTransfer.jsx';
import EmployeeClearance from './pages/employeeClearance/EmployeeClearance.jsx';
import Layout from './layout/Layout.jsx';
import LoginPopup from './components/auth/LoginPopup.jsx'; // Update path based on your project structure
import AccessReviewDashboard from './pages/ITAdmin/AccessReviewDashboard'
import AccessReviewDetails from "./pages/ITAdmin/AccessReviewDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UserAccountForm />} />
          <Route path="access-request" element={<AccessRequest />} />
          <Route path="employee-transfer" element={<EmployeeTransfer />} />
          <Route path="employee-clearance" element={<EmployeeClearance />} />
          <Route path="/dashboard" element={<AccessReviewDashboard />} />
        <Route path="/access-review-details/:id" element={<AccessReviewDetails />} />

        </Route>

        {/* Login Route Outside Layout */}
        <Route path="/signin" element={<LoginPopup setShowLogin={() => { }} />} />
          
      </Routes>
    </Router>
  );
}

export default App;