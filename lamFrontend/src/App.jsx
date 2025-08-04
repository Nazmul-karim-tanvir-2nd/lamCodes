import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserAccountForm from './pages/userAccount/UserAccountForm.jsx';
import AccessRequest from './pages/accessRequest/AccessRequest.jsx';
import EmployeeTransfer from './pages/employeeTransfer/EmployeeTransfer.jsx';
import EmployeeClearance from './pages/employeeClearance/EmployeeClearance.jsx';
import Layout from './layout/Layout.jsx';
import LoginPopup from './components/auth/LoginPopup.jsx'; // Update path based on your project structure

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UserAccountForm />} />
          <Route path="access-request" element={<AccessRequest />} />
          <Route path="employee-transfer" element={<EmployeeTransfer />} />
          <Route path="employee-clearance" element={<EmployeeClearance />} />
        </Route>

        {/* Login Route Outside Layout */}
        <Route path="/signin" element={<LoginPopup setShowLogin={() => { }} />} />
      </Routes>
    </Router>
  );
}

export default App;