import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProjectDetailPage = () => {
  const [selectedLabels, setSelectedLabels] = React.useState([]);
  const [selectedAuthor, setSelectedAuthor] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();
  const params = useParams();
  const [bugs, setBugs] = React.useState([]);

  // Function to handle filter selection
  useEffect(() => {
    console.log(params.id)
    const bugData = {
      id : "1"
    }
    axios
      .get("http://localhost:5000/bug",bugData)
      .then((response) => {
        setBugs(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  const handleLabelSelect = (label) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((item) => item !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  // Function to handle author selection
  const handleAuthorSelect = (author) => {
    setSelectedAuthor(author);
  };

  // Function to handle search query
  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle filtering and searching bugs
  const filterAndSearchBugs = () => {
    // TODO: Implement filtering and searching logic
    console.log("Selected Labels:", selectedLabels);
    console.log("Selected Author:", selectedAuthor);
    console.log("Search Query:", searchQuery);
  };

  // Filter and search bugs based on selected labels, author, and search query
  // const filteredBugs = bugs.filter((bug) => {
  //   const hasSelectedLabels =
  //     selectedLabels.length === 0 ||
  //     selectedLabels.every((label) => bug.labels.includes(label));
  //   const hasSelectedAuthor =
  //     selectedAuthor === "" || bug.author === selectedAuthor;
  //   const matchesSearchQuery =
  //     searchQuery === "" ||
  //     bug.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     bug.description.toLowerCase().includes(searchQuery.toLowerCase());
  //   return hasSelectedLabels && hasSelectedAuthor && matchesSearchQuery;
  // });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Project Detail Page</h1>

      {/* Filter Section */}
      <div className="flex flex-wrap items-center mb-4">
        <div className="mr-4 mb-2">
          <span className="text-gray-700 font-semibold mr-2">
            Filter by Labels:
          </span>
          <button
            className={`bg-blue-500 text-white px-3 py-1 rounded-lg mr-2 ${
              selectedLabels.includes("Bug") ? "bg-blue-700" : ""
            }`}
            onClick={() => handleLabelSelect("Bug")}
          >
            Bug
          </button>
          <button
            className={`bg-green-500 text-white px-3 py-1 rounded-lg mr-2 ${
              selectedLabels.includes("Feature") ? "bg-green-700" : ""
            }`}
            onClick={() => handleLabelSelect("Feature")}
          >
            Feature
          </button>
          {/* Add more label buttons as needed */}
        </div>
        <div className="mr-4 mb-2">
          <span className="text-gray-700 font-semibold mr-2">
            Filter by Author:
          </span>
          <select
            className="border rounded-lg px-2 py-1"
            value={selectedAuthor}
            onChange={(e) => handleAuthorSelect(e.target.value)}
          >
            <option value="">All</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
            {/* Add more author options as needed */}
          </select>
        </div>
        <div className="mr-4 mb-2">
          <span className="text-gray-700 font-semibold mr-2">Search:</span>
          <input
            type="text"
            className="border rounded-lg px-2 py-1"
            value={searchQuery}
            onChange={handleSearchQuery}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-lg"
          onClick={filterAndSearchBugs}
        >
          Apply Filters
        </button>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-lg ml-4"
          onClick={() => {
            navigate(`/${params.id}/create-issue`);
          }}
        >
          Add Bug
        </button>
      </div>

      {/* Bug List Section */}
      {/* TODO: Render the bug list here */}
      <div>
        <ul>
          {bugs?.data?.length > 0 &&
            bugs?.data.map((bug) => (
              <li key={bug.id} className="border border-gray-300 p-4 mb-4">
                <h3 className="text-lg font-semibold mb-2">{bug.title}</h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Author:</span> {bug.author}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Labels:</span>{" "}
                  {/* {bug.label} */}
                  {bug?.label.length > 0 &&
                    bug?.label?.map((data) => data + ", ")}
                </p>
                {/* Add more bug details as needed */}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
