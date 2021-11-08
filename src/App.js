import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js';
// import CreateQuestions from './pages/CreateQuestions';
import Test from './pages/Test';
import QuestionBank from './pages/QuestionBank';
import Heading from './components/Heading';
function App() {
  return (
    <div className="container">
      <Heading/>
      {/* <QuestionBank/> */}
      <Test/>
    </div>
  );
}

export default App;
