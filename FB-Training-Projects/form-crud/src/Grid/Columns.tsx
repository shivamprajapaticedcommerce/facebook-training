import React from "react";
import {FlexLayout,TextStyles,CheckBox} from "@cedcommerce/ounce-ui";

import { PropsInterface } from "./Interfaces";

function Columns({
  rows,
  selectedArray = [],
  columns,
  handleFilterFinal = () => {
    return null;
  },
  enableSelect = false,
  onAllRowSelect = () => {
    return null;
  },
  enableColumnsFilter = false,
  filterOptions = [{ value: 0, label: "" }],
    Accordiankey=''
}: PropsInterface): JSX.Element {
  //To create the filter Object

  function filterUpdate() {
    let filterFinal = {};
    Object.keys(columns)
      .filter(
        (e) => columns[e].filterText != "" && columns[e].filterText != undefined
      )
      .forEach((e) => {
        filterFinal = {
          ...filterFinal,
          [e]: {
            key: columns[e].filterOption,
            value: columns[e].filterText,
            rawData: columns[e],
          },
        };
      });
    // To Transfer the filter Object to App.js
    handleFilterFinal(filterFinal);
  }
  //To display filter text area and dropdown
  const renderFilters = (key: string): JSX.Element | React.ReactNode => {
    if (columns[key].preFilter) {
      return columns[key].preFilter;
    }
    return (
      <>
        <span onKeyPress={(e) => e.key === "Enter" && filterUpdate()}>
          <input
            type="text"
            onChange={(e) => (columns[key]["filterText"] = e.target.value)}
          />
        </span>
        <select
          onChange={(value) => {
            columns[key].filterOption = value.target.value;
            columns[key].filterText != "" &&
              columns[key].filterText != undefined &&
              filterUpdate();
          }}
          defaultValue="3"
        >
          {filterOptions.map((e) => (
            <option key={e.value} value={e.value}>
              {e.label}
            </option>
          ))}
        </select>
      </>
    );
  };
  const  disp=selectedArray.length==0?"table-header-group":"none";
  return (<>

    <thead key={123} style={{display:disp}}>
      <tr key="abc">
        {enableSelect && (
          <th>
            <CheckBox
                labelVal={""}
              onClick={() => {
                onAllRowSelect();
              }}
              checked={selectedArray.length == rows.length}
            />
          </th>
        )}

        {Object.keys(columns)
          .filter((e) => columns[e].visible).filter(e=>columns[e].name!=='')
          .map((key) => {
            // console.log(columns[key]["name"],Accordiankey,"inRenderTH")
            if (columns[key].filter && enableColumnsFilter)
              return (
                <th key={key}>
                  {columns[key]["name"]}
                  {renderFilters(key)}
              </th>
              );
            else return <th key={key}>{columns[key]["name"]}</th>;
          })}
        {Accordiankey!==''&&<th>Actions</th>}
      </tr>
    </thead>
  </>
  );
}

export default Columns;
