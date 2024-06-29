import { ClasorFileManagement } from "./components/clasorFileManagement"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const App = () => {

  return (
    <div dir="rtl">
      <ClasorFileManagement />
      <ToastContainer
            position="bottom-left"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
    </div>
  )
}

export default App
