import { 
  Button, 
  TextField,
  Card, 
  FlexLayout, 
  LRLayout,
  // BodyHeader,
  // Radio,
  // CheckBox,
  // TextArea,
  Select,
  Table,
  Modal,
  ChoiceList,
  Pagination,
  Filter,
  Tabs,
  MainLayout,
  Dots

} from '@cedcommerce/ounce-ui';
import '@cedcommerce/ounce-ui/dist/index.css';
import React, {useState, useEffect} from 'react';
import Grid from './Grid/index.tsx';

// import { number } from 'yargs';
import './App.css';

function App() {

  // ------------------------------------------------USE STATE
  const [defaultColumns, setDefaultColumns] = useState({
    name: {
    alignment: 'center',
    name: 'Full Name',
    type: 'string',
    visible: true,
    },
  
    age: {
    alignment: 'center',
    name: 'Age',
    type: 'number',
    visible: true,
    },
  
    mobile: {
    alignment: 'center',
    name: 'Mobile Number',
    type: 'number',
    visible: true,
    },
  
    city: {
    alignment: 'center',
    name: 'City',
    type: 'string',
    visible: true,
    },
  
    course: {
    alignment: 'center',
    name: 'Course',
    type: 'string',
    visible: true,
    
    },

    abc: {
      alignment: 'center',
      name: 'ABC',
      type: 'string',
      visible: true,
      },

    action: {
      name: 'Action',
      type: 'string',
      visible: true,
    },

    // delete: {
    //   alignment: 'center',
    //   name: 'Course',
    //   type: 'node',
    //   visible: true,
    //   
    // }
  })
  const [userDetails, setUserDetails] = useState([
    {
      name: "Shivam Prajapati",
      age: "21",
      mobile: "8978123412",
      city: "Lucknow",
      course: "B.Tech" ,
      status: "completed",
    },
    {
      name: "Rajat Gupta",
      age: "22",
      mobile: "1234567890",
      city: "Barabanki",
      course: "BBA" ,
      status: "pursuing"
    },
    {
      name: "Qaiser Mehnadi",
      age: "22",
      mobile: "2343265453",
      city: "Puna",
      course: "B.Com",
      status: "final-year"
    }

  ])

  const [adminTableColumns, setAdminTableColumns] = useState({
    firstName: {
    alignment: 'center',
    name: 'First Name',
    type: 'string',
    visible: true,
    },

    lastName: {
      alignment: 'center',
      name: 'Lasr Name',
      type: 'string',
      visible: true,
      },
  
    age: {
    alignment: 'center',
    name: 'Age',
    type: 'number',
    visible: true,
    },

    course: {
      alignment: 'center',
      name: 'Course',
      type: 'string',
      visible: true,
      
    },

    collegeName: {
      alignment: 'center',
      name: 'College',
      type: 'string',
      visible: true,
      
    },
  
    mobile: {
    alignment: 'center',
    name: 'Mobile Number',
    type: 'number',
    visible: true,
    },
  
    city: {
    alignment: 'center',
    name: 'City',
    type: 'string',
    visible: true,
    },
    
  })
  const [adminTableRows, setAdminTableRows] = useState([
    {
      firstName: "Mayank",
      lastName: "Shukla",
      age: "21",
      course: "B.Tech" ,
      collegeName: "BBDNITM",
      mobile: "8978123412",
      city: "Lucknow",
    }

  ])
  const [filter, setFilter] = useState({filterValue:"", filterType:""})
  const [showForm, setShowForm] = useState(false)
  const [newUser, setNewUser] = useState({name:"", age:"", mobile:"", city:"", course:"", status: ""})
  const [choiceListValue, setChoiceList] = useState(["name", "age", "mobile", "city", "course", "action", "abc"])
  const [tableRows, setTableRows] = useState([])
  const [tableColumns, setTableColumns] = useState({})
  const [paginationDetails, setPagination] = useState({currentPage:1, countPerPage:2, totalPages:0})
  const [tab, setTabs] = useState("all")
  const [showMultiStepForm, setShowMultiStepForm] = useState({"display":false, currentStep:1, totalSteps:3})
  const [contactAdminDetails, setContactAdminDetails] = useState({
                                                                    personalDetails:{firstName:'', lastName:'',age:'', status:"none"},
                                                                    educationDetails:{course:'', collegeName:'', status:"none"},
                                                                    communicationDetails:{mobile:'', city:'', status:"none"} 
                                                                  })
  


  
  // ------------------------------------------------USE EFFECT
  
  useEffect(() => {
    setTableData()
  }, [])

 
  

  // ------------------------------------------------SET TABLE DATA---------------------------------------------------------------------------------------------------------
  const setTableData = () =>{

    console.log("Setting Table Data................................")

    let updatedTableColumns = {};
    let updatedTableRows = [];
    let updatedUserDetails = [];
    let latestChoiceList = choiceListValue;

    

    // Filtering Data as per the current filter

    for (const user of userDetails) {
      if(filter['filterType'] !== ""){
        if(user[filter['filterType']] === filter['filterValue'])
        {
          updatedUserDetails.push(user) 
        }
      }else{
        updatedUserDetails.push(user)
      }  
    }


    // Setting as per Status

    if(tab !== "all")
    { let tempUpdatedUserDetails = [];
      for (const user of updatedUserDetails) {
        if(user['status'] === tab){
          tempUpdatedUserDetails.push(user)
        }
      }
      updatedUserDetails = tempUpdatedUserDetails;
    }

    
    
    
    for (const choice of latestChoiceList) {
      updatedTableColumns[choice] = defaultColumns[choice]
    }

    let rowPerPage = paginationDetails.countPerPage;
    let currentPage = paginationDetails.currentPage <= Math.ceil(updatedUserDetails.length/rowPerPage)? paginationDetails.currentPage: 1;
    let rowBegin = (currentPage-1)*rowPerPage;
    let rowEnd= (rowBegin+rowPerPage)>=updatedUserDetails.length?updatedUserDetails.length: (rowBegin + rowPerPage);

    


    for (let i=rowBegin; i<rowEnd; i++) {
      let tempUser = {};
      console.log(latestChoiceList)
      for (const column of latestChoiceList) {
        if(column === "action"){
          tempUser['action'] = "Action"
        }
        tempUser[column] = updatedUserDetails[i][column]

      }
      console.log(tempUser)
      // tempUser['action'] = <Button onClick = {()=>{}} >Edit</Button>
      tempUser['abc'] = "ABC"
      // tempUser['delete'] = <Button id = {updatedUserDetails[i]['mobile']} onClick = {deleteUser}>Delete</Button>
      console.log(tempUser)
      updatedTableRows.push(tempUser)
    }

    console.log(updatedTableRows)

    if(updatedTableRows.length<=0){
      alert("No data found! \nFilter:"+filter.filterValue+" \nTab: "+tab)
    }

    setTableColumns(updatedTableColumns)
    setTableRows(updatedTableRows)
    setPagination({...paginationDetails, "currentPage":currentPage, "countPerPage": rowPerPage, totalPages:Number(Math.ceil((updatedUserDetails.length)/rowPerPage))})
    
    
// 
    
  }

  // -----------------------------------------------ADD NEW USER----------------------------------------------------------------------------------------------------------------

  const addNewUser = () =>{
    let updatedUserDetails = userDetails;
    updatedUserDetails.push(newUser)
    setUserDetails(updatedUserDetails)
    setShowForm(false)
    setNewUser({name:"", age:"", mobile:"", city:"", course:"", status:""})
    setTableData()
  }

  const cancelAddNewUser =()=>{
    setShowForm(false)
    setNewUser({name:"", age:"", mobile:"", city:"", course:"", status:""})
  }



  // -----------------------------------------------EDIT USER---------------------------------------------------------------------------------------------------------------------

  const editUser = (e) =>{
    console.log("Ready to edit user", e)
  }

  const deleteUser = (e) =>{
    console.log("Deleting....", e)
  }



  // ----------------------------------------------CHOICELIST-----------------------------------------------------------------------------------------------------------------------------

  const doesColumnAlreadyExist = (e) =>{
    for (const columnIndex in choiceListValue) {
      if(choiceListValue[columnIndex] === String(e))
      {
        return columnIndex
      }
    }
    return false
  }

  const updateChoiceList = (e) =>{
    let updatedChoiceList = choiceListValue
    doesColumnAlreadyExist(e) === false?
                                        updatedChoiceList.push(e)
                                      :
                                      updatedChoiceList.splice( doesColumnAlreadyExist(e),1)
    setChoiceList(updatedChoiceList) 
    setTableData()
  }

  //-------------------------------------------------PAGINATION-------------------------------------------------------------------------------------------------------------------------------------
  
  
  const updatePaginationCount = (e) =>{
     setPagination({...paginationDetails, "countPerPage": e});
     setTableData();
   }

   const nextPage = () =>{
    setPagination({...paginationDetails, "currentPage":(paginationDetails['currentPage']+=1)});
    setTableData();
   }

   const previousPage = () =>{
    setPagination({...paginationDetails, "currentPage":(paginationDetails['currentPage']-=1)});
    setTableData();
   }


  // -------------------------------------------------IMPLEMENT TABS--------------------------------------------------------------------------------------------------------------------


  const implementTab = (e) =>{
    setTabs(e);
    console.log("Expected "+e+" actual "+tab)
    setTableData();
  }


//----------------------------------------------------Multi Step Form--------------------------------------------------------------------------------------------------------------------------

  const cancelAdminContact  = () =>{
    setShowMultiStepForm({...showMultiStepForm, 'display': false, "currentStep":1})

    setContactAdminDetails({
      personalDetails:{firstName:'', lastName:'',age:'', status:"none"},
      educationDetails:{course:'', collegeName:'', status:"none"},
      communicationDetails:{mobile:'', city:'', status:"none"} 
    })
  }

  const finishAdminContact = () =>{
    console.log(contactAdminDetails)
    let updateAdminTableRows = adminTableRows;
    let tempAdminRow = {}
    tempAdminRow['firstName'] = contactAdminDetails.personalDetails.firstName;
    tempAdminRow['lastName'] = contactAdminDetails.personalDetails.lastName;
    tempAdminRow['age'] = contactAdminDetails.personalDetails.age;

    tempAdminRow['course'] = contactAdminDetails.educationDetails.course;
    tempAdminRow['collegeName'] = contactAdminDetails.educationDetails.collegeName;

    tempAdminRow['mobile'] = contactAdminDetails.communicationDetails.mobile;
    tempAdminRow['city'] = contactAdminDetails.communicationDetails.city;

    updateAdminTableRows.push(tempAdminRow)

    setAdminTableRows(updateAdminTableRows)
    setShowMultiStepForm({...showMultiStepForm, 'display': false, "currentStep":1})

    setContactAdminDetails({
      personalDetails:{firstName:'', lastName:'',age:'', status:"none"},
      educationDetails:{course:'', collegeName:'', status:"none"},
      communicationDetails:{mobile:'', city:'', status:"none"} 
    })
    // console.log(updateAdminTableRows)

  }

  //-------------------------------------------------RENDERING-------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="App">
      <FlexLayout
        childWidth="full"
        direction="vertical"
        halign="fill"
        spacing="loose"
        valign="center"
        wrap="wrap"
      >
        <Card>
          <h1>Welcome to my Form-CRUD App</h1>
        </Card>
        <Card>
        <FlexLayout spacing = "loose">
        <Filter
          filters={[
            {
              children: <TextField 
                            type = "string"
                            placeHolder = "Name or Age"
                            onChange={(e) => {setFilter({...filter, filterValue:String(e)})}}
                            value = {filter["filterValue"]}
                            thickness = "thin"
                        />,
              name: 'Enter Name or Age'
            },
            {
              children: <Select 
                              options={[{label: 'Name', value: 'name'}, {label: 'Age', value: 'age'}]} 
                              thickness="thin" 
                              onChange = {(e)=>{setFilter({...filter, filterType:String(e)})}}
                              type="secondary"/>,
              name: 'Select Field to filter'
            },
          ]}
          onApply={setTableData}
        />

        <ChoiceList
            onChange={updateChoiceList}
            options={[
              {
                label: 'Full Name',
                value: 'name'
              },
              {
                label: 'Age',
                value: 'age'
              },
              {
                label: 'Mobile',
                value: 'mobile'
              },
              {
                label: 'City',
                value: 'city'
              },
              {
                label: 'Course',
                value: 'course'
              }
            ]}
            placeholder="Choose the option you want to see"
            thickness="thin"
            type="none"
            value={choiceListValue}
        />
        </FlexLayout>
        </Card>
        <Card>
            <Tabs
              onChange={implementTab}
              selected={tab}
              value={[
                {
                  content: 'All',
                  id: 'all'
                },
                {
                  content: 'Completed',
                  id: 'completed'
                },
                {
                  content: 'Pursuing',
                  id: 'pursing'
                },
                {
                  content: 'Final Year',
                  id: 'final-year'
                },
                {
                  content: 'Pre-final Year',
                  id: 'pre-final-year'
                }
              ]}
            />
          <br></br>
          <Grid
            columns={tableColumns}
            rows = {tableRows}
          />
        </Card>

        <Card>
          <p>Admin Contact Received</p>
        <Grid
          columns={adminTableColumns}
          rows = {adminTableRows}
        />
        </Card>
          {
            showMultiStepForm['display']?
                                        <Card height="100%">
                                          <FlexLayout
                                          spacing ="extraLoose"
                                          >
                                            <h1>STEP {showMultiStepForm['currentStep']}/3</h1>
                                            <FlexLayout>
                                            <Dots status={contactAdminDetails.personalDetails.status}></Dots>
                                            <Dots status={contactAdminDetails.educationDetails.status}></Dots>
                                            <Dots status={contactAdminDetails.communicationDetails.status}></Dots>
                                            </FlexLayout>
                                          </FlexLayout>
                                            {
                                              showMultiStepForm.currentStep === 1?
                                              // PERSONAL DETAILS FORM
                                                                                      <FlexLayout
                                                                                      
                                                                                      direction="vertical"
                                                                                      halign="fill"
                                                                                      spacing="loose"
                                                                                      valign="center"
                                                                                  
                                                                                      >
                                                                                        <br></br>
                                                                                        Enter First Name
                                                                                        <TextField
                                                                                            type = "string"
                                                                                            placeHolder = "First name"
                                                                                            onChange={(e) => {setContactAdminDetails({...contactAdminDetails, "personalDetails":{...contactAdminDetails['personalDetails'], firstName:String(e)}})}}
                                                                                            value = {contactAdminDetails.personalDetails.firstName}
                                                                                            thickness = "thin"
                                                                                          /> 
                                                                                          <br></br>
                                                                                        Enter last Name     
                                                                                        <TextField
                                                                                            type = "string"
                                                                                            placeHolder = "Last name"
                                                                                            onChange={(e) => {setContactAdminDetails({...contactAdminDetails, "personalDetails":{...contactAdminDetails['personalDetails'], lastName:String(e)}})}}
                                                                                            value = {contactAdminDetails.personalDetails.lastName}
                                                                                            thickness = "thin"
                                                                                          />
                                                                                          <br></br>
                                                                                        Enter Age 
                                                                                        <TextField
                                                                                            type = "number"
                                                                                            placeHolder = "Age"
                                                                                            onChange={(e) => {setContactAdminDetails({...contactAdminDetails, "personalDetails":{...contactAdminDetails['personalDetails'], age:String(e)}})}}
                                                                                            value = {contactAdminDetails.personalDetails.age}
                                                                                            thickness = "thin"
                                                                                          />
                                                                                        <br></br>
                                                                                        <FlexLayout spacing="extraLoose">
                                                                                        <Button onClick = {cancelAdminContact}>Cancel</Button>
                                                                                        <Button onClick = {() =>{
                                                                                                                  setShowMultiStepForm({...showMultiStepForm, "currentStep": 2});
                                                                                                                  setContactAdminDetails({...contactAdminDetails, "personalDetails":{...contactAdminDetails['personalDetails'], "status": "completed"}})}
                                                                                                            }>Next</Button>
                                                                                        </FlexLayout>
                                                                                      </FlexLayout>:showMultiStepForm.currentStep === 2?

                                          // EDUCATION DETAILS FORM
                                                                                      <FlexLayout
                                                                                      direction="vertical"
                                                                                      halign="fill"
                                                                                      spacing="loose"
                                                                                      valign="center"
                                                                                      >
                                                                                        <br></br>
                                                                                        Enter Course
                                                                                        <TextField
                                                                                            type = "string"
                                                                                            placeHolder = "Course"
                                                                                            onChange={(e) => {setContactAdminDetails({...contactAdminDetails, "educationDetails":{...contactAdminDetails['educationDetails'], course:String(e)}})}}
                                                                                            value = {contactAdminDetails.educationDetails.course}
                                                                                            thickness = "thin"
                                                                                          /> 
                                                                                          <br></br>
                                                                                        Enter College Name     
                                                                                        <TextField
                                                                                            type = "string"
                                                                                            placeHolder = "College"
                                                                                            onChange={(e) => {setContactAdminDetails({...contactAdminDetails, "educationDetails":{...contactAdminDetails['educationDetails'], collegeName:String(e)}})}}
                                                                                            value = {contactAdminDetails.educationDetails.collegeName}
                                                                                            thickness = "thin"
                                                                                          />
                                                                                        <br></br>
                                                                                        <FlexLayout spacing="extraLoose">
                                                                                        <Button onClick = {cancelAdminContact}>Cancel</Button>
                                                                                        <Button onClick = {() =>{setShowMultiStepForm({...showMultiStepForm, "currentStep":1})}}>Previous</Button>
                                                                                        <Button onClick = {() =>{
                                                                                                                    setShowMultiStepForm({...showMultiStepForm, "currentStep":3});
                                                                                                                    setContactAdminDetails({...contactAdminDetails, "educationDetails":{...contactAdminDetails['educationDetails'], "status": "completed"}})
                                                                                                                }}>Next</Button>
                                                                                        </FlexLayout>
                                                                                      </FlexLayout>
                                                                                      : showMultiStepForm.currentStep === 3?
                                            // COMMUNICATION DETAILS
                                                                                      <FlexLayout
                                                                                      direction="vertical"
                                                                                      halign="fill"
                                                                                      spacing="loose"
                                                                                      valign="center"
                                                                                      >
                                                                                        <br></br>
                                                                                        Enter Mobile Number
                                                                                        <TextField
                                                                                            type = "number"
                                                                                            placeHolder = "Mobile"
                                                                                            onChange={(e) => {setContactAdminDetails({...contactAdminDetails, "communicationDetails":{...contactAdminDetails['communicationDetails'], mobile:String(e)}})}}
                                                                                            value = {contactAdminDetails.communicationDetails.mobile}
                                                                                            thickness = "thin"
                                                                                          /> 
                                                                                          <br></br>
                                                                                        Enter City    
                                                                                        <TextField
                                                                                            type = "string"
                                                                                            placeHolder = "City"
                                                                                            onChange={(e) => {setContactAdminDetails({...contactAdminDetails, "communicationDetails":{...contactAdminDetails['communicationDetails'], city:String(e)}})}}
                                                                                            value = {contactAdminDetails.communicationDetails.city}
                                                                                            thickness = "thin"
                                                                                          />
                                                                                        <br></br>
                                                                                        <FlexLayout spacing="extraLoose">
                                                                                        <Button onClick = {cancelAdminContact}>Cancel</Button>
                                                                                        <Button onClick = {() =>{setShowMultiStepForm({...showMultiStepForm, "currentStep":2})}}>Previous</Button>
                                                                                        <Button onClick = {() =>{
                                                                                                                    setContactAdminDetails({...contactAdminDetails, "communicationDetails":{...contactAdminDetails['communicationDetails'], "status": "completed"}});
                                                                                                                    finishAdminContact();
                                                                                                                }}>Finish</Button>
                                                                                        </FlexLayout>
                                                                                      </FlexLayout>
                                                                                      :null
                                            }
                                          
                                        </Card>
            
                                        :null
          }
        

        <Card>
          {
            showForm?<Card>
              
              <Modal
                open= {showForm}
                close = {() =>{}}
                heading="Enter follwing Details"
              >
              
              Enter full name
              <TextField
              type = "string"
              placeHolder = "Full name"
              onChange={(e) => {setNewUser({...newUser, name:e})}}
              value = {newUser['name']}
              thickness = "thin"
            />
            <br></br>
            
            Enter current age
            <TextField
              type = "number"
              placeHolder = "Age"
              onChange={(e) => {setNewUser({...newUser, age:String(e)})}}
              value = {newUser['age']}
              thickness = "thin"
            />
            <br></br>

            Enter contact number
            <TextField
              type = "number"
              placeHolder = "Mobile"
              onChange={(e) => {setNewUser({...newUser, mobile:String(e)})}}
              value = {newUser.mobile}
              thickness = "thin"
            />
            <br></br>
            
            Enter current city
            <TextField
              type = "string"
              placeHolder = "City"
              onChange={(e) => {setNewUser({...newUser, city:e})}}
              value = {newUser.city}
              thickness = "thin"
            />
            <br></br>

            Selec the course
            <Select
              options = {[
                          {
                            label : "B.tech",
                            value: "B.tech"
                          },
                          {
                            label : "BCA",
                            value: "BCA"
                          },
                          {
                            label : "BBA",
                            value: "BBA"
                          },
                          {
                            label : "B.Com",
                            value: "B.Com"
                          }
                        ]}
              placeHolder = "Select the course"
              thickness = "thin"
              onChange = {(e) =>{setNewUser({...newUser, course:String(e)})}}
              value = {newUser.course}    
            />
            <br></br>
            Selec the course status
            <Select
              options = {[
                          {
                            label : "Completed",
                            value: "completed"
                          },
                          {
                            label : "final-year",
                            value: "final-year"
                          },
                          {
                            label : "pursuing",
                            value: "pursuing"
                          },
                          {
                            label : "pre-final-year",
                            value: "B.pre-final-year"
                          }
                        ]}
              placeHolder = "Select the course status"
              thickness = "thin"
              onChange = {(e) =>{setNewUser({...newUser, status:String(e)})}}
              value = {newUser.course}    
            />

            <Button onClick = {addNewUser}>Add now</Button>
            <Button onClick = {cancelAddNewUser}>Cancel</Button>
          </Modal></Card>: <FlexLayout 
                            spacing = "extraLoose"
                            >
                              <Button onClick = {() =>{setShowForm(true)}}>Add a new member</Button>
                              <Button onClick = {() =>{setShowMultiStepForm({...showMultiStepForm, "display":true})}}>Contact Admin</Button>
                            </FlexLayout>
      }
      <br></br>
      <Card>
      <Pagination
          countPerPage = {paginationDetails.countPerPage}
          currentPage={paginationDetails.currentPage}
          totalPages={paginationDetails.totalPages}
          onCountChange={updatePaginationCount}
          onNext={nextPage}
          onPrevious={previousPage}
          optionPerPage={[
            {
              label: '1',
              value: '1'
            },
            {
              label: '2',
              value: '2'
            },
            {
              label: '3',
              value: '3'
            }
          ]}
        />
      </Card>            
        </Card>
      </FlexLayout>
      
    </div>
  );

};
export default App;
