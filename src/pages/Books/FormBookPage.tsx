import HeroSection from "../../components/Books/HeroSection.tsx";
import BookForm from "../../components/Books/BookForm.tsx";

export default function FormBookPage(){
    return (
        <>
            <HeroSection fullName="Book Page" title="Book store" />
            <div className="container position-absolute top-50 ms-5">
                <div className="row justify-content-start">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <h2>Add Book</h2>
                                    <BookForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}