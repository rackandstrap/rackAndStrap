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

const CreateJob = () => {

    const[jobData, setJobData] = useState({})

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [selectedOption, setSelectedOption] = useState('');
    useEffect(() => {
        console.log('Selected option:', selectedOption);
    }, [selectedOption]);

    const states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

    let stateJsx = states.map((item,index)=>(
        <option>{item}</option>
    ))


    return (
        <div className="w-50">
            <h1>Create Job/Service</h1>
            <Form>
                <Form.Group className="mb-3" controlId="requestORprovide">
                {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                    inline
                    label="Looking for a ride!"
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                    checked={selectedOption === 'ride'}
                    onChange={() => setSelectedOption('ride')}
                    />
                    <Form.Check
                    inline
                    label="I have rack space!"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                    checked={selectedOption === 'rackSpace'}
                    onChange={() => setSelectedOption('rackSpace')}
                    />
                </div>
                ))}

                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="">
                        <Form.Label>Title: </Form.Label>
                        <Form.Control type="text" placeholder="Need a ride for my kayak!" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridBid">
                        <Form.Label>Offer/Asking</Form.Label>
                        <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                        <Form.Control
                        placeholder="$$ optional $$"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    </Form.Group>
                </Row>
                
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Kayaks</Form.Label>
                    <Form.Select defaultValue="Choose...">
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Canoes</Form.Label>
                    <Form.Select defaultValue="Choose...">
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Bikes</Form.Label>
                    <Form.Select defaultValue="Choose...">
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </Form.Select>
                    </Form.Group>
                </Row>

                <FloatingLabel controlId="floatingTextarea2" label="Detailed Description">
                <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
                />
                </FloatingLabel>
    
        <Row className="mb-3">
            <span>Departure:</span>
             
            <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select defaultValue="Choose...">
                {stateJsx}
            </Form.Select>
            </Form.Group>
            
            <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Date</Form.Label>
            <DatePicker
                showIcon
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                />
            </Form.Group>
            
        </Row>

        <Row className="mb-3">
            <span>Arrival:</span>
             
            <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select defaultValue="Choose...">
                {stateJsx}
            </Form.Select>
            </Form.Group>
            
            <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Date</Form.Label>
            <DatePicker
                showIcon
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                />
            </Form.Group>
            
        </Row>
                     

      <Button variant="primary" type="submit">
        Send it!
      </Button>
    </Form>


        </div>
    );
}

export default CreateJob;