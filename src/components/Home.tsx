import DefaultCard from "./cards/DefaultCard.tsx";
import DefaultChart from "./cards/DefaultChart.tsx";
import MinQtyCard from "./cards/MinQtyCard.tsx";
import axiosInstance from "../config/AxiosInstance.ts";
import {useEffect, useState} from "react";
import Product from "./Product.tsx";
const Home = () => {
    const [productCount, setProductCounts] = useState<number|"">();
    const [products, setProducts] = useState<Product[]>([]);
    const [customerCounts, setCustomerCounts] = useState<number|"">(0);
    const [orderCounts , setOrderCounts] = useState<number|"">(0);
    const [orderIncome, setOrderIncome] = useState(0)
    const findMinProducts = async ()=>{
        try {
            const response = await axiosInstance.get('/products/find-all-min');
            if (response.status  === 200){
                setProducts(response.data);
            }
        }catch (e){
            console.log(e);
        }
    }

    const findProductCounts = async ()=>{
        try {
            const response = await axiosInstance.get('/products/find-all-count');
            if (response.status  === 200){
                setProductCounts(response.data);
            }
        }catch (e){
            console.log(e);
        }
    }

    const findCustomerCounts = async ()=>{
        try {
            const response = await axiosInstance.get('/customer/find-counts');
            if (response.status  === 200){
                setCustomerCounts(response.data);
            }
        }catch (e){
            console.log(e);
        }
    }

    const findOrderCounts = async ()=>{
        try {
            const response = await axiosInstance.get('/orders/find-order-counts');
            if (response.status  === 200){
                setOrderCounts(response.data);
            }
        }catch (e){
            console.log(e);
        }
    }

    const findOrderIncome = async ()=>{
        try {
            const response = await axiosInstance.get('/orders/find-income');
            if (response.status  === 200){
                setOrderIncome(response.data.totalCostSum);
            }
        }catch (e){
            console.log(e);
        }
    }

    useEffect(()=>{
        findMinProducts();
        findProductCounts();
        findCustomerCounts();
        findOrderCounts();
        findOrderIncome()
    },[])

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <DefaultCard thumbnail={"https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?size=626&ext=jpg&ga=GA1.1.1333091843.1708442931&semt=sph"} description={"Customer Description"} title={"Customer"} value={customerCounts}/>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <DefaultCard thumbnail={"https://img.freepik.com/free-photo/interior-large-distribution-warehouse-with-shelves-stacked-with-palettes-goods-ready-market_342744-1481.jpg?size=626&ext=jpg&ga=GA1.1.1333091843.1708442931&semt=ais"} description={"Products Description"} title={"Products"} value={productCount}/>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <DefaultCard thumbnail={"https://img.freepik.com/free-photo/man-giving-business-presentation-using-high-technology-digital-pen_53876-104783.jpg?w=2000&t=st=1708444032~exp=1708444632~hmac=7676e2d09caf24efa5a8e09d9b781607f78b65d31c33fdc188c18d1c16dcd46c"} description={"Order Description"} title={"Orders"} value={orderCounts}/>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <DefaultCard thumbnail={"https://img.freepik.com/free-vector/stack-money-gold-coins-3d-cartoon-style-icon-coins-with-dollar-sign-wad-cash-currency-flat-vector-illustration-wealth-investment-success-savings-economy-profit-concept_74855-26108.jpg?w=1380&t=st=1708444059~exp=1708444659~hmac=815bc40401eeed1c9b2b335d02ed0186cc196048a5403755258f2b01e60afd64"} description={"Income Description"} title={"Income"} value={orderIncome}/>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col-12 col-md-9"}>
                    <div className={"context"}>
                        <DefaultChart/>
                    </div>
                </div>
                <div className={"col-12 col-md-3"}>
                    {
                        products.map((product,index)=>(
                            <MinQtyCard name={product.name} description={product.description} image={product.image} key={index}/>

                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;
