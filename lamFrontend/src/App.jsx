import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserAccountForm from './pages/userAccount/UserAccountForm.jsx';
import AccessRequest from './pages/accessRequest/AccessRequestMain.jsx';
import EmployeeTransfer from './pages/employeeTransfer/EmployeeTransfer.jsx';
import EmployeeClearance from './pages/employeeClearance/EmployeeClearance.jsx';
import Layout from './layout/Layout.jsx';
import LoginPopup from './components/auth/LoginPopup.jsx';
import AdminDashboard from './pages/ITAdmin/AdminDashboard.jsx';
import AccessReviewDashboard from './pages/ITAdmin/accessReviewDashboard/AccessReviewDashboard.jsx';
import AccessReviewDetails from './pages/ITAdmin/accessReviewDashboard/AccessReviewDetails.jsx';
import UserAccountReview from './pages/ITAdmin/userAccountDashboard/UserAccountReview.jsx';
import UserAccountReviewDetails from './pages/ITAdmin/userAccountDashboard/UserAccountReviewDetails.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Default page set to Admin Dashboard */}
          <Route index element={<AdminDashboard />} />

          {/* Other routes */}
          <Route path="account-creation" element={<UserAccountForm />} />
          <Route path="access-request" element={<AccessRequest />} />
          <Route path="employee-transfer" element={<EmployeeTransfer />} />
          <Route path="employee-clearance" element={<EmployeeClearance />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="access-review-dashboard" element={<AccessReviewDashboard />} />
          <Route path="access-review-details/:id" element={<AccessReviewDetails />} />
          <Route path="useraccount-review-dashboard" element={<UserAccountReview />} />
          <Route path="user-account-review-details/:id" element={<UserAccountReviewDetails />} />
        </Route>

        {/* Login route outside layout */}
        {/* <Route path="/signin" element={<LoginPopup setShowLogin={() => { }} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;