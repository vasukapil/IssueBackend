import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CreateIssuePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [labels, setLabels] = useState([]);
  const [author, setAuthor] = useState("");
  const params = useParams();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLabelsChange = (e) => {
    const selectedLabels = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setLabels(selectedLabels);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

//   console.log(labels);

  const handleSubmit = (e) => {
    e.preventDefault();
    const issueData = {
      title,
      projectId: params.projectid,
      author,
      label : labels,
      desc: description,
    };

      axios
        .post("http://localhost:5000/bug", issueData)
        .then((response) => {
        //   console.log("Project created:", response.data);
          window.location.reload();
          // Reset form fields
          setTitle("");
          setAuthor("");
          setDescription("");
        })
        .catch((error) => {
          alert("Error creating project:", error.message);
        });

    // TODO: Handle form submission logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Create Issue</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="labels"
            className="block text-gray-700 font-semibold mb-2"
          >
            Labels
          </label>
          <input
            placeholder="Add Labels seperated by commas"
            onChange={(e) => {
              setLabels(e.target.value.split(","));
            }}
          ></input>
        </div>

        <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-gray-700 font-semibold mb-2"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Create Issue
        </button>
      </form>
    </div>
  );
};

export default CreateIssuePage;
