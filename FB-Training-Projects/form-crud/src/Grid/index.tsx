import React, { useEffect } from "react";
import RenderColumns from "./Columns";
import RenderRows from "./Rows";
import RenderMobileRows from "./RowsMobile";
import { setDefaultValue } from "./function";
import { PropsInterface } from "./Interfaces";
import { useState } from "react";
import {FlexLayout,TextStyles,CheckBox,Card} from "@cedcommerce/ounce-ui";
function Grid(props: PropsInterface): JSX.Element {
  const {
    section1 = null,
    section2 = null,
    section3 = null,
    rows = [],
    columns = {},
    enableColumnsFilter = false,
    handleFilterFinal = () => {
      return null;
    },
    enableSelect = false,
    onRowSelect = () => {
      return null;
    },
    onAllRowSelect = () => {
      return null;
    },
    selectedArray = [],
    uniqueKey = "",
    rowOnClick = () => {
      return null;
    },
      rowsLength=0,
    Accordiankey = "",
      massAction=<div><p>Demo</p></div>,
    filterOptions,
      popOverData=<p>abc</p>
  } = props;

  /**
   *
   * @param currentView
   * @param Width
   */
  // console.log("rowsLenght",rowsLength)
  function checkWidth(Width: number): boolean {
    if (Width < 768) return true;
    return false;
  }

  const [modileView, togleView] = useState(() => {
    return checkWidth(window.outerWidth);
  });
  useEffect(() => {
    window.addEventListener("resize", () => {
      togleView(checkWidth(window.outerWidth));
    });
    return () => {
      window.removeEventListener("resize", () => {
        //
      });
    };
  }, []);
// console.log(rowsLength)
  let c=0;
  rows.map(e=>{
    if(selectedArray.includes(e.sourceId)){
      c++;
    }
  })
  //To insert the basic columns attributes if not present in it
  const columnsNew = setDefaultValue(columns);
  const dispMassAction=selectedArray.length==0?"none":"block";
 
  if (modileView) {
    return (
        <>
        <div className="inte-grid--Action" >
          <Card cardType="plain">
            <FlexLayout spacing="loose" valign="center">
              <CheckBox
                  labelVal={"Select All"}
                  onClick={() => {
                    onAllRowSelect();
                  }}
                  checked={c == rowsLength}
              />
               {dispMassAction!=='none' && <Card cardType="plain">
                <FlexLayout valign="center" spacing="loose" childWidth="fullWidth">
                  {massAction}
                </FlexLayout>

              </Card>}
            </FlexLayout>
            
          </Card>
         
        </div>


      <RenderMobileRows
        {...props}
        uniqueKey={uniqueKey}
        selectedArray={selectedArray}
        enableSelect={enableSelect}
        onAllRowSelect={onAllRowSelect}
        onRowSelect={onRowSelect}
        rows={rows}
        Accordiankey={Accordiankey}
        columns={columnsNew}
        rowOnClick={rowOnClick}
      />


        </>
    );
  }

  return (
    <div className="inte__tableWrap">
      {/*<div className="OptionsMenu" style={{ paddingBottom: "50px" }}>*/}
        {/*<div style={{ width: "30%", float: "left", textAlign: "center" }}>*/}
          {/*{section1}*/}
        {/*</div>*/}
        {/*<div style={{ width: "30%", float: "left", textAlign: "center" }}>*/}
          {/*{section2}*/}
        {/*</div>*/}
        {/*<div style={{ width: "30%", float: "left", textAlign: "center" }}>*/}
          {/*{section3}*/}
        {/*</div>*/}
      {/*</div>*/}
      {/* {children} */}
      {dispMassAction!=='none'?<div className="inte-grid--Action" >
        <FlexLayout valign="center" spacing="loose">
          <CheckBox
              labelVal={""}
              onClick={() => {
                onAllRowSelect();
              }}
              checked={c== rowsLength}
          />
          {massAction}
        </FlexLayout>
        </div>:null}
      <table className="DataGrid inte__table inte-table--cardedRow inte--layoutFixed inte__table--alignCenter">
        <colgroup>
          {enableSelect?<col style={{width:"60px"}}/>:null}
          {Object.keys(columnsNew).filter(e=>columnsNew[e].visible).map((e)=> {
                return <col style={{width: columnsNew[e].width+ "px"}}/>
              }
          )}
        </colgroup>
        <RenderColumns
          {...props}
          rows={rows}
          selectedArray={selectedArray}
          columns={columnsNew}
          handleFilterFinal={handleFilterFinal}
          enableSelect={enableSelect}
          onAllRowSelect={onAllRowSelect}
          massAction={massAction}
          enableColumnsFilter={enableColumnsFilter}
          filterOptions={filterOptions}
        />
        <RenderRows
          {...props}
          popOverData={popOverData}
          enableSelect={enableSelect}
          uniqueKey={uniqueKey}
          selectedArray={selectedArray}
          onRowSelect={onRowSelect}
          rows={rows}
          Accordiankey={Accordiankey}
          columns={columnsNew}
          rowOnClick={rowOnClick}
        />
      </table>
    </div>
  );
}

export default Grid;
