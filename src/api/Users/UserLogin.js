import {service} from '../../services/BaseService'
import {USER_LOGIN} from '../Constants'

const UserLogin = async (params) =>{
    const configs ={
        
    };
    return service.postJSON(USER_LOGIN,params,configs)
}

export default UserLogin