import React from "react";

export const Home = props => {
  return (
    <div className="sans-serif flex flex-column justify-center items-center pv2 ph4 w-100">
      <h3>Header</h3>
      <div className="flex-row">
        <button
          className="dim outline-0 bn mh2 pv3 ph4 bg-blue dim br2"
          onClick={props.increaseCount}
        >
          +
        </button>
        <button
          className="dim outline-0 bn mh2 pv3 ph4 bg-blue dim br2"
          onClick={props.decreaseCount}
        >
          -
        </button>
      </div>
      <h4>
        {props.count}
      </h4>
    </div>
  );
};

export default Home;
