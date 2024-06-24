import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";

function Contact() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("no name");
  const [email, setEmail] = useState("example@gmail.com");
  const [message, setMessage] = useState("");
  const api_url = import.meta.env.VITE_REACT_APP_API_URL;

  const handleSubmit = () => {
    const data = {
      name,
      email,
      message,
    };

    setLoading(true);

    axios
      .post(`${api_url}/send-mail`, data)
      .then((response) => {
        setLoading(false);
        alert("email sent");
      })
      .catch((error) => {
        setLoading(false);
        alert("unable to send email...try later");
        console.log(error);
      });
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container w-full px-4 py-8 bg-gray-100 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-indigo-800">
            Contact Us
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              type="text"
              placeholder="Enter Your Name"
              className="block w-full px-4 py-3 mb-4 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <input
              type="email"
              placeholder="Enter Your Email"
              className="block w-full px-4 py-3 mb-4 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <textarea
              placeholder="Enter Your Message"
              className="block w-full px-4 py-3 mb-6 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={5}
              required
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></textarea>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Contact;
