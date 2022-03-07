import React, { useState } from "react";
import PriorityFlags from "./priorityFlags";
import Input from "./input";
import { PopupFeedback } from "../popupFeedback";

import { priorityConversion } from "./helperFunctions";

import axios from "axios";

export default function NewBug({ togglePostToggle }) {
  // used for the priority flag and POSTing
  const [flag, setFlag] = useState("");

  //
  const [description, setDescription] = useState("");

  // used to clear the input field of the new bug component
  const [clearFlag, setClearFlag] = useState(false);

  // POST request for the newly added bug
  const postBug = () => {
    try {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/bugs/",
        data: {
          description: description,
          priority: priorityConversion(flag),
        },
        headers: {},
      });

      // triggers state change so that BugList can get new GET request and re-render the new bugs
      togglePostToggle();
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="box">
        {/* top part, consist of two labels and the priority flags start */}
        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <h1 className="label">Add New Bug</h1>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <h1 className="label">Priority:</h1>
            </div>
            <div className="level-item">
              {/* when creating a new bug, clicking the priority flag will set that value to flag, which is used for POSTing data*/}
              <PriorityFlags setFlag={setFlag} />
            </div>
          </div>
        </div>
        {/* top part, consist of two labels and the priority flags start */}

        {/* bottom part, consist of label, input, and button start */}
        <div className="field">
          {/* description for bug start */}
          <div className="p-2">
            <label className="label">Bug Description</label>

            {/* bug description input field start */}
            <Input
              flag={flag}
              setDescription={setDescription}
              clearFlag={clearFlag}
            />
            {/* bug description input field end */}
          </div>
          {/* description for bug end */}

          {/* add new bug start */}
          <div className="p-2 mt-3">
            <button
              className="button is-fullwidth"
              onClick={() => {
                if (description !== "") {
                  postBug();
                  setDescription(""); // clear input field
                  setFlag(""); // clear bug icon color
                  PopupFeedback("New bug has been added!", "is-info");

                  if (clearFlag) {
                    setClearFlag(false);
                  } else {
                    setClearFlag(true);
                  }
                }
              }}
            >
              Add New Bug
            </button>
          </div>
          {/* add new bug end */}
        </div>
        {/* bottom part, consist of label, input, and button start */}
      </div>
    </div>
  );
}
