import axios from "axios";

class Service {
  constructor(baseUrl) {
    this.api = axios.create({
      baseURL: baseUrl,
    });
  }

  // Helper method to attach headers
  _getHeaders(token, contentType = "application/json") {
    return {
      Authorization: token,
      "Content-Type": contentType,
    };
  }

  async createPost(formData, token) {
    try {
      const response = await this.api.post("/createpost", formData, {
        headers: this._getHeaders(token, "multipart/form-data"),
      });
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error.response || error;
    }
  }

  async getUserData(token) {
    try {
      const response = await this.api.get("/getuser", {
        headers: this._getHeaders(token),
      });
      return response.data;
    } catch (error) {
      console.error("Error getting user data:", error);
      throw error.response || error;
    }
  }

  async updateProfile(formData, token) {
    try {
      const response = await this.api.post("/profile-edit", formData, {
        headers: this._getHeaders(token, "multipart/form-data"),
      });
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error.response || error;
    }
  }

  async allPost() {
    try {
      const response = await this.api.get("/post");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error.response || error;
    }
  }

  async getAllUsers() {
    try {
      const response = await this.api.get("/get-all-users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error.response || error;
    }
  }

  // Adjusted to correctly send userIds, content, and senderId as JSON data
  async createChat(userIds, content, senderId) {
    try {
      const response = await this.api.post("/create-chat", {
        userIds,    // Expecting an array of user IDs
        content,    // Message content
        senderId    // ID of the sender
      });
      return response.data;
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error.response || error;
    }
  }

  async getMessages(userIds, content, senderId) {
    try {
      const response = await this.api.post("/get-messages", {
        userIds,
        content,
        senderId
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error.response || error;
    }
  }
}

const service = new Service("http://localhost:5000");
export default service;
