import React from 'react';
import img from '../assets/images/contacts.jpg';
import Page from '../layouts/Master';

const Home = () => {
    return (
        <Page title="home">
            <main className="py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 text-left pt-5">
                            <h1 className="mb-5 mt-5">Contacts Management </h1>
                            <p>A contact list is a feature found in instant messaging, email clients, mobile phones, online games or communities and is usually nothing but a collection of screen names. Various trademarks and proprietary names exist for contact lists in different contexts. A contact list shows screen names that represent actual people for communicating or sharing information.

                                In some contexts, a contact list is also known as a buddy list.

                                Techopedia Explains Contact List</p>
                        </div>
                        <div className="col align-self-end">
                            <img src={img} />
                        </div>
                    </div>
                </div>
            </main>
        </Page>
    )
}

export default Home;