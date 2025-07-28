// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import UserAccountForm from './pages/userAccount/UserAccountForm';
// import Home from './pages/home/home';
// // import Requests from './pages/Requests';
// // import Approvals from './pages/Approvals';
// // import Reports from './pages/Reports';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />}>
//           <Route path="user-account" element={<UserAccountForm />} />
//           {/* <Route path="requests" element={<Requests />} />
//           <Route path="approvals" element={<Approvals />} />
//           <Route path="reports" element={<Reports />} /> */}
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UserAccountForm from './pages/userAccount/UserAccountForm.jsx';
import AccessRequest from './pages/accessRequest/AccessRequest.jsx';
import EmployeeTransfer from './pages/employeeTransfer/EmployeeTransfer.jsx';
import EmployeeClearance from './pages/employeeClearance/EmployeeClearance.jsx';


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


