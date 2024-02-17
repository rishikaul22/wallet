"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const FloatingButton = () => {
  const [selected, setselected] = useState(false);

  return (
    <>
      <div className="fixed bottom-8 right-8">
        <label
          onClick={() => setselected(true)}
          className="btn btn-circle swap swap-rotate btn-lg border-0 bg-yellow-400 text-xl text-white outline-none hover:bg-yellow-500"
        >
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" />

          {/* hamburger icon */}
          <div className="swap-off">
            <FaPlus />
          </div>

          {/* close icon */}
          <div className="swap-on">
            <ImCross />
          </div>
        </label>
      </div>
    </>
  );
};

export default FloatingButton;
