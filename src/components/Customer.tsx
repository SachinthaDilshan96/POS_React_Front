import {useEffect, useState} from "react";
import axiosInstance from "../config/AxiosInstance.ts";
import {Modal} from "react-bootstrap";

interface Customer {
    _id:string,
    name:string,
    address:string,
    salary:number
}
const Customer = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [name , setName] = useState("");
    const [address , setAddress] = useState("");
    const [salary , setSalary] = useState<number|"">("");
    const [updateName , setUpdateName] = useState("");
    const [updateAddress , setUpdateAddress] = useState("");
    const [updateSalary , setUpdateSalary] = useState<number|"">("");
    const [selectedCustomerId,setSelectedCustomerId]=useState('');
    const [modalState, setModalState]=useState<boolean>(false);

    const deleteCustomer =async (id)=>{
        try {
            const response = await axiosInstance.delete('/customer/delete-by-id/'+id);
            if (response.status ===204) findAllCustomer();

        }catch (e){
            console.log(e);
        }
    }

    const updateCustomer = async ()=>{
        try{
           const response =  await axiosInstance.put('/customer/update/'+selectedCustomerId,{
                name:updateName,address:updateAddress,salary:updateSalary
            });
           if (response.status === 200){
               setModalState(false);
               findAllCustomer();
           }


        }catch (e){
            console.log(e)
        }
    }

    const findAllCustomer = async ()=>{
        try {
            const response = await axiosInstance.get('/customer/find-all?searchText=&page=1&size=10');
            if (response.status  === 200){
                setCustomers(response.data);
            }
        }catch (e){
            console.log(e);
        }
    }

    const saveCustomer =async ()=>{
        const data = {
            "name":name,
            "address":address,
            "salary":salary
        }
        try{
            const response = await axiosInstance.post("/customer/create",data);
            if (response.status == 201){
                setName("")
                setAddress("");
                setSalary("");
                findAllCustomer();
            }else{
                console.log(response)
            }
        }catch (e){
            console.log(e)
        }
    }

    const loadModal =async (id)=>{
        try {
            const response = await axiosInstance.get("customer/find-by-id/"+id);
            if (response.status === 200){
                setModalState(true);
                setSelectedCustomerId(response.data.data._id)
                setUpdateName(response.data.data.name);
                setUpdateAddress(response.data.data.address);
                setUpdateSalary(parseFloat(response.data.data.salary));
            }else{
                console.log(response);
            }
        }catch (e){
            console.log(e);
        }
    }

    useEffect(()=>{
        findAllCustomer();
    },[])
    return (
        <>
        <br/>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-12 col-sm-6 col-md-4"}>
                        <div className={"form-group"}>
                            <label htmlFor={"customerName"}>Customer Name</label>
                            <input type={"text"} value={name} onChange={(e)=>setName(e.target.value)} className={"form-control"} id={"customerName"}/>
                        </div>
                    </div>
                    <div className={"col-12 col-sm-6 col-md-4"}>
                        <div className={"form-group"}>
                            <label htmlFor={"customerAddress"}>Customer Address</label>
                            <input type={"text"} value={address} onChange={(e)=>setAddress(e.target.value)} className={"form-control"} id={"customerAddress"}/>
                        </div>
                    </div>
                    <div className={"col-12 col-sm-6 col-md-4"}>
                        <div className={"form-group"}>
                            <label htmlFor={"customerSalary"}>Customer Salary</label>
                            <input type={"text"} value={salary} onChange={(e)=>setSalary(e.target.value==""?"":parseFloat(e.target.value))} className={"form-control"} id={"customerSalary"}/>
                        </div>
                    </div>
                </div>
                <div className={"row mt-4"}>
                    <div className={"col-12"}>
                        <button type={"submit"} onClick={saveCustomer} className={"btn btn-primary col-12"} >Save Customer</button>
                    </div>
                </div>
                <hr/>
                <div className={"row"}>
                    <form className={"col-12"}>
                        <input type={"search"} className={"form-control"} placeholder={"Search Customer"}/>
                    </form>
                </div>
                <br/>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <table className={"table table-hover table-bordered"}>
                            <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Address</th>
                                <th>Salary</th>
                                <th>Delete Option</th>
                                <th>Update Option</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                customers.map((customer,index)=>
                                    <tr key={index}>
                                        <td>{customer.name}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.salary}</td>
                                        <td><button className={"btn btn-danger btn-sm"} onClick={(e)=>{
                                            if (confirm("Are you sure?")){
                                                deleteCustomer(customer._id);
                                            }
                                        }}>Delete</button> </td>
                                        <td><button onClick={()=>loadModal(customer._id)} className={"btn btn-outline-success btn-sm"}>Update</button> </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={modalState}>
                <div className={"p-4"}>
                    <h2>Update Customer</h2>
                    <hr/>
                    <div className="col-12">
                        <div className={"form-group mt-2 mb-3"}>
                            <input value={updateName} onChange={(e)=>setUpdateName(e.target.value)} type={"text"} className={"form-control"}/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className={"form-group mt-2 mb-3"}>
                            <input value={updateAddress} onChange={(e)=>setUpdateAddress(e.target.value)} type={"text"} className={"form-control"}/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className={"form-group mt-2 mb-3"}>
                            <input value={updateSalary} onChange={(e)=>setUpdateSalary(e.target.value==""?"":parseFloat(e.target.value))} type={"text"} className={"form-control"}/>
                        </div>
                    </div>
                    <div className={"col-12"}>
                        <button onClick={updateCustomer} className={"btn btn-success col-12 m-1"}>Update Customer</button>
                        <button className={"btn btn-secondary col-12 m-1"} onClick={()=>setModalState(false)}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Customer;
