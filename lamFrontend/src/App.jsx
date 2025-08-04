import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserAccountForm from './pages/userAccount/UserAccountForm.jsx';
import AccessRequest from './pages/accessRequest/AccessRequestMain.jsx';
import EmployeeTransfer from './pages/employeeTransfer/EmployeeTransfer.jsx';
import EmployeeClearance from './pages/employeeClearance/EmployeeClearance.jsx';
import Layout from './layout/Layout.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UserAccountForm />} />
          <Route path="/access-request" element={<AccessRequest />} />
          <Route path="/employee-transfer" element={<EmployeeTransfer />} />
          <Route path="/employee-clearance" element={<EmployeeClearance />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


