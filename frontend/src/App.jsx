import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <Home />;
    </>
  );
}

export default App;
