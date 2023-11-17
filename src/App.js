import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './Routes/PrivateRoute';
import { rutas_operario, rutas_admin } from './Routes/routes';
import { AppProvider } from './AppContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
     <Toaster
              toastOptions={{
                className: '',
                duration: 5000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  theme: {
                    primary: 'green',
                    secondary: 'black',
                  },
                },
              }}
            />
    <AuthProvider>
      <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>

          {rutas_admin.map((route, index) => (
            <Route key={index} path={route.path} element={
              <PrivateRoute allowedRoles={["Admin"]}>
                {route.element}
              </PrivateRoute>
            } />
          ))}

          {rutas_operario.map((route, index) => (
            <Route key={index} path={route.path} element={
              <PrivateRoute allowedRoles={["Operario"]}>
                {route.element}
              </PrivateRoute>
            } />
          ))}
        </Routes>
      </BrowserRouter>
      </AppProvider>
    </AuthProvider>
    </>

  );
}

export default App;
