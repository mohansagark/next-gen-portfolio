import React from "react";

const AuthorDisplay = ({ author, className = "" }) => {
  const isBot = author === "Agent Bot";

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span>By</span>
      {isBot ? (
        <i className="fa-solid fa-robot" title="AI Bot"></i>
      ) : (
        <i className="fa-solid fa-user" title="Human Author"></i>
      )}
      <span>{author}</span>
    </span>
  );
};

export default AuthorDisplay;
