import React from 'react';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';
import './index.css'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // A function that increment the previous state like here 
    // is better than directly setting `setValue(value + 1)`
}

const MyJobs = () => {
    const navigate = useNavigate();
    const forceUpdate = useForceUpdate();

    const [confirmDeleteModal, setconfirmDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState('');

    const getJobs = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
          const response = await axios.get('http://localhost:3001/users/' + localStorage.getItem('user'));
          const data = await response.data;
        //   This is a list object
          console.log(data.jobs)
          console.log(typeof(data.jobs))
          return data.jobs;
        }
      })

      const attemptDelete = useMutation({

        mutationFn: async (value) => {
            let response = await axios({
                method:'delete',
                url: 'http://localhost:3001/jobs/'+value,
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'}
            })
            return response.data
        },

        onSuccess: (returnedData) => {
            // dispatch(auth(returnedData.user))
            // dispatch(setToken(returnedData.token))
            // localStorage.setItem('token', returnedData.token)
            // localStorage.setItem('user', returnedData.user._id)
            // dispatch(login())
            // navigate('/home');
            console.log(returnedData)
            setItemToDelete('')
            setconfirmDeleteModal(false)
            
        },

        onError: (error) => {
            console.error(error);
            // setLoginError(true)
        }
        
    })

    const handleEdit =(value)=>{
        console.log("edit", value)
    }

    const closeModal = () => {
        console.log("close modal")
        setconfirmDeleteModal(false)
        setItemToDelete('')
    };

    const handleDelete=(value)=>{
        console.log("delete", value)
        setconfirmDeleteModal(true)
        setItemToDelete(value)
        // attemptDelete.mutate(value)
    }

    const confirmDelete=()=>{
        console.log(itemToDelete)
        attemptDelete.mutate(itemToDelete)
        forceUpdate()
    }
    
    if( getJobs.isLoading ) return ( <h1>Loading....</h1>)
    if( getJobs.isError ) return (<h1>Error loading data!!!</h1>)
    return (
        <div>
        <h1>MyJobs</h1>
        { getJobs.data.map((item) => (
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