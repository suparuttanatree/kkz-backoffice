import {service} from '../../services/BaseService'
import {GET_USER} from '../Constants'

const GetUser = async () =>{
    const configs ={
        
    };
    return service.getJSON(GET_USER,configs)
}

export default GetUser