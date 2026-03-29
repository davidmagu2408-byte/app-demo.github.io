import "./index.css";

const LoadingBar = ({ progress }) => {
  return (
    <div className="loading-bar-container">
      <div className="loading-bar-fill" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default LoadingBar;
