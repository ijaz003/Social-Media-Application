import axios from "axios"

class AuthService{
    constructor(baseURL){
        this.api=axios.create({
            baseURL,
        })
    }

    async signin({email,password}){
       try{
        const response=await this.api.post('/signin',{email,password});
        return response;
       }
       catch(error){
            throw error.response.data;
       }
    }

    async signup({email,password,name}){
        try{
         const response=await this.api.post('/signup',{email,password,name});
         return response;
        }
        catch(error){
             throw error.response.data;
        }
     }

     async forgotPasword(email) {
        try {
          const response = await this.api.post('/forgot-password', { email });
          return response;
        } catch (error) {
          throw error.response;
        }
      }
}

const authService=new AuthService("http://localhost:5000");
export default authService;