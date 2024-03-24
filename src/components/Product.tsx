import React, {ChangeEvent, useEffect, useState} from "react";
import {storage} from "../config/firebase.ts";
import axiosInstance from "../config/AxiosInstance.ts";
import {Modal} from "react-bootstrap";

interface Product{
    _id:string,
    name:string,
    description:string,
    image:string,
    unitPrice:number,
    qtyOnHand:number
}
export const Product = () => {
    const styleObj :React.CSSProperties = {
        marginBottom:"20px"
    }

    const [products,setProducts]=useState<Product[]>([]);
    const [name,setName] = useState("");
    const [unitPrice,setUnitPrice]=useState<number|"">("");
    const [qtyOnHand,setQtyOnHand]  = useState<number|"">("");
    const [description,setDescription] = useState("");
    const [image,setImage] = useState<File|null>(null);
    const [selectedProductId,setSelectedProductId] = useState("");

    const [updateName,setUpdateName] = useState("");
    const [updateUnitPrice,setUpdateUnitPrice]=useState<number|"">("");
    const [updateQtyOnHand,setUpdateQtyOnHand]  = useState<number|"">("");
    const [updateDescription,setUpdateDescription] = useState("");
    const [updateImage,setUpdateImage] = useState<File|null>(null);
    const [modalState,setModalState] = useState(false);

    const handleImageChange =(e:ChangeEvent<HTMLInputElement>)=>{
        if (e.target.files && e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }



    const uploadImage =async (file:File):Promise<string|null>=>{

    }

    const deleteProduct =async (id)=>{
        console.log(id)
        try {
            const response = await axiosInstance.delete('/products/delete-by-id/'+id);
            if (response.status ===204) findAllProducts();

        }catch (e){
            console.log(e);
        }
    }

    const updateProduct = async ()=>{
        try{
            const response =  await axiosInstance.put('/products/update/'+selectedProductId,{
                name:updateName,unitPrice:updateUnitPrice,qtyOnHand:updateQtyOnHand,description:updateDescription,imageUrl:updateImage
            });
            if (response.status === 200){
                setModalState(false);
                findAllProducts();
            }


        }catch (e){
            console.log(e)
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

    const saveProducts =async ()=>{
        let imageurl = "https://www.gamestreet.lk/images/products/2303.jpg"

        if(image){
            try{
                const storageRef = storage.ref();
                const imageRef = storageRef.child(`images/${Math.random()+'-'+image.name}`);
                const snapshot = await imageRef.put(image);
                imageurl = await snapshot.ref.getDownloadURL();
            }catch (e){
                console.log(e)
            }
        }

        const data = {
            name:name,
            description:description,
            image:imageurl,
            unitPrice:unitPrice,
            qtyOnHand:qtyOnHand

        }
        try{
            const response = await axiosInstance.post("/products/create",data);
            if (response.status === 201){
                setName("")
                setUnitPrice("");
                setQtyOnHand("");
                setDescription("");
                setImage(null);
                findAllProducts();
            }else{
                console.log(response)
            }
        }catch (e){
            console.log(e)
        }
    }

    const loadModal =async (id)=>{
        try {
            const response = await axiosInstance.get("products/find-by-id/"+id);
            if (response.status === 200){
                setModalState(true);
                setUpdateName(response.data.data.name)
                setUpdateUnitPrice(response.data.data.unitPrice);
                setUpdateQtyOnHand(response.data.data.qtyOnHand);
                setUpdateDescription(response.data.data.description);
                setSelectedProductId(response.data.data._id);
            }else{
                console.log(response);
            }
        }catch (e){
            console.log(e);
        }
    }

    useEffect(()=>{
        findAllProducts();
    },[]);

    return (
        <>
            <br/>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-12 col-sm-6 col-md-4"} style={styleObj}>
                        <div className={"form-group"}>
                            <label htmlFor={"productName"}>Product Name</label>
                            <input type={"text"} value={name} onChange={(e)=>setName(e.target.value)} className={"form-control"} id={"productName"}/>
                        </div>
                    </div>
                    <div className={"col-12 col-sm-6 col-md-4"} style={styleObj}>
                        <div className={"form-group"}>
                            <label htmlFor={"price"}>Unit Price</label>
                            <input type={"number"} value={unitPrice} onChange={(e)=>setUnitPrice(e.target.value==""?"":parseFloat(e.target.value))} className={"form-control"} id={"price"}/>
                        </div>
                    </div>
                    <div className={"col-12 col-sm-6 col-md-4"} style={styleObj}>
                        <div className={"form-group"}>
                            <label htmlFor={"qtyOnHand"}>Qty On Hand</label>
                            <input type={"text"} value={qtyOnHand} onChange={(e)=>setQtyOnHand(e.target.value==""?"":parseFloat(e.target.value))} className={"form-control"} id={"qtyOnHand"}/>
                        </div>
                    </div>
                    <div className={"col-12 col-sm-6 col-md-4"} style={styleObj}>
                        <div className={"form-group"}>
                            <label htmlFor={"image"}>Product Image</label>
                            <input type={"file"} onChange={handleImageChange} className={"form-control"} id={"image"}/>
                        </div>
                    </div>
                    <div className={"col-12"} style={styleObj}>
                        <div className={"form-group"}>
                            <label htmlFor={"description"}>Description</label>
                            <textarea rows={5} value={description} onChange={(e)=>setDescription(e.target.value)} className={"form-control"} id={"description"}/>
                        </div>
                    </div>
                </div>
                <div className={"row mt-4"}>
                    <div className={"col-12"}>
                        <button onClick={saveProducts} type={"submit"} className={"btn btn-primary col-12"} >Save Product</button>
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
                                <th>Qty On Hand</th>
                                <th>Unit Price</th>
                                <th>Delete Option</th>
                                <th>Update Option</th>
                                <th>See More</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                products.map((product,index)=>
                                    <tr key={index}>
                                        <td>{product.name}</td>
                                        <td>{product.qtyOnHand}</td>
                                        <td>{product.unitPrice}</td>
                                        <td><button onClick={()=>{
                                            if (confirm("Are you sure?")){
                                                deleteProduct(product._id);
                                            }
                                        }} className={"btn btn-danger btn-sm"}>Delete</button> </td>
                                        <td><button className={"btn btn-outline-success btn-sm"} onClick={e=>loadModal(product._id)}>Update</button> </td>
                                        <td><button className={"btn btn-outline- btn-sm"}>More Info</button> </td>
                                    </tr>
                                )
                            }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal show={modalState}>
                <div className={"p-4"}>
                    <h2>Update Product</h2>
                    <hr/>
                    <div className="col-12">
                        <div className={"form-group mt-2 mb-3"}>
                            <input value={updateName} onChange={(e)=>setUpdateName(e.target.value)} type={"text"} className={"form-control"}/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className={"form-group mt-2 mb-3"}>
                            <input value={updateUnitPrice} onChange={(e)=>setUpdateUnitPrice(e.target.value)} type={"text"} className={"form-control"}/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className={"form-group mt-2 mb-3"}>
                            <input value={updateQtyOnHand} onChange={(e)=>setUpdateQtyOnHand(e.target.value==""?"":parseFloat(e.target.value))} type={"text"} className={"form-control"}/>
                        </div>
                    </div>
                    <div className={"col-12"}>
                        <button onClick={updateProduct} className={"btn btn-success col-12 m-1"}>Update Product</button>
                        <button className={"btn btn-secondary col-12 m-1"} onClick={()=>setModalState(false)}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default Product;
