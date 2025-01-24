
import './App.css'
import SidebarPage from './pages/sidebar/SiderbaPage';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="container-fluid"> {/* Container bao quanh */}
        <div className="row"> {/* Sử dụng đúng cấu trúc Bootstrap */}
          <div className="col-2 " >
            <SidebarPage />
          </div>
          <div className="col-9" style={{ paddingLeft: 50, paddingTop: 50 }}>
            <Outlet /> {/* Hiển thị nội dung route con */}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
