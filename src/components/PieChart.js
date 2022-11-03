import DrawChart from "./DrawChart";
import React, { useState } from "react";
import ResponseTable from "./ResponseTable";
import "./PieChart.css";
export default function PieChart(props) {
  const allPaths = Object.keys(props.paths);

  //set path ( /getClaim...)
  const [path, setPath] = useState();

  // array of Operations in a particular path [get,put...]
  let pathOperations;
  if (path) {
    pathOperations = Object.keys(props.paths[`${path}`]);
  }

  // set operations (get...)
  const [operation, setOperation] = useState();

  // Mapping response and attributes related to it
  let responses;
  if (path && operation) {
    responses = Object.entries(props.paths[`${path}`][operation].responses);
  }

  // set response (200...)
  const [operationResponse, setOperationResponse] = useState();

  // array of response in a particular operation [200,400...]
  let responseTypes;
  if (path && operation)
    responseTypes = Object.keys(props.paths[`${path}`][operation].responses);

  // contains data to draw pie chart
  let data = [];

  if (responses) {
    // reverse a string
    function reverseString(str) {
      return str.split("").reverse().join("");
    }

    for (let index = 0; index < responses.length; index++) {
      let responseTitle = responses[index][1].$ref;
      var str = "";
      for (let index = responseTitle.length - 1; index > 0; index--) {
        if (responseTitle[index] === "/") break;
        else {
          str += responseTitle[index];
        }
      }
      str = reverseString(str);

      if (props.components.responses[`${str}`] != null)
        responses[index][1] =
          props.components.responses[`${str}`].content[
            "application-json"
          ].schema.properties;
      else responses[index][1] = null;
    }

    let totalAttributes = 0;
    for (let index = 0; index < responses.length; index++) {
      totalAttributes += Object.keys(responses[index][1]).length;
    }

    for (let index = 0; index < responses.length; index++) {
      data.push({
        response: responses[index][0],
        count: Object.keys(responses[index][1]).length,
        attributes: Object.keys(responses[index][1]),
        percentage: (
          (Object.keys(responses[index][1]).length / totalAttributes) *
          100
        ).toFixed(2),
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      });
    }
  }

  const handlePath = (e) => {
    let ele = document.getElementById("pie-container");
    let child = ele.lastChild;
    while (child) {
      ele.removeChild(child);
      child = ele.lastElementChild;
    }

    setPath(e.target.value);
    setOperation("")
  };

  const handleOperation = (e) => {
    let ele = document.getElementById("pie-container");
    let child = ele.lastChild;
    ele.removeChild(child);
    child = ele.lastElementChild;

    setOperation(e.target.value);
    setOperationResponse("");
  };

  const handleResponse = (e) => {
    let ele = document.getElementById("pie-container");
    let child = ele.lastChild;
    while (child) {
      ele.removeChild(child);
      child = ele.lastElementChild;
    }

    setOperationResponse(e.target.value);
  };

  return (
    <div>
      <div className="items">
        <div className="select">
          <select
            name="path"
            id="path"
            value={path}
            onChange={(e) => handlePath(e)}
          >
            <option value="">Select</option>
            {allPaths
              ? allPaths.map((singlePath, key) => (
                  <option value={singlePath} key={key}>
                    {singlePath.slice(1)}
                  </option>
                ))
              : null}
          </select>
        </div>
        {path ? (
          <div className="select">
            <select
              name="operations"
              id="operations"
              value={operation}
              onChange={(e) => handleOperation(e)}
            >
              <option value="">Select</option>
              {pathOperations
                ? pathOperations.map((pathOperation, key) => (
                    <option value={pathOperation} key={key}>
                      {pathOperation}
                    </option>
                  ))
                : null}
            </select>
          </div>
        ) : null}
        {path && operation ? (
          <div className="select">
            <select
              name="responses"
              id="responses"
              value={operationResponse}
              onChange={(e) => handleResponse(e)}
            >
              <option value="">Select</option>
              {responseTypes
                ? responseTypes.map((response, key) => (
                    <option value={response} key={key}>
                      {response}
                    </option>
                  ))
                : null}
            </select>
          </div>
        ) : null}
      </div>
      <div className="contents">
        <ResponseTable responseType={operationResponse} data={data} />
        <DrawChart data={data} responseType={operationResponse} />
      </div>
    </div>
  );
}
