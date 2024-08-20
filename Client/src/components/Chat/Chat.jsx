import React, { useEffect, useRef, useState } from 'react';
import socket from '../socket';
import { useSelector } from "react-redux";
import service from '../../BackEndServices/confi';


const Chat = () => {
  const inputRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [reciever, setReciever] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName,setUserName]=useState("")
  const user = useSelector(state => state.auth.userData);

  const userIds = [user._id, reciever];


  useEffect(() => {
    socket.emit("addUser", user._id);

    const fetchUsers = async () => {
      try {
        const response = await service.getAllUsers();
        setUsers(response);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, [user._id]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await service.getMessages(userIds);
        setMessages(response);
      } catch (error) {
        setError(error.message);
      }
    };

    if (reciever) {
      fetchMessages();
    }
  }, [reciever]);

  useEffect(() => {
    const handleMessage = (data) => {
      setMessages(prev => [...prev, { sender: data.senderId, content: data.text, timestamp: Date.now() }]);
      console.log(data);
    };

    socket.on("getMessage", handleMessage);

    return () => {
      socket.off("getMessage", handleMessage);  // Clean up the listener on unmount
    };
  }, []);  // Empty dependency array ensures this effect runs only once when the component mounts

  const handleSendMessage = async () => {
    const message = inputRef.current.value.trim();
    if (message) {
      socket.emit("sendMessage", { text: message, receiverId: reciever, senderId: user._id });

      try {
        await service.createChat(userIds, message, user._id);
        setMessages(prev => [...prev, { content: message, sender: user._id}]);
        inputRef.current.value = ""; // Clear the input after sending the message
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-300">
        {/* Sidebar Header */}
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
          <h1 className="text-2xl font-semibold">Chat Web</h1>
        </header>

        {/* Contact List */}
        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          {users.map((contact, index) => (
            <div
              onClick={() => {
                setMessages([])
                setReciever(contact._id)
                setUserName(contact.name)
              }}
              key={index}
              className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src={contact.profileImage} alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{contact.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 relative">
        {/* Chat Header */}
        <header className="bg-white p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">{userName}</h1>
        </header>

        {/* Chat Messages */}
        <div className="bg-gray-200 h-screen overflow-y-auto p-4 pb-36">
          {messages.map((message, index) => (
            <div key={index} className={`flex mb-4 ${message.sender === user._id ? 'justify-end' : ''}`}>
            <div className={`flex flex-col max-w-96 rounded-lg p-3 gap-1 ${message.sender === user._id ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700'}`}>
              <p>{message.content}</p>
              
            </div>
            <span className="text-xs px-4 text-gray-500 mt-1 self-end">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          
          ))}
        </div>

        {/* Chat Input */}
        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 left-0 w-full">
          <div className="flex items-center">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
            />
            <button onClick={handleSendMessage} className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Chat;
