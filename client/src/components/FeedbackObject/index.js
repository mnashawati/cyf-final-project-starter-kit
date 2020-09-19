/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from "react";
import "./styles.css";
import modules from "../../db/modules.json";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import timeDifference from "../../helperFunctions/timeDifference";

const FeedbackObject = ({ feedbackToShow, student, updateFeedback }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState({});

  useEffect(() => {
    setCurrentFeedback(feedbackToShow);
  }, [feedbackToShow]);

  //POST updated feedback to DB
  //When clicked SAVE; UPDATE the data
  const updateData = (id) => {
    fetch(`/api/students/${student._id}/feedback/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(currentFeedback),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  };

  //When clicked SAVE, CHECK if field is empty
  const saveFeedback = (id) => {
    if (!currentFeedback.title) {
      return alert("Please add a title");
    } else if (!currentFeedback.text) {
      return alert("Please add your feedback");
    } else if (!currentFeedback.mentor) {
      return alert("Please add your name");
    }
    updateData(id);
  };

  //DELETE selected feedback and update data
  const handleDelete = (feedbackId) => {
    fetch(`/api/students/${student._id}/${feedbackId}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  };

  // Populate new object with edited data editable
  const handleEdit = (e) => {
    setCurrentFeedback({ ...currentFeedback, [e.target.name]: e.target.value });
  };

  return (
    <div className="prev-feedback-list">
      {Object.keys(currentFeedback).length &&
        Object.keys(currentFeedback).map((property, index) => {
          if (property === "module") {
            return (
              <div className="feedback-title-and-module">
                <div className="feedback-title" key={index}>
                  <h6 className="title-module">Title:</h6>
                  <textarea
                    className="feedback-title-textarea"
                    name="title"
                    value={currentFeedback.title}
                    onChange={handleEdit}
                    disabled={!isEditing}
                  />
                </div>
                <div className="feedback-module" key={index}>
                  <h6 className="title-module">Module:</h6>
                  {!isEditing ? (
                    <p className="modules-dropdown">{currentFeedback.module}</p>
                  ) : (
                    <select
                      name="module"
                      value={currentFeedback.module}
                      onChange={handleEdit}
                    >
                      {modules.map((module, index) => (
                        <option
                          className="modules-dropdown"
                          key={index}
                          value={module.name}
                        >
                          {module.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            );
          }
          if (property === "text") {
            return (
              <div className="prev-feedback-text" key={index}>
                <textarea
                  className="feedback-text-textarea"
                  name="text"
                  value={currentFeedback.text}
                  onChange={handleEdit}
                  disabled={!isEditing}
                />
              </div>
            );
          }
          if (property === "mentor") {
            return (
              <div className="feedback-time-and-mentor">
                <div className="prev-feedback-time" key={index}>
                  <p>{timeDifference(Date.now(), currentFeedback.time)}</p>
                </div>
                <div className="prev-feedback-mentor" key={index}>
                  <p className="feedback-input-mentor-name">Mentor: </p>
                  <input
                    className="prev-feedback-mentor-name-input"
                    name="mentor"
                    value={currentFeedback.mentor}
                    disabled
                  />
                </div>
              </div>
            );
          }
        })}
      <div className="edit-delete-buttons">
        <Button
          content={isEditing ? "Save" : "Edit"}
          handleClick={() => {
            setIsEditing(!isEditing);
            isEditing && saveFeedback(currentFeedback.id);
          }}
        />
        {isEditing ?
        <div>
          <Button
            content="Cancel"
            handleClick={() => {setCurrentFeedback(storeCurentFeedback);}}
          />
        </div> : null}
        <div>
          <Button
            content="Delete"
            handleClick={() => {
              alert("DELETE");
              handleDelete(currentFeedback.id);
              updateFeedback();
            }}
          />
        </div>
      </div>
    </div>
  );
};

FeedbackObject.propTypes = {
  student: PropTypes.object.isRequired,
  feedbackToShow: PropTypes.object.isRequired,
  updateFeedback: PropTypes.func.isRequired,
};

export default FeedbackObject;
