import React from "react";
import "./ImageLinkForm.css"

const ImageLinkForm = () => {
    return (
        <div>
            <p className="f3 tc">
                {"This App will detect faces in your pictures"}
            </p>
            <div className="center form flex-column items-center shadow-2">

                <input className="f4 fl w-70 pa2 br4 bn ma3 outline-transparent" type="text" placeholder={"Put your URL here"}/>
                
                <button className=" grow f4 link ph3 pv2  white bg-light-purple bn br2 ma2">
                    {"Detect"}
                </button> 

            </div>
        </div>
    )
}

export default ImageLinkForm