import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <HomePage />
      <Toaster position="bottom-left" reverseOrder={false} />
    </div>
  );
}

export default App;
