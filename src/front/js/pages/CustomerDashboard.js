import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Context } from "../store/appContext";
import { CustomerWorkOrder } from "./CustomerWorkOrder";

export const CustomerDashboard = () => {

    const { store, actions } = useContext(Context);
    const [editMode, setEditMode] = useState(false);
    const [customer, setCustomer] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        id: null,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const getCurrentCustomer = async () => {
            setCustomer(await actions.getCurrentCustomer())
        }
        try {
            if (!sessionStorage.getItem("token") || !sessionStorage.getItem("customerId")) {
                navigate("/customer-log-in");
            } else {
                getCurrentCustomer();
            }
        } catch (err) {
            console.error(err);
        }
    }, []);



    const handleEditSubmit = async () => {
        let result = await actions.editCustomerbyCustomer(customer);
        if (result) {
            setEditMode(false);
        } else {
            alert("Failed to update user data");
        }
    };


    return (
        <div className="container pt-5">
            <h2>Welcome to Customer Dashboard</h2>
            {customer.id != null ? (
                <div>
                    {editMode ?
                        (
                            <div>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={customer.first_name}
                                    onChange={(e) => setCustomer({ ...customer, first_name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="last_name"
                                    value={customer.last_name}
                                    onChange={(e) => setCustomer({ ...customer, last_name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="email"
                                    value={customer.email}
                                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    value={customer.phone}
                                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="address"
                                    value={customer.address}
                                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                                />
                                <button onClick={handleEditSubmit}>Save</button>
                            </div>
                        ) :
                        (
                            <div>
                                <p><strong>Email:</strong> {customer.email}</p>
                                <p><strong>First Name:</strong> {customer.first_name}</p>
                                <p><strong>Last Name:</strong> {customer.last_name}</p>
                                <p><strong>Phone:</strong> {customer.phone}</p>
                                <p><strong>Address:</strong> {customer.address}</p>
                                <button onClick={() => setEditMode(true)}>Edit</button>
                            </div>
                        )}
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );

    // return (
    //     <div className="customer-dashboard">

    //         <div className="profile-form, container pt-5">
    //             <h2>Welcome to Customer Dashboard!</h2>
    //             {data ? (
    //                 <div>
    //                     <p><strong>Email:</strong> {customerId.data.email}</p>
    //                     <p><strong>First Name:</strong> {customerId.data.first_name}</p>
    //                     <p><strong>Last Name:</strong> {customerId.data.last_name}</p>
    //                     <p><strong>Phone:</strong> {customerId.data.phone}</p>
    //                     <p><strong>Address:</strong> {customerId.data.address}</p>
    //                 </div>
    //             ) : (
    //                 <p>Loading user data...</p>
    //             )}
    //         </div>

    //         <h2>Work Orders</h2>
    //         <CustomerWorkOrder customerId={store.customerId} />

    //     </div>

    // );
}