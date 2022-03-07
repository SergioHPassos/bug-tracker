import React from "react";

export default function PriorityFlags({ setFlag }) {
  // update flag so that when making a POST request, it has the correctly selected priority
  const onButtonClick = (flagName) => {
    setFlag(flagName);
  };

  return (
    <div className="columns is-mobile">
      <div className="column">
        {/* priority 1 start */}
        <button
          className="button is-danger is-outlined"
          onClick={() => onButtonClick(" has-text-danger")}
        >
          <span className="icon">
            <i className="fas fa-flag"></i>
          </span>
        </button>
        {/* priority 1 end */}
      </div>

      <div className="column">
        {/* priority 2 start */}
        <button
          className="button is-warning is-outlined"
          onClick={() => onButtonClick(" has-text-warning")}
        >
          <span className="icon">
            <i className="fas fa-flag"></i>
          </span>
        </button>
        {/* priority 2 end */}
      </div>

      <div className="column">
        {/* priority 3 start */}
        <button
          className="button is-info is-outlined"
          onClick={() => onButtonClick(" has-text-info")}
        >
          <span className="icon">
            <i className="fas fa-flag"></i>
          </span>
        </button>
        {/* priority 3 end */}
      </div>
    </div>
  );
}
