import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserAccountForm from './pages/userAccount/UserAccountForm.jsx';
import AccessRequest from './pages/accessRequest/AccessRequestMain.jsx';
import EmployeeTransfer from './pages/employeeTransfer/EmployeeTransfer.jsx';
import EmployeeClearance from './pages/employeeClearance/EmployeeClearance.jsx';
import Layout from './layout/Layout.jsx';
import LoginPopup from './components/auth/LoginPopup.jsx';
import AccessReviewDashboard from './pages/ITAdmin/accessReview/AccessReviewDashboard.jsx';
import AdminDashboard from './pages/ITAdmin/AdminDashboard.jsx';
import AccessReviewDetails from './pages/ITAdmin/accessReview/AccessReviewDetails.jsx';

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
        </Route>

        {/* Login route outside layout */}
        <Route path="/signin" element={<LoginPopup setShowLogin={() => { }} />} />
      </Routes>
    </Router>
  );
}

export default App;