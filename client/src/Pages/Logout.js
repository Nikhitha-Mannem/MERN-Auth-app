import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
const Logout=()=>{
    const navigate=useNavigate();
    useEffect(()=>{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        setTimeout(()=>{
            navigate('/login')

        },1000)

    },[])

    return(null);
    



}

export default Logout;