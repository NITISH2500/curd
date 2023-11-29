import Listing from './components/Listing';
import Add from './components/Add';
import {
  BrowserRouter,
 Routes,
  Route,
  
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Listing/>}/>
        <Route exact path="/create" element={<Add/>}/>
        <Route exact path="/update/:id" element={<Add/>}/>
      </Routes>
      
     
      </BrowserRouter>
   
    </div>
  );
}

export default App;
