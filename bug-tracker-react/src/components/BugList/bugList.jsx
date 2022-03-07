import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { PopupFeedback } from "../popupFeedback";

import { priorityColor } from "./helperFunction";

export default function BugList({ postToggle, togglePostToggle }) {
  // holds the list of bugs from the POST request
  const [bugs, setBugs] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [updateKey, setUpdateKey] = useState(-1);
  const descriptionField = useRef();

  // get updated list of bugs from server once the add new bug button is pressed on new bug component
  useEffect(() => {
    (async function asyncGetBugs() {
      await getBugs();
    })();
  }, [postToggle]);

  // GET request--get list of bugs
  const getBugs = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/bugs/");
      return setBugs(res.data);
    } catch (err) {
      return console.log(err);
    }
  };

  // DELETE request for appropriate button/bug
  const deleteBug = async (bugId) => {
    try {
      await axios({
        method: "delete",
        url: "http://127.0.0.1:8000/bugs/" + bugId,
        data: {},
        headers: {},
      });
      togglePostToggle();
    } catch (err) {
      return console.log(err);
    }
  };

  // changes the <p> into an <input>
  const updateBugTag = (index) => {
    if (updateFlag) {
      setUpdateFlag(false);
      setUpdateKey(-1);
    } else {
      setUpdateFlag(true);
      setUpdateKey(index);
    }
  };

  // sends an UPDATE request to the server
  const updateBug = async (bugId, description) => {
    try {
      await axios({
        method: "patch",
        url: "http://127.0.0.1:8000/bugs/" + bugId + "/",
        data: {
          description: description,
        },
        headers: {},
      });
      togglePostToggle();
    } catch (err) {
      return console.log(err);
    }
  };

  // render components based on the list of bugs
  const bugListComponents = bugs.map(function (bug, index) {
    return (
      <div className="box" key={index}>
        {/* bug icon, description, and button start */}
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <span className="icon">
                <span className={priorityColor(bug.priority)}>
                  <i className="fas fa-2x fa-bug"></i>
                </span>
              </span>
            </div>
            <div className="level-item">
              {updateFlag && index === updateKey
                ? ({
                    /* update mode */
                  },
                  (
                    <input
                      className="input"
                      type={"text"}
                      ref={descriptionField}
                      defaultValue={bug.description}
                    ></input>
                  ))
                : ({
                    /* not update mode */
                  },
                  (<p className="subtitle">{bug.description}</p>))}
            </div>
          </div>
          <div
            className={
              window.innerWidth > 768 ? "level-right" : "level is-mobile pt-2"
            }
          >
            <div className="level-item">
              {updateFlag && index === updateKey
                ? ({
                    /* update mode */
                  },
                  (
                    <button
                      className="button is-danger"
                      onClick={() => {
                        updateBugTag(index);
                      }}
                    >
                      CANCEL
                    </button>
                  ))
                : ({
                    /* not update mode */
                  },
                  (
                    <button
                      className="button is-danger is-light"
                      onClick={() => {
                        deleteBug(bug.id);
                        PopupFeedback("Bug has been deleted!", "is-danger");
                      }}
                    >
                      DELETE
                    </button>
                  ))}
            </div>
            <div className="level-item">
              {updateFlag && index === updateKey
                ? ({
                    /* update mode */
                  },
                  (
                    <button
                      className="button is-info is-light"
                      onClick={() => {
                        updateBug(bug.id, descriptionField.current.value);
                        updateBugTag(index);
                        PopupFeedback("Bug has been updated!", "is-info");
                      }}
                    >
                      UPDATE
                    </button>
                  ))
                : ({
                    /* not update mode */
                  },
                  (
                    <button
                      className="button is-info"
                      onClick={() => {
                        updateBugTag(index);
                      }}
                    >
                      UPDATE
                    </button>
                  ))}
            </div>
          </div>
          {/* description and button start */}
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="container pt-3">{bugListComponents}</div>
    </>
  );
}
