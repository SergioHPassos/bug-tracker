import React, { useRef, useEffect } from "react";

export default function Input({ flag, setDescription, clearFlag }) {
  // description input field from the new bug component
  const descriptionField = useRef();

  // clear the description input field once the clearFlag has been toggled--once user presses the add new bug button it toggles the flag
  useEffect(() => {
    descriptionField.current.value = "";
  }, [clearFlag]);

  return (
    <>
      <div className="control has-icons-left">
        <input
          className="input"
          type={"text"}
          placeholder="bug description"
          ref={descriptionField}
          onChange={(e) => {
            if (e.target.value !== "") {
              setDescription(e.target.value);
            }
          }}
        ></input>
        <span className={"icon is-small is-left" + flag}>
          <i className="fas fa-bug"></i>
        </span>
      </div>
    </>
  );
}
