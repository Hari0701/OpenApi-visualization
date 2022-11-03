import React from "react";
import "./ResponseTable.css";

export default function ResponseTable(props) {
  let attributes = props.data.find(
    (attribute) => attribute.response === props.responseType
  );
  if (attributes) attributes = attributes.attributes;
  return (
    <div
      style={props.responseType ? { display: "block" } : { display: "none" }}
    >
      {attributes ? (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>{props.responseType}</th>
            </tr>
          </thead>
          <tbody>
            {attributes.map((attribute, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{attribute}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
