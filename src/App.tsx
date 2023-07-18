import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import TopLayer from './layout';
import { fetchPosts } from './redux/action';
import { AppDispatch } from './redux/store';



function App() {
  const dispatch : AppDispatch = useDispatch();
  dispatch(fetchPosts());
  return (
    <div className="App">
    <TopLayer/>
    </div>
  );
}

export default App;
