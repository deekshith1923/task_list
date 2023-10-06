import { CgProfile } from "react-icons/cg";

function Navbar() {

    return (
        <div className="d-flex p-2 justify-content-between fixed-top" style={{ backgroundColor: "#1976d2" }}>

            <div className='ps-3 d-inline text-light' >
                <div className=' d-inline ps-3  fw-bold text-warning fs-5'>
                    Task List
                </div>
            </div>

            <div className='d-inline pe-3 text-light'>
                <div className='row'>
                    <div className='col xs-auo'>
                        <CgProfile size={"20px"} className="me-3" />
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Navbar;