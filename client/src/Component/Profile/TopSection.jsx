import React, { useContext, useState } from 'react'
import  './profile.css'
import { Button, ButtonGroup, FormControl, FormLabel, Input, useDisclosure } from '@chakra-ui/react';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { appContext } from '../../Context/AppContext';
export const TopSection = (props) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {setLoggedIn} = useContext(appContext)
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const {id} = useParams();
  const {profile_pic, name , email, bio} = props;
  const [obj,setObj] = useState({name:name,bio:bio})

  const handleChange = (e) =>{
    setObj({...obj,[e.target.name]:e.target.value})
  }

  const editprofile = async () =>{
    await axios.put(`https://adobe-assignment-liard.vercel.app/users/${id}`,obj).then((res)=>{
      console.log(res.data);
    }).catch((e)=>{
      console.log(e);
    })
  }
  const deleteProfile = async () =>{
    await axios.delete(`http://localhost:8080/users/${id}`).then((res)=>{
      
      navigate('/')
      setLoggedIn(undefined)
    }).catch((e)=>{
      console.log(e);
    })
  }
  
  return (
    <div className='topsection'>
      <div className='top_image'>
        <img src={profile_pic} alt="" />
      </div>
      <div className='top_data'>
      <div>{obj.name}</div>
      <div>{email}</div>
      <div>{obj.bio}</div>
      <ButtonGroup gap={4}>
        <Button colorScheme="orange" 
        onClick={onOpen}
         >Edit</Button>
        <Button  colorScheme="red" onClick={deleteProfile}>Delete Account</Button>
      </ButtonGroup>
      </div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Your Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input ref={initialRef} placeholder='Enter Name' value={obj.name} name='name' isRequired onChange={handleChange} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Bio</FormLabel>
              <Input placeholder='Enter Bio' value={obj.bio} name='bio' onChange={handleChange} isRequired />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={()=>{
              editprofile()
              onClose();
            }} mr={3}>
              Save
            </Button>
            <Button onClick={()=>{
              // editprofile()
              onClose();
            }}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
