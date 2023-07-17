import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import TopLayer from './layout';
import { fetchPosts } from './redux/action';



function App() {
  const dispatch : any = useDispatch();
  dispatch(fetchPosts());
  
  return (
    <div className="App">
    <TopLayer/>
    </div>
  );
}

export default App;
