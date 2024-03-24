import React, {useEffect, useState} from "react";
import customer from "./Customer.tsx";
import axiosInstance from "../config/AxiosInstance.ts";
import Product from "./Product.tsx";
import Customer from "./Customer.tsx";

interface Cart  {
    _id:string | undefined,
    description:string | undefined,
    unitPrice:number | undefined,
    qty:number | undefined,
    total:number | undefined
}
const Order = () => {
    const styleObj :React.CSSProperties = {
        marginBottom:"20px"
    }

    const bottomContext:React.CSSProperties={
        width:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between"
    }

    const totalText:React.Component={
        color:"red",
        margin:"0"
     }

     const [customerDetails, setCustomerDetails] = useState<customer[]>([]);
     const [name , setName] = useState("");
     const [address , setAddress] = useState("");
     const [salary , setSalary] = useState<number|"">("");
     const [productDescription, setProductDescription] = useState("");
     const [unitPrice, setUnitPrice]  = useState<number>(0);
     const [qtyOnHand,setQtyOnHand] = useState<number>(0);
     const [products, setProducts] = useState<Product[]>([]);
     const [cart,setCart] = useState<Cart[]>([]);
     const [selectedCustomer , setSelectedCustomer] = useState<Customer | null>(null);
     const [selectedProduct , setSelectedProduct] = useState<Product | null>(null);
     const [userQty , setUserQty] = useState<number>(0);
     const [netTotal , setNetTotal] = useState<number>(0)

    const calculateTotal =()=>{
         let amount = 0;
         console.log(cart)
    }

    const findAllCustomer = async ()=>{
        try {
            const response = await axiosInstance.get('/customer/find-all?searchText=&page=1&size=10');
            if (response.status  === 200){
                setCustomerDetails(response.data);
            }
        }catch (e){
            console.log(e);
        }
    }

    const getCustomerById =async (id)=>{
        try {
            const response = await axiosInstance.get("customer/find-by-id/"+id);
            if (response.status === 200){
                setSelectedCustomer(response.data.data);
                setName(response.data.data.name);
                setAddress(response.data.data.address);
                setSalary(response.data.data.salary);
             }else{
                console.log(response);
            }
        }catch (e){
            console.log(e);
        }
    }

    const findAllProducts = async ()=>{
        try {
            const response = await axiosInstance.get('/products/find-all?searchText=&page=1&size=10');
            if (response.status  === 200){
                setProducts(response.data);
            }
        }catch (e){
            console.log(e);
        }
    }

    const findProductById = async (id)=>{
        try {
            const response = await axiosInstance.get("products/find-by-id/"+id);
            if (response.status === 200){
                setSelectedProduct(response.data.data);
                setProductDescription(response.data.data.description);
                setUnitPrice(response.data.data.unitPrice);
                setQtyOnHand(response.data.data.qtyOnHand);
            }else{
                console.log(response);
            }
        }catch (e){
            console.log(e);
        }
    }

    const clearProducts =()=>{

    }

    const addToCart =(newItem:Cart)=>{
         setCart((prevState)=>[...prevState,newItem]);
    }

    useEffect(()=>{
        findAllCustomer();
        findAllProducts();
     },[])
    return (
        <>
            <br/>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-12 col-sm-6 col-md-3"} style={styleObj}>
                        <div className={"form-group"}>
                            <label htmlFor={"customer"}>Customer</label>
                            <select onChange={(e)=>{getCustomerById(e.target.value)}} name={""} id={"customer"} className={"form-control"}>
                                <option defaultValue={""}>Select Value</option>
                                {
                                    customerDetails.map((customer,index)=>(
                                        <option key={index} value={customer._id}>{customer.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className={"col-12 col-sm-6 col-md-3"} style={styleObj}>
                        <div className={"form-group"}>
                            <label htmlFor={"address"}>Customer Address</label>
                            <input readOnly={true} type={"text"} value={address} className={"form-control"} id={"address"}/>
                        </div>
                    </div>
                    <div className={"col-12 col-sm-6 col-md-3"} style={styleObj}>
                        <div className={"form-group"}>
                            <label htmlFor={"salary"}>Salary</label>
                            <input readOnly={true} type={"number"} value={salary} className={"form-control"} id={"salary"}/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className={"row"}>
                    <div className={"col-12 col-sm-6 col-md-3"} style={styleObj}>
                        <div className={"form-group"}>
                            <label htmlFor={"customer"}>Select Product</label>
                            <select onChange={(e)=>findProductById(e.target.value)} name={""} id={"product"} className={"form-control"}>
                                <option defaultValue={""} >Select Product</option>
                                {
                                    products.map((product,index)=>(
                                        <option value={product._id} key={index}>{product.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className={"col-12 col-sm-6 col-md-3"} style={styleObj}>
                        <div className={"form-group"}>
                            <label htmlFor={"description"}>Product Description</label>
                            <input readOnly={true} value={productDescription} type={"text"} className={"form-control"} id={"description"}/>
                        </div>
                    </div>
                    <div className={"col-12 col-sm-6 col-md-2"} style={styleObj}>
                        <div className={"form-group"}>
                            <label htmlFor={"price"}>Unit Price</label>
                            <input readOnly={true} value={unitPrice} type={"number"} className={"form-control"} id={"price"}/>
                        </div>
                    </div>
                    <div className={"col-12 col-sm-6 col-md-2"} style={styleObj}>
                        <div className={"form-group"}>
                            <label htmlFor={"qtyOnHand"}>Qty on Hand</label>
                            <input readOnly={true} value={qtyOnHand} type={"number"}  className={"form-control"} id={"qtyOnHand"}/>
                        </div>
                    </div>
                    <div className={"col-12 col-sm-6 col-md-2"} style={styleObj}>
                        <div className={"form-group"}>
                            <label htmlFor={"qty"}>Qty</label>
                            <input onChange={(e)=>setUserQty(parseFloat(e.target.value))} type={"number"} className={"form-control"} id={"qty"}/>
                        </div>
                    </div>
                </div>
                <div className={"row mt-4"}>
                    <div className={"col-12"}>
                        <button type={"submit"} className={"btn btn-primary col-12"} onClick={()=>{
                            const cartProduct:Cart={
                                _id:selectedProduct?._id,
                                description:selectedProduct?.description,
                                unitPrice:selectedProduct?.unitPrice,
                                qty:userQty,
                                total:(userQty*selectedProduct?.unitPrice)
                            }
                            addToCart(cartProduct);
                            clearProducts();
                            calculateTotal();
                        }} >Add Product</button>
                    </div>
                </div>
                <hr/>
                <div className={"row"}>
                    <form className={"col-12"}>
                        <input type={"search"} className={"form-control"} placeholder={"Search Product"}/>
                    </form>
                </div>
                <br/>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <table className={"table table-hover table-bordered"}>
                            <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Unit Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                                <th>Delete Option</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                cart.map((item,index)=>(
                                    <tr key={index}>
                                        <td>{item.description}</td>
                                        <td>{item.unitPrice}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.total}</td>
                                        <td><button onClick={(e)=>{
                                             setCart((prevState)=>prevState.filter((cartData)=>cartData._id!=item._id));
                                            calculateTotal();
                                        }} className={"btn btn-outline-danger btn-sm"}>Remove</button> </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        <br/>
                        <div className={"bottom-context"} style={bottomContext}>
                            <div className={"total-outer"}>
                                <h1 style={totalText}>Total : {netTotal}</h1>
                            </div>
                            <div className={"place-order-button-context"}>
                                <button className={"btn btn-primary"} onClick={async ()=>{
                                    const result = await axiosInstance.post("orders/create",{
                                        date:new Date(),
                                        customerDetails:selectedCustomer,
                                        totalCost:1000,
                                        product:cart
                                    });
                                    console.log(result)

                                }}>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Order;
