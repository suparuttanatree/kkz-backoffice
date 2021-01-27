import {service} from '../../services/BaseService'
import {GET_ADMIN} from '../Constants'

const GetAdmin = async () =>{
    const configs ={
        
    };
    return service.getJSON(GET_ADMIN,configs)
}

export default GetAdmin