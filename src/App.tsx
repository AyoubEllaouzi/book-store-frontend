import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ListUserPage from "./pages/Users/ListUserPage.tsx";
import FormUserPage from "./pages/Users/FormUserPage.tsx";
import Header from "./components/Header.tsx";
import ListBookPage from "./pages/Books/ListBookPage.tsx";
import FormBookPage from "./pages/Books/FormBookPage.tsx";
import FormLoanBookPage from "./pages/LoanBook/FormLoanPage.tsx";
import ListLoanBookPage from "./pages/LoanBook/ListLoanPage.tsx";


function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<ListUserPage/>} />
                <Route path="/users" element={<ListUserPage/>} />
                <Route path="/update-user/:id" element={<FormUserPage/>} />
                <Route path="/add-user" element={<FormUserPage/>} />

                <Route path="/books" element={<ListBookPage/>} />
                <Route path="/update-book/:id" element={<FormBookPage/>} />
                <Route path="/add-book" element={<FormBookPage/>} />

                <Route path="/loan/:id" element={<ListLoanBookPage/>} />
                <Route path="/update-loan-book/:id" element={<FormLoanBookPage/>} />
                <Route path="/add-loan" element={<FormLoanBookPage/>} />
            </Routes>
        </BrowserRouter>

    );
}

export default App;
