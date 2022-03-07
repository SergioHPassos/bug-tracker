import React from "react";

export default function Header() {
  return (
    <>
      {/* header full width */}
      <div className="columns">
        <div className="column is-12 has-text-centered pt-6">
          <span className="icon-text">
            <span className="icon is-large has-text-primary">
              <i className="fas fa-2x fa-bug"></i>
            </span>
            <span className="title">Bug Tracker</span>
          </span>
        </div>
      </div>
    </>
  );
}
