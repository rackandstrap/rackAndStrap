import React, { useEffect } from 'react';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';
import './index.css'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../../slice/authUserSlice";

const MyJobs = () => {
    
    const API_BASE_URL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    // const forceUpdate = useForceUpdate();
    const userInfo2 = useSelector(state => state.userInfo);
    const dispatch = useDispatch()

    const [confirmDeleteModal, setconfirmDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState('');

    const[jobs, setJobs]= useState([])

    useEffect(()=>{
        setJobs(userInfo2.jobs)
    }, [])

    // const getJobs = useQuery({
    //     queryKey: ['posts'],
    //     queryFn: async () => {
    //       const response = await axios.get('http://localhost:3001/users/' + localStorage.getItem('user'));
    //       const data = await response.data;
    //     //   This is a list object
    //       console.log(data.jobs)
    //       console.log(typeof(data.jobs))
    //       return data.jobs;
    //     }
    //   })

    const attemptDelete = useMutation({
        
        mutationFn: async () => {
            let response = await axios({
                method: 'DELETE',
                url: API_BASE_URL + 'jobs/'+ itemToDelete,
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'}
            })
            return response.data
        },

        onSuccess: (returnedData) => {
            //close Modal 
            setconfirmDeleteModal(false)
            console.log(returnedData.user)
            dispatch(updateUserInfo(returnedData.user))
            setJobs(returnedData.user.jobs)
            // dispatch(setToken(returnedData.token))
            // localStorage.setItem('token', returnedData.token)
            // localStorage.setItem('user', returnedData.user._id)
            // dispatch(login())
            // navigate('/home');
        },

        onError: (error) => {
            console.error(error);
            // setLoginError(true)
        },
    })
            

    const handleEdit =(value)=>{
        console.log("edit", value)
    };

    const closeModal = () => {
        console.log("close modal")
        setconfirmDeleteModal(false)
        setItemToDelete('')
    };

    const handleDelete=(value)=>{
        console.log("delete", value)
        setconfirmDeleteModal(true)
        setItemToDelete(value)
    }

    const confirmDelete=()=>{
        console.log(itemToDelete)
        attemptDelete.mutate()
        
    }
    
    return (
        <div>
        <h1>MyJobs</h1>
        { jobs.map((item) => (
            
            <div className='jobCard'>
                <p key={uuidv4()}>{item}</p>
                <Button  variant="secondary" onClick={()=>handleEdit(item)}> Edit </Button >
                <Button variant="danger" onClick={()=>handleDelete(item)}> Delete </Button >
            </div>
        ))}
            <Modal show={confirmDeleteModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>You are about to delete this post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this? This cannot be undone.</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-between">
                    <Button variant="secondary" onClick={closeModal}>
                    Cancel
                    </Button>
                    {/* <div style={{ margin: '0 130px' }}></div> */}
                    <Button variant="danger" onClick={confirmDelete}>
                    Confirm
                    </Button>
                    {/* Add any other buttons or actions you need */}
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default MyJobs;