import React from "react";
import "./Navigation.css"


const Navigation = ({ onRouteChange, isSignedIn }) => {
        if(isSignedIn) {
            return (
                <nav className="signOut" style={{display: 'flex', justifyContent: 'flex-end'}}>
                    
                    <p onClick={() => onRouteChange('signout')} 
                    className=" f3 ba br4 fltc shadow-2  pointer link dim black ma2">Sign Out</p>
                
                </nav>
            )
        } else {
            return (
                <nav className="signIn" style={{display: 'flex', justifyContent: 'flex-end'}}>
                    
                    <p onClick={() => onRouteChange('signin')} 
                    className=" f3 ba br4 fltc shadow-2  pointer link dim black ma2">
                    Sign In
                    </p>
                    
                    <p 
                    onClick={() => onRouteChange('register')} 
                    className=" f3 ba br4 fltc shadow-2  pointer link dim black ma2"
                    >
                    Register
                    
                    </p>
                </nav>

            )
        }
        
    
}

export default Navigation