import MainView from "src/views/MainView";
import ErrorBoundary from "../error-boundary/error-boundary";

function App() {
  return (
    <ErrorBoundary>
      <MainView />
    </ErrorBoundary>
  );
}

export default App;
