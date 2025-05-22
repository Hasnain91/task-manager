import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="overflow-x-hidden text-neutral-200 antialiased">
        <div className="fixed top-0 left-0 -z-10 h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full bg-black flex items-center justify-center">
            <div className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_10%,#000_30%,#63e_100%)]"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Home />
        </div>
      </div>
    </>
  );
}

export default App;
