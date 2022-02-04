import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const GET = (url,formData,config, target)  => {

    axios.get(url) 
        .then( (response) => {
            console.log("get api call response ",url," ",response.data);
            target(response.data,null)
        })
        .catch((error) => {
            console.log("We have a server error",url," ", error);
            target(null,error)
            const errorData = error.response.data
            if(errorData.error_code==='NEO478'){ //token expired
                localStorage.removeItem('@token')
                //show error modal
            }
        });
}

export const POST = (url,formData,config, target)  => {
    axios.post(url,formData,config) 
        .then( (response) => {
            console.log("post api call response ",url," ",response.data);
            target(response.data,null)
        })
        .catch((error) => {
            console.log(`We have a server error`,url, " ",error);
            target(null,error)
            const errorData = error.response.data
            if(errorData.error_code==='NEO478'){ //token expired
                localStorage.removeItem('@token')
                //show error modal
            }
        });
}
