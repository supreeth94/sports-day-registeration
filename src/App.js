import './App.css';
import { routesElements } from './modules/common/Routes';
import { useRoutes } from 'react-router-dom';


function App() {

  let routes = useRoutes(routesElements);
  
  return (
    <div className="App">
        {routes}
    </div>
  );
}

export default App;
