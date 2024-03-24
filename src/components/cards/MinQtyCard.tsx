import React from "react";

interface ProductProps{
    image:string,
    description:string,
    name:string
}

const MinQtyCard = (props:ProductProps) => {
    const maxWidthStyle:React.CSSProperties={
        width:'100%',
        marginBottom:'10px'
    }

    return (
        <div className="card" style={maxWidthStyle}>
            <img src={props.image} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.description}</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
        </div>
    );
};

export default MinQtyCard;
