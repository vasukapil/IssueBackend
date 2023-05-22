import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/project")
      .then((response) => {
        setProjects(response.data);
        // console.log(projects,response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Project List</h1>
      <ul className="space-y-4">
        {projects &&
          projects?.data?.length > 0 &&
          projects?.data.map((project, index) => (
            <li key={index} className="bg-white shadow-md p-4 rounded-lg">
              <div className="flex items-center">
                {project.name}
                {/* {console.log(project, "dsjfsdjkfhjshfjsfh")} */}
                <button
                  className="text-blue-500 hover:text-blue-700 focus:outline-none relative left-[90%]"
                  onClick={() => {
                    navigate(`/project/${project._id}`);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
                    <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
      </ul>
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            onClick={() => {navigate('/create-project')}}
        >
          Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectList;
