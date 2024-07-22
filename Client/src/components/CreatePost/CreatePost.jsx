import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'
import service from '../../BackEndServices/confi';

function CreatePost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImage = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("caption", caption);
      const token = localStorage.getItem("token");
      await service.createPost(formData, token).then(res => {
        if (res.statusText === "OK") {
          alert(res.data.message)
        }
      })
      setCaption("")
      setImage(null)
      navigate("/home")
    }
    catch(error){
      alert(error.message || error.error)
    }
  }
  return (
    <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-6">
          Create a New Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Selected"
                    className="mx-auto h-48 w-48 object-cover rounded-md"
                  />
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H10C8.9 8 8 8.9 8 10V38C8 39.1 8.9 40 10 40H38C39.1 40 40 39.1 40 38V20L28 8ZM16 36H12V32H16V36ZM16 30H12V26H16V30ZM16 24H12V20H16V24ZM24 36H20V32H24V36ZM24 30H20V26H24V30ZM24 24H20V20H24V24ZM32 36H28V32H32V36ZM32 30H28V26H32V30ZM32 24H28V20H32V24ZM20 16V10.5L27.5 18H22C21.4 18 20.8 17.8 20.4 17.4C20 17 20 16.4 20 16Z"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="image"
                          type="file"
                          className="sr-only"
                          onChange={handleImage}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
              Caption
            </label>
            <div className="mt-1">
              <textarea
                id="caption"
                name="caption"
                rows="3"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              ></textarea>
            </div>
          </div>
          <Button type="submit" text="Post" />
        </form>
      </div>
    </div>
  )
}

export default CreatePost
