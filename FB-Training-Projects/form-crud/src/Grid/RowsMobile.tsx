import * as React from "react";
import {CheckBox,Button,spread,TextStyles, Card} from "@cedcommerce/ounce-ui";
import { useState } from "react";
import { PropsInterface, ObjectInterface } from "./Interfaces";

function Rows({
  rows = [{}],
  columns,
  onRowSelect = () => {
    return "";
  },
  selectedArray = [],
  uniqueKey = "",

  rowOnClick = () => {
    return null;
  },
  enableSelect = false,
  onAllRowSelect = () => {
    return null;
  },
  Accordiankey = "",
}: PropsInterface): JSX.Element | null {
  //Render All Rows
  return (
    <>
    {/*<Card cardType="bridesmaid">*/}
      {/*<CheckBox*/}
          {/*labelVal={"Select All"}*/}
          {/*onClick={() => {*/}
            {/*console.log('cli')*/}
            {/*onAllRowSelect();*/}
          {/*}}*/}
          {/*checked={selectedArray.length == rows.length}*/}
      {/*/>*/}
    {/*</Card>*/}
    <div className="mt-20">
    <div className="inte__tableWrap">
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
        />
      ))}
    </div>
    </div>
    </>
  );
}
//Render Particular row
function RenderRow({
  row = {},
    rows= [{}],
  columns,
  onRowSelect = () => {
    return "";
  },
  selectedArray = [],
  uniqueKey = "",
  rowOnClick = () => {
    return "";
  },
  onAllRowSelect=()=>{
    return null;
  },
  index,
  Accordiankey = "",
}: PropsInterface): JSX.Element {
  const [show, handleShow] = useState(false);
  //Flag to Handle Row onClick
  let z = 0;

  return (
    <div
      className="inte-card"
      key={index}
      onClick={() => z == 0 && rowOnClick(row)}
    >

      <table className="inte__table inte-table--cardedRow inte--layoutFixed inte__table--alignLeft">
        <colgroup>
          <col style={{width:"150px"}}/>
          <col style={{width:"200px"}}/>
        </colgroup>
        <tbody>
        <tr>
          <td>
            <CheckBox labelVal={''} checked={selectedArray.includes(row)} onClick={() => {
              onRowSelect(row);
            }}/>
          </td>
          <td>
            <div className="inte__Popover-Wrapper--parent">
              {Object.keys(row).includes(Accordiankey) && (
                  <Button
                      type={'Plain'}
                      onClick={() => {
                        //Flag increased so row onClick dont work on button onClick
                        z++;

                        handleShow(!show);
                      }}
                  >
                    {spread}
                  </Button>
              )}
            </div>
          </td>
        </tr>

        <div>{show && row[Accordiankey]}</div>
        {Object.keys(columns)
          .filter((key) => columns[key].visible && (columns[key].type != "image"||columns[key].enableMobileImage))
          .map((key) => (
            <tr key={key}>
              <td>
               <TextStyles type="neutralText">{columns[key].name}</TextStyles>
              </td>
              <td> {row[key]}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}
export default Rows;
