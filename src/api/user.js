import axios from '../utils/axios'
export const UserLogin=(username,password)=>{
    return new Promise((resolve,reject)=>{
        let url='/api/user/login'
        axios.post(url,{us:username,ps:password})
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    })
}