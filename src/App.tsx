import { ToastContainer } from "react-toastify";
import { ClasorFileManagement } from "./components/clasorFileManagement";
                                                                         

const App = () => {
  return (
    <div dir="rtl">
      <ClasorFileManagement />
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          zIndex: 99_999,
        }}
        toastStyle={{
          borderRadius: "8px",
          fontSize: "14px",
          fontFamily: "iranYekan !important",
          fontWeight: 400,
          lineHeight: "19.6px",
          letterSpacing: "-0.14px",
          padding: "12px 16px",
        }}
        bodyStyle={{
          margin: 0,
          padding: 0,
        }}
        theme="colored"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      />
    </div>
  );
};

export default App;
