import UserForm from "../../components/Users/UserForm.tsx";
import UserSection from "../../components/Users/UserSection.tsx";
export default function FormUserPage(){
    return (
        <>
            <UserSection fullName="User Page" title="Book store" />
            <div className="container position-absolute top-50 ms-5">
                <div className="row justify-content-start">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <h2>Add User</h2>
                                    <UserForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}