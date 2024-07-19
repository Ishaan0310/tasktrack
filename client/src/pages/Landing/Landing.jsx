import './Landing.css';
import { useNavigate } from 'react-router-dom';
import taskTrekImage from 'D:/Projects/tasktrekkk/client/src/assets/TaskTrek_/project.jpg'; // Import the image

function Landing() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const landingPage = document.querySelector('.landing-page');
    landingPage.classList.add('slide-up');
    setTimeout(() => {
      navigate('/register');
    }, 1000);
  };

  return (
    <div className="landing-container">
      <div className="landing-page">
        <div className="content">
          <div className="image-container">
            <img src={taskTrekImage} alt="Task Trek" className="task-trek-image" />
          </div>
          <div className="text-and-image">
            <div className="text">
              <h1 className="title">Welcome to</h1>
              <h1 className="title">TaskTrek: Your Project Navigator</h1>
              <p className="subtitle">This productive tool is designed to help you better manage your tasks project-wise conveniently!</p>
              <button className="lets-go-button" onClick={handleButtonClick}>
                <span className="button-text">Let's Go</span>
                <span className="button-icon">🚀</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="left">Web app</div>
        <div className="right">Created by <a href="https://portfolioishaan.netlify.app/" target="_blank" rel="noopener noreferrer">Ishaan Pandey</a>
            <p>Under the Guidance of <a href="https://www.bmu.edu.in/faculty/mr-anubhav-agrawal/" target="_blank" rel="noopener noreferrer">Dr Anubhav Agrawal</a></p>
            </div>
      </div>
    </div>
  );
}

export default Landing;
