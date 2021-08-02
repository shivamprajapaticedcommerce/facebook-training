import React, {useState, useEffect} from 'react';
import { 
          Button,
          Accordion, 
          TextField, 
          Badge, 
          Card, 
          FlexLayout, 
          AutoComplete,
          Avatar, 
          Sidebar,
          BodyHeader,
          Radio,
          CheckBox,
          TextArea,
          Modal,
          Table

        } from '@cedcommerce/ounce-ui'
import '@cedcommerce/ounce-ui/dist/index.css'
import './App.css';
import { auto } from 'async';

function App() {

  // USE STATE
  const [accordion, setAccordion] = useState({active: false, value:""})
  const [autoComplete, setAutoComplete] = useState("")
  const [gender, setGender] = useState("")
  const [selectedGender, setSelectedGender] = useState(false)
  const [badge, setBadge] = useState({destroy: false, content: "Showing Regular Badge"})
  const [contactForm, setContactForm] = useState({showForm: false, 
                                                  userDetails: [{
                                                                  fullName: "Shivam Prajapati",
                                                                  age: '22',
                                                                  gender:'Male',
                                                                  highSchool: "Passed",
                                                                  intermediate:"Passed",
                                                                  graduation:"Passed",
                                                                  postGraduation: "N/A",
                                                                  doctrate:"N/A",
                                                                  mobile:"7894479998",
                                                                  address: "Panki Kanpur"
                                                                }
                                                                ], 
                                                  currentUser: {
                                                                name:"", 
                                                                age:"", 
                                                                gender:"",
                                                                selectedGender :false, 
                                                                education:{
                                                                  highSchool: false, 
                                                                  intermediate: false, 
                                                                  graduation: false, 
                                                                  postGraduation: false, 
                                                                  doctrate:false}, 
                                                                mobile:"", 
                                                                address:""
                                                                  },
                                                                  modalView: false})
  const [showForm, setShowForm] = useState(false)

  //----------------------------------------------------------------Accordion-------------------------------------------------------------------------------

  const toggleAccordion = () =>{
    setAccordion({...accordion, active: !accordion.active, value: ""})
  }

  // -----------------------------------------------------------------Badge-------------------------------------------------------------

  const destroyBadge = () =>{
    setBadge({...badge, destroy: true})
    console.log("destroy badge")
  }

  const showBadge = () =>{
    setBadge({...badge, destroy: true})
  }

  // -----------------------------------------------------------------User Contact Form----------------------------------------------------

  const showUserDetailsModal = () =>{
   setContactForm({...contactForm, "modalView":true})
   console.log(contactForm.modalView)
  
  }

  const submitUserDetails = () =>{
    let updatedUserDetails = contactForm.userDetails
    let currentUser = contactForm.currentUser
    let newUser = {}
    newUser['fullName'] = currentUser['name']
    newUser['age'] = currentUser['age']
    newUser['gender'] = currentUser['gender']
    for(let educ in currentUser['education'])
    {
      if(currentUser['education'][educ])
      {
        newUser[educ] = "Passed"
      }
      else{
        newUser[educ] = "N/A"
      }
    }
    newUser['mobile'] = currentUser['mobile']
    newUser['address'] = currentUser['address']

    updatedUserDetails.push(newUser)
    setContactForm({...contactForm, userDetails: updatedUserDetails,modalView: false,  currentUser: {
                                                                                        name:"", 
                                                                                        age:"", 
                                                                                        gender:"", 
                                                                                        education:{
                                                                                          highSchool: false, 
                                                                                          intermediate: false, 
                                                                                          graduation: false, 
                                                                                          postGraduation: false, 
                                                                                          doctrate:false}, 
                                                                                        mobile:"", 
                                                                                        address:""
                                                                                        }
                                                                                      })
  }

  //USE EFFECT
  useEffect(() => {
    console.log(contactForm.userDetails.length)
  }, [contactForm])




  return (
    <div className="App">
      <Card>
        <FlexLayout halign="center">
          <Avatar
            color="blue"
            size="large"
            text="SP"
            type="circle"
          />
        </FlexLayout>
      </Card>

      <div id="app-body">


        <div id = "sidebar">
        <Sidebar
          menu={[
            {
              content: 'Accordion',
              // icon: <svg height="20" viewBox="0 0 18 20" width="18" xmlns="http://www.w3.org/2000/svg"><g id="home" transform="translate(1 1)"><path d="M3,8.3,11,2l8,6.3v9.9A1.789,1.789,0,0,1,17.222,20H4.778A1.789,1.789,0,0,1,3,18.2Z" dataName="Path 3" fill="none" id="Path_3" stroke="#413bbc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transform="translate(-3 -2)"/><path d="M9,21.345V12h5.475v9.345" dataName="Path 4" fill="none" id="Path_4" stroke="#413bbc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transform="translate(-3.737 -3.345)"/></g></svg>,
              id: 'accordion',
              path: '/accordion'
            },
            {
              content: 'Autocomplete',
              // icon: <svg height="20" viewBox="0 0 18 20" width="18" xmlns="http://www.w3.org/2000/svg"><g id="home" transform="translate(1 1)"><path d="M3,8.3,11,2l8,6.3v9.9A1.789,1.789,0,0,1,17.222,20H4.778A1.789,1.789,0,0,1,3,18.2Z" dataName="Path 3" fill="none" id="Path_3" stroke="#413bbc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transform="translate(-3 -2)"/><path d="M9,21.345V12h5.475v9.345" dataName="Path 4" fill="none" id="Path_4" stroke="#413bbc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transform="translate(-3.737 -3.345)"/></g></svg>,
              id: 'autocomplete',
              path: '/autocomplete'
            },
            {
              content: 'Badge',
              // icon: <svg height="20" viewBox="0 0 18 20" width="18" xmlns="http://www.w3.org/2000/svg"><g id="home" transform="translate(1 1)"><path d="M3,8.3,11,2l8,6.3v9.9A1.789,1.789,0,0,1,17.222,20H4.778A1.789,1.789,0,0,1,3,18.2Z" dataName="Path 3" fill="none" id="Path_3" stroke="#413bbc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transform="translate(-3 -2)"/><path d="M9,21.345V12h5.475v9.345" dataName="Path 4" fill="none" id="Path_4" stroke="#413bbc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transform="translate(-3.737 -3.345)"/></g></svg>,
              id: 'badge',
              path: '/badge'
            }
          ]}
          onChange={(e) => {console.log(e)}}
        
        />
        </div>

          <div id= "app-content">
             
            <div className = "app-content" id="accordion">
            <h1>Accordion</h1>
            <Card>
            {
              accordion["active"]?
                                <Accordion
                                    active
                                    onClick={toggleAccordion}
                                    title={<>Title<Badge type="Success">Enter your name here.</Badge></>}
                                    useDefaultUI
                                  >
                                    <Card>
                                      <TextField value = {accordion.value} onChange={(e) => {setAccordion({...accordion, value: e})}} />
                                    </Card>
                                  </Accordion>
                                  
                                : <Accordion
                                      onClick={toggleAccordion}
                                      title={<>Title<Badge type="Success">Enter your name here.</Badge></>}
                                      useDefaultUI
                                    >
                                    
                                  </Accordion>
              }
              </Card>
              </div>


              <div className = "app-content">
              <h1>Auto Complete</h1>
              <Card>
                <FlexLayout halign="center">
                  <AutoComplete
                    name = "Choose your city"
                    onChange={(e) => {setAutoComplete(e)}}
                    onEnter={(e) => {setAutoComplete(e)}}
                    options={[
                      {
                        label: 'Jaipur',
                        value: 'Jaipur'
                      },
                      {
                        label: 'kanpur',
                        value: 'kanpur'
                      },
                      {
                        label: 'Lucknow',
                        value: 'Lucknow'
                      },
                      {
                        label: 'Hyderabad',
                        value: 'Hyderabad'
                      },
                      {
                        label: 'Mumbai',
                        value: 'Mumbai'
                      },
                      {
                        label: 'Chennai',
                        value: 'Chennai'
                      }
                    ]}
                    value= {autoComplete}
                  />
                </FlexLayout>
              </Card>
            </div>

            
            <div className = "app-content" id="badge">
              <h1>Badge</h1>
                {
                  badge.destroy?<Button onClick = {showBadge}>Show badge</Button>:<Badge
                  destroy = {destroyBadge}
                  size="regular"
                  type="Success"
                >
                  Showing Regular Badge
                </Badge>
                }
              
            </div>


            <div className = "app-content" id="contact-form">
              <h1>Admin Contact Form</h1>
              <p>Click the button below to contact the admin.</p>
                {
                  showForm?
                                        <Card>
                                          <br></br>

                                          Enter your full name
                                          <TextField
                                            type = "string"
                                            placeHolder = "Full name"
                                            onChange={(e) => {setContactForm({...contactForm, "currentUser":{...contactForm['currentUser'], name:e}})}}
                                            value = {contactForm.currentUser.name}
                                            thickness = "thin"
                                            
                                          />
                                          <br></br>

                                          Enter your age
                                          <TextField
                                            type = "number"
                                            placeHolder = "Age"
                                            onChange={(e) => {setContactForm({...contactForm, "currentUser":{...contactForm['currentUser'], age:String(e)}})}}
                                            value = {contactForm.currentUser.age}
                                            thickness = "thin"
                                          />

                                          <br></br>

                                            Enter you gender
                                              <Radio labelVal = "Male" name = "gender" onClick={() =>{setGender("Male"); console.log(gender)}}/>
                                              <br></br>
                                              <Radio labelVal = "Female" name = "gender" onClick={() =>{setGender("Female"); console.log(gender)}}/>

                                          <br></br>
                                          
                                            Education Qualifications till date
                                            <CheckBox labelVal = "High School" checked = {contactForm.currentUser.education.highSchool} onClick={() => {setContactForm({...contactForm, "currentUser":{...contactForm['currentUser'], "education":{...contactForm['currentUser']['education'], highSchool:!contactForm.currentUser.education.highSchool }}})}} />
                                            <br></br>
                                            <CheckBox labelVal = "Intermediate" checked = {contactForm.currentUser.education.intermediate} onClick={() => {setContactForm({...contactForm, "currentUser":{...contactForm['currentUser'], "education":{...contactForm['currentUser']['education'], intermediate:!contactForm.currentUser.education.intermediate }}})}} />
                                            <br></br>
                                            <CheckBox labelVal = "Graduation" checked = {contactForm.currentUser.education.graduation} onClick={() => {setContactForm({...contactForm, "currentUser":{...contactForm['currentUser'], "education":{...contactForm['currentUser']['education'], graduation:!contactForm.currentUser.education.graduation }}})}} />
                                            <br></br>
                                            <CheckBox labelVal = "Post-Graduation" checked = {contactForm.currentUser.education.postGraduation} onClick={() => {setContactForm({...contactForm, "currentUser":{...contactForm['currentUser'], "education":{...contactForm['currentUser']['education'], postGraduation:!contactForm.currentUser.education.postGraduation }}})}} />
                                            <br></br>
                                            <CheckBox labelVal = "Doctrate" checked = {contactForm.currentUser.education.doctrate} onClick={() => {setContactForm({...contactForm, "currentUser":{...contactForm['currentUser'], "education":{...contactForm['currentUser']['education'], doctrate:!contactForm.currentUser.education.doctrate }}})}} />
                                          
                                          <br></br>

                                          Enter your mobile number (calling number)
                                          <TextField
                                            type = "number"
                                            placeHolder = "Calling Number"
                                            onChange={(e) => {setContactForm({...contactForm, "currentUser":{...contactForm['currentUser'], mobile:String(e)}})}}
                                            value = {contactForm.currentUser.mobile}
                                            thickness = "thin"
                                          />

                                          <br></br>

                                          Entrer your current Permanent Address
                                          <TextArea
                                            placeHolder = "Permanent Address"
                                            value = {contactForm.currentUser.address}
                                            onChange={(e) => {setContactForm({...contactForm, "currentUser":{...contactForm['currentUser'], address:String(e)}})}}
                                            rows={2}
                                          />

                                          <br></br>

                                          <Button onClick = {() =>{setContactForm({...contactForm, modalView: true})}}>Proceed</Button>
                                         
                                            
                                            <Modal
                                                  open= {contactForm.modalView}
                                                  close = {() =>{}}
                                                  // onClose = {setContactForm({...contactForm, modalView: false})}
                                                  heading="Are you sure want to contact admin with these details?"
                                                  primaryAction={{
                                                    loading: false,
                                                    onClick :()=>{}
                                                  }}
                                                  secondaryAction={{
                                                    loading: false,
                                                    onClick:()=>{}
                                                  }}
                                                >
                                                  <p><b>Name: </b>{contactForm.currentUser.name}</p>
                                                  <p><b>Age: </b>{contactForm.currentUser.age}</p>
                                                  <p><b>Gender: </b>{contactForm.currentUser.gender}</p>
                                                  <p><b>Education Qualifications: </b></p>
                                                  
                                                    <p>{contactForm.currentUser.education.highSchool?"High School":null}</p>
                                                    <p>{contactForm.currentUser.education.intermediate?"Intermediate":null}</p>
                                                    <p>{contactForm.currentUser.education.graduation?"Graduation":null}</p>
                                                    <p>{contactForm.currentUser.education.postGraduation?"Post Graduation":null}</p>
                                                    <p>{contactForm.currentUser.education.doctrate?"Doctrate":null}</p>
                                                  
                                                  <p><b>Mobile: </b>{contactForm.currentUser.mobile}</p>
                                                  <p><b>Address: </b>{contactForm.currentUser.address}</p>
                                                  
                                                </Modal>
                                          
                                        </Card>
                       
                                      :
                                      <Button onClick ={() =>{setShowForm(true)}}>Contact Admin</Button>
                }
              
            </div>
            
            <div className = "app-content" id="user-table">
              <h1>All Registered User</h1>
              {
              contactForm.userDetails.length >0?
                                <Table
                                  columns={{
                                    fullName: {
                                      alignment: 'center',
                                      filter: false,
                                      show: true,
                                      title: 'Full Name',
                                      type: 'string'
                                    },
                                    age: {
                                      alignment: 'center',
                                      filter: false,
                                      show: true,
                                      title: 'Age',
                                      type: 'string'
                                    },
                                    gender: {
                                      alignment: 'center',
                                      filter: false,
                                      show: true,
                                      title: 'Gender',
                                      type: 'string'
                                    },
                                    highSchool: {
                                      alignment: 'center',
                                      filter: false,
                                      show: true,
                                      title: 'High School',
                                      type: 'string'
                                    },
                                    intermediate: {
                                      alignment: 'center',
                                      filter: false,
                                      show: true,
                                      title: 'Intermediate',
                                      type: 'string'
                                    },
                                    graduation: {
                                      alignment: 'center',
                                      filter: false,
                                      show: true,
                                      title: 'Graduation',
                                      type: 'string'
                                    },
                                    postGraduation: { 
                                      alignment: 'center',
                                      filter: false,
                                      show: true,
                                      title: 'Post Graduation',
                                      type: 'string'
                                    },
                                    doctrate: {
                                      alignment: 'center',
                                      filter: false,
                                      show: true,
                                      title: 'Doctrate',
                                      type: 'string'
                                    },
                                    mobile: {
                                      alignment: 'center',
                                      filter: false,
                                      show: true,
                                      title: 'Mobile',
                                      type: 'string'
                                    },
                                    address: {
                                      alignment: 'center',
                                      filter: false,
                                      show: true,
                                      title: 'Address',
                                      type: 'string',
                                      
                                    },
                                    }}
                                rows = {contactForm.userDetails}
                                  
                                />
                                : "No data found."
            }                            
            </div>


            <div id="footer">
                <hr></hr>
                <p>Copyright Reserved.</p>
              
            </div>

          </div> 
      </div>
     
    </div>
  );
}

export default App;
