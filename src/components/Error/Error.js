


function Error(props){


    function renderError(){
        let {errors}=props
        if(errors&& Object.keys(errors).length>0){
            return Object.keys(errors).map((key,value)=>{
                return(
                    <li key={key}>{errors[key]}</li>
                )
            })
        }
    }





    return(
        <>
            {renderError()}
           
        </>
    )
}
export default Error;