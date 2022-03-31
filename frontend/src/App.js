import './App.css';
import Auth from './Pages/Auth/Auth';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from './Core/Layout';
import Customer from './Pages/Customer/Customer';
import Setting from './Pages/Setting/Setting';
import Create from './Pages/Setting/Create';
import Edit from './Pages/Setting/Edit';
import CreateCustomer from './Pages/Customer/Create';
import Detail from './Pages/Customer/Detail';
import Print from './Pages/Print/Print';
import Preview from './Pages/Print/Preview';
import EditCustomer from './Pages/Customer/Edit';
import History from './Pages/History/History';
// Import Queues from Quues
import Queues from './Pages/Queues/Queues';
import EditQueue from './Pages/Queues/EditQueue';
import PrintQueueAll from './Pages/Queues/PrintQueueAll';
import PreviewQueue from './Pages/Queues/PreviewQueue';

import Prints from './Pages/Queues/Prints';
function App () {

  const token = localStorage.getItem('token')

  if (!token) {
    return <Auth />
  }
  return (
    <>
      <Router>
        {/* <Layout> */}
        <Routes>
          <Route path="/customer" element={<Customer />}></Route>
          <Route path="/customers/create" element={<CreateCustomer />}></Route>
          <Route path="/customer/detail/:id" element={<Detail />}></Route>
          <Route path="/customer/edit/:id" element={<EditCustomer />}></Route>
          <Route path="/settings" element={<Setting />}></Route>
          <Route path="/settings/create" element={<Create />}></Route>
          <Route path="/settings/edit/:id" element={<Edit />}></Route>
          <Route path="/print" element={<Print />}></Route>
          <Route path="/preview/:id" element={<Preview />}></Route>
          <Route path="/history/print" element={<History />}></Route>
          <Route path='/queues' element={<Queues />}></Route>
          <Route path='/queues/edit/:id' element={<EditQueue />}></Route>
          <Route path='/queues/preview/:id_customers' element={<PreviewQueue />}></Route>
          <Route path='/queues/printall' element={<PrintQueueAll />}></Route>
          <Route path='/queues/prints/:id_customers' element={<Prints />}></Route>
        </Routes>
        {/* </Layout> */}

      </Router>
    </>

  );
}

export default App;
