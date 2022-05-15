import './styles/App.scss';
import Main from 'containers/main';
import {Routes, Route} from 'react-router-dom';
import AddUser from 'routes/user';
import CheckUser from 'routes/check';
import UserProvider from 'context/user-context';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/user-form">
            <Route path=":id" element={<AddUser />} />
            <Route path="" element={<AddUser />} />
          </Route>
          <Route path="/check-user">
            <Route path=":id" element={<CheckUser />} />
          </Route>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
