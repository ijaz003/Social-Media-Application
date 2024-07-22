import React from 'react';

const SubscribeBox = () => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w mx-auto mt-8">
      <h2 className="text-white text-2xl font-bold mb-4">Get more updates...</h2>
      <p className="text-gray-400 mb-6">
        Do you want to get notified when a new component is added to Flowbite? Sign up for our newsletter and you'll be among the first to find out about new features, components, versions, and tools.
      </p>
      <div className="flex items-center mb-6">
        <input
          type="email"
          placeholder="Your email address..."
          className="w-full px-4 py-3 text-gray-900 rounded-l-lg focus:outline-none text-base"
        />
        <button className="bg-blue-600 text-white px-5 py-3 rounded-r-lg hover:bg-blue-700 transition-colors text-base">
          Subscribe
        </button>
      </div>
      <p className="text-gray-400 text-sm">
        By subscribing, you agree with ConvertKit's <a href="#" className="text-blue-400 underline">Terms of Service</a> and <a href="#" className="text-blue-400 underline">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default SubscribeBox;
