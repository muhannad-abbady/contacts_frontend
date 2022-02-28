import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
// import Sidebar from './Sidebar';
import Footer from './Footer';

const Page = (props) => {
    document.title = props.title;
    return (
        <>
            <Header />
            <div className="container bd-layout">
                <div className="row">
                    {/* <Sidebar /> */}
                    <div className="col-md-12 text-center p-3">
                        {props.children}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Page;
