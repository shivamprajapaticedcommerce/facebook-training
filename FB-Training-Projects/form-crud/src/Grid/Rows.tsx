// @flow
import * as React from "react";
import {spread,Button,Popover,CheckBox,TextStyles} from "@cedcommerce/ounce-ui";
import { useState } from "react";
import { PropsInterface, ObjectInterface } from "./Interfaces";
function Rows({
  rows = [{}],
  columns,
  onRowSelect = () => {
    return null;
  },
  selectedArray = [],
  enableSelect = false,
  uniqueKey = "",
  rowOnClick = () => {
    return "";
  },
  Accordiankey = "",
  popOverData=<p>abc</p>
}: PropsInterface): JSX.Element | null {
  //Render All Rows
  return (
    <tbody>
      {rows.map((row: ObjectInterface, i) => (
        <RenderRow
          rows={rows}
          row={row}
          columns={columns}
          enableSelect={enableSelect}
          onRowSelect={onRowSelect}
          key={i}
          selectedArray={selectedArray}
          uniqueKey={uniqueKey}
          rowOnClick={rowOnClick}
          index={i}
          Accordiankey={Accordiankey}
          popOverData={popOverData}
        />
      ))}
    </tbody>
  );
}
//Render Particular row
function RenderRow({
  row = {},
  columns,
  enableSelect = false,
  onRowSelect = () => {
    return null;
  },
  selectedArray = [],
  uniqueKey = "",
  rowOnClick = () => {
    return "";
  },
  index = 0,
  Accordiankey = "",
  popOverData=<p>abc</p>
}: PropsInterface): JSX.Element {
  //To Toggle the Accordian
  const [show, handleShow] = useState(false);
  //Flag to Handle Row onClick
  let z = 0;

  const c=selectedArray.includes(row[uniqueKey]);
  // console.log("rows",selectedArray,c,row[uniqueKey])
  return (
    <>
      <tr key={index} style={{textAlign:'center'}} onClick={()=>{rowOnClick(row)}}>
        {enableSelect && (
          <td key={index}>
            {/*<input*/}
              {/*type="checkbox"*/}
              {/*onChange={() => {*/}
                {/*onRowSelect(row);*/}
              {/*}}*/}
              {/*checked={selectedArray.includes(row)}*/}
            {/*/>*/}
            {/* {console.log("selectedArray",selectedArray,selectedArray.includes(row),row)} */}
            <CheckBox labelVal={''} checked={c} onClick={() => {
              onRowSelect(row);
            }}/>
          </td>
        )}

        {Object.keys(columns)
          .filter((key) => columns[key].visible).filter(e=>columns[e].name!=='')
          .map((key, CI) => (
              <td key={CI}><TextStyles type="smallText">{row[key]}</TextStyles></td>
          ))}
        {Accordiankey!==''&&
        <td>
          {Object.keys(row).includes(Accordiankey) && (
              <div className="inte__Popover-Wrapper--parent">
                <Button type="Plain" icon={spread}
                      onClick={() => {
                        //Flag increased so row onClick dont work on button onClick
                        z++;

                        handleShow(!show);
                      }}
                  >
                </Button>
                <Popover activator={<></>} open={show} children={popOverData}/>
                {/*{popOverData}*/}
              </div>
          )}
        </td>}
      </tr>
      {/* Display Accordian data only when Accordian toggle is true */}
      {show && row[Accordiankey]}
    </>
  );
}
export default Rows;
