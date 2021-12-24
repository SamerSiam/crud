
import React from "react";

    class Button extends React.Component{
        
        onHandleClick=()=>{
            this.props.onHandleClick()
             }


        render (){
            return (
                <div>
                <button onClick={this.onHandleClick}>{this.props.text} </button>
                </div>
                );
        }
    }
    export default Button;