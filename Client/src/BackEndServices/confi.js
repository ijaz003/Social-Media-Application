import axios from "axios";

class Service {
    constructor(baseUrl) {
        this.api = axios.create({
            baseURL: baseUrl,
        });
    }

    async createPost(formData,token) {
        try {
            const response = await this.api.post("/createpost",formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: token,
                },
            });
            return response; 
        } catch (error) {
            throw error.response;
        }
    }

    async getUserData(token) {
      try {
        const response = await this.api.get("/getuser", {
          headers: {
            Authorization: token,
          },
        });
        return response;
      } catch (error) {
        throw error.response;
      }
    }  
    async updateProfile(formData,token){
      try{
        const response=this.api.post("/profile-edit",formData,{
          headers:{
            "Content-Type":"multipart/form-data",
            Authorization:token
          }
        })
      }
      catch(error){
        throw error.response
      }
    }
    async allPost() {
        try {
          const response = await this.api.get("/post", {});
          if (response.status === 200) {
            return response.data;
          } else {
            throw new Error('Failed to fetch posts');
          }
        } catch (error) {
          console.error('Error fetching posts:', error);
          throw error;
        }
      }
      
}

   
const service = new Service("http://localhost:5000");
export default service;
