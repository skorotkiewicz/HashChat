import React, { useState } from "react";
import { Panel } from "../Panel/Panel";

export const Tags = ({ name }) => {
  const [tags, setTags] = useState("");

  const [comp, setComp] = useState(true);
  const [next, setNext] = useState(false);

  return (
    <>
      {comp && (
        <div>
          <div className="content">
            <div className="desc">Type your tags, (space between)</div>
          </div>

          <div className="formStart">
            <input
              type="text"
              placeholder="Tags (also at least 3 characters)"
              onChange={(e) => setTags(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (tags.length >= 3) {
                    setNext(true);
                    setComp(false);
                  }
                }
              }}
            />
            <button
              onClick={() => {
                if (tags.length >= 3) {
                  setNext(true);
                  setComp(false);
                }
              }}
            >
              Start
            </button>
          </div>
        </div>
      )}
      {next && <Panel name={name} tags={tags} />}
    </>
  );
};
