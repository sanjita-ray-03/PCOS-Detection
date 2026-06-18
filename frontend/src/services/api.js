import axios from "axios";


export const mlApi = axios.create({
  baseURL: "https://pcos-ml-api-nsbg.onrender.com/"
});


const api = axios.create({
 baseURL: "https://pcos-backend-y5y6.onrender.com/api"
});

api.interceptors.request.use(

 config=>{

 const token =
 localStorage.getItem(
  "token"
 );

 if(token){

  config.headers.Authorization =
  `Bearer ${token}`;

 }

 return config;

 }

);

export default api;