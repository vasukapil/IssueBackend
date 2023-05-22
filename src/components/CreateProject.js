import React, { useState } from "react";
import axios from "axios";

const CreateProject = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
        name,
        author,
        desc : description,
      };
  
      axios
        .post("http://localhost:5000/project", projectData)
        .then((response) => {
          console.log("Project created:", response.data);
          window.location.reload();
          // Reset form fields
          setName("");
          setAuthor("");
          setDescription("");
        })
        .catch((error) => {
          alert("Error creating project:", error.message);
        });
    };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 rounded-lg py-2 px-4 w-full"
              placeholder="Enter book name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              id="author"
              className="border border-gray-300 rounded-lg py-2 px-4 w-full"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              className="border border-gray-300 rounded-lg py-2 px-4 w-full resize-none"
              placeholder="Enter book description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
