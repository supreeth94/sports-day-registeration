import Home from './components/Home';
import Login from '../login/components/Login';
import EventRegistration from '../registration/components/EventRegistration';
import ErrorPage from './components/ErrorPage';

export const routesElements = [
    {
      path: '/',
      children:[
        {
          index:true,
          element:<Home/>,
        },
        {
          path: '/login',
          element: <Login type="Login"/>
        },
        {
          path: '/signup',
          element: <Login type="Sign Up"/>
        },
        {
          path: '/register',
          element: <EventRegistration/>
        }
      ]
    },
    {
      path:'*',
      element: <ErrorPage/>
    }
  ];