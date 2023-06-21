import React from "react";
import {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const CreateJob = () => {

    //Dynamic text for request vs service
    const request_copy = {
        "titlePlaceHolder":"My boat need a ride",
        "equipmentTitle":"Equipment:",
        "descriptionPlaceHolder":"Need help moving a WAKA, flexible on dates",
        "from":"From:",
        "to":"To:"
    }
    const service_copy = {
        "titlePlaceHolder":"Going Gauley Fest, room for 2 boats!",
        "equipmentTitle":"Space for:",
        "descriptionPlaceHolder":"Going to Gauley Fest, space for boats, please reach out!",
        "from":"Leaving:",
        "to":"Arriving:"
    }
    const[copyText, setCopyText] = useState(request_copy);

    //Main jobData to send to the backend
    const[jobData, setJobData] = useState({
        postedBy: "123",
        type: "provide",
        title: "",
        description:"",
        items: {},
        bid: 0,
        from: {},
        destination: {},
        leaveDate: new Date(),
        arrivalDate: new Date(),
        status: "open"
    });

    //Equipment Quanity will be send as an equipment object as part
    //of the main data
    const[equipmentAndQuanity, setEquipmentAndQuanity] = useState({});
    const[selectEquipment, setEquipment] = useState('Creek Boat');
    const[selectQuantity, setQuantity] = useState(0);

    
    //We will only show equipment that have quanity more than
    const handleAddButtonClick=()=>{

        let placeholder = equipmentAndQuanity
        placeholder[selectEquipment]=selectQuantity

        setEquipmentAndQuanity(placeholder)

        console.log(placeholder)

        setJobData(jobData =>({
            ...jobData,
            items:placeholder
        }));
    }

    const removeItemFromEquipmentObject=(key)=>{
        
        console.log("removing:", key)
        // setEquipmentAndQuanity(equipmentAndQuanity =>({
        //     ...equipmentAndQuanity,
        //     [key]:0,
        // }));

        let placeholder = equipmentAndQuanity
        delete placeholder[key];

        setJobData(jobData =>({
            ...jobData,
            items:placeholder
        }));

        console.log(equipmentAndQuanity)
    }

    const handleSelectEquipment = (event) => {
        setEquipment(event.target.value)
    }
    const handleSelectQuantity = (event) => {
        setQuantity(Number(event.target.value))
    }

    let equipmentRender = Object.entries(equipmentAndQuanity).map(([key, value]) => {
        if(value > 0){
            return(
                <div key={key} className="equipmentLabel">
                    <span>{key}: </span>
                    <span className="valueCount">{value}</span>
                    <Button  className="btn btn-danger btn-xs" id="delete" onClick={()=>removeItemFromEquipmentObject(key)}>
                        -
                    </Button>
                </div>
            )
        } else {
            return null
        }
    })

    const handleFromCity =(event)=>{
        console.log(event.target.value)
        let newFromLocation = jobData.from
        newFromLocation.city = event.target.value
        setJobData(jobData =>({
            ...jobData,
            from: newFromLocation
        }));
    }
    const handleFromState =(event)=>{
        console.log(event.target.value)
        let newFromLocation = jobData.from
        newFromLocation.state = event.target.value
        setJobData(jobData =>({
            ...jobData,
            from: newFromLocation
        }));
    }

    const handleToCity =(event)=>{
        console.log(event.target.value)
        let newFromLocation = jobData.destination
        newFromLocation.city = event.target.value
        setJobData(jobData =>({
            ...jobData,
            destination: newFromLocation
        }));
    }

    const handleToState =(event)=>{
        console.log(event.target.value)
        let newFromLocation = jobData.destination
        newFromLocation.state = event.target.value
        setJobData(jobData =>({
            ...jobData,
            destination: newFromLocation
        }));
    }

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleDateChange=(date,type)=>{

        
        let dateFormat= JSON.stringify(date);

        if(type==="from"){
            setStartDate(date)
            setJobData(jobData =>({
                ...jobData,
                leaveDate: dateFormat
            }));
        }
        else{
            setEndDate(date)
            setJobData(jobData =>({
                ...jobData,
                arrivalDate: dateFormat
            }));
        }

    }

    const handleOfferAmount=(event)=>{
        console.log(event.target.value)
        setJobData(jobData =>({
            ...jobData,
            bid: Number(event.target.value)
        }));
    }

    const [selectedOption, setSelectedOption] = useState('request');

    useEffect(() => {
        console.log('Selected option:', selectedOption);
        setJobData(jobData =>({
            ...jobData,
            type: selectedOption
        }));
    }, [selectedOption]);

    const handleSelectModeChange =(value)=>{
        setSelectedOption(value)
        if(value === 'request'){
            setCopyText(request_copy)
        } else {
            setCopyText(service_copy)
        }
    }

    const handleTitle = (event) =>{
        setJobData(jobData =>({
            ...jobData,
            title: event.target.value
        }));
    }

    const handleDetails = (event) =>{
        setJobData(jobData =>({
            ...jobData,
            description: event.target.value
        }));
    }

    const states = ['','AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

    let stateJsx = states.map((item,index)=>(
        <option>{item}</option>
    ))

    const checkAndSubmit=()=>{
        
        console.log(jobData)
        //validate Data

        //Send data

        //on success display message

        //Remove data from form and close the modal

    }

    return (
        <div className="w-50">
            <h1>Create Job/Service</h1>
            <Form>
                <Form.Group className="mb-3" controlId="requestORprovide">
                {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                    inline
                    label={"Looking for a ride!"}
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                    checked={selectedOption === 'request'}
                    onChange={() => handleSelectModeChange('request')}
                    />
                    <Form.Check
                    inline
                    label="I have rack space!"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                    checked={selectedOption === 'service'}
                    onChange={() => handleSelectModeChange('service')}
                    />
                </div>
                ))}

                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="">
                        <Form.Label>Title: </Form.Label>
                        <Form.Control className="textarea" placeholder={copyText.titlePlaceHolder} maxlength="50" onChange={handleTitle}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridBid">
                        <Form.Label>Offer/Asking</Form.Label>
                        <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                        <Form.Control
                        placeholder="optional"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        type="text"
                        pattern="\d*" maxlength="4"
                        onChange={handleOfferAmount}
                        />
                    </InputGroup>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridStateEquipment">
                        <Form.Label>{copyText.equipmentTitle}</Form.Label>
                        <Form.Select defaultValue="Choose..." onChange={handleSelectEquipment}>
                            <option>Creek Boat</option>
                            <option>Sit On Top</option>
                            <option>Paddle Board</option>
                            <option>Half Slice</option>
                            <option>Play Boat</option>
                            <option>Full Slice</option>
                            <option>Canoe</option>
                            <option>Bike</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridStateQuantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Select defaultValue="Choose..." onChange={handleSelectQuantity}>
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridStateAdd" className="addEquipmentButton">
                        
                        <Button variant="success" onClick={handleAddButtonClick}>
                        +
                        </Button>
                    </Form.Group>

                </Row>

                {/* We append equipment type and quanity here*/}
            
                {equipmentRender}

                <Form.Label>Detailed Description:</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder={copyText.descriptionPlaceHolder}
                    style={{ height: '80px' }}
                    onChange={handleDetails}
                    maxlength="300"
                    />
                
    
        <Row className="mb-3">
            <span>{copyText.from}</span>
             
            <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control onChange={handleFromCity}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select defaultValue="Choose..." onChange={handleFromState}>
                {stateJsx}
            </Form.Select>
            </Form.Group>
            
            <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Date</Form.Label>
            <DatePicker
                showIcon
                selected={startDate}
                onChange={(date) => handleDateChange(date,"from")}
                />
            </Form.Group>
            
        </Row>

        <Row className="mb-3">
            <span>{copyText.to}</span>
             
            <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control onChange={handleToCity}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select defaultValue="Choose..." onChange={handleToState}>
                {stateJsx}
            </Form.Select>
            </Form.Group>
            
            <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Date</Form.Label>
            <DatePicker
                showIcon
                selected={endDate}
                onChange={(date) => handleDateChange(date,"to")}
                />
            </Form.Group>
            
        </Row>
                     

      <Button variant="primary" type="button" onClick={checkAndSubmit}>
        Send it!
      </Button>
    </Form>


        </div>
    );
}

export default CreateJob;