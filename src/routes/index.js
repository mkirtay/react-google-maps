import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import { HomePage } from "../pages/index";

const RoutesComp = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />}/>
            </Routes>
        </Router>
    )
}

export default RoutesComp;
