import React, { useState } from 'react'
import {AiTwotoneEdit} from 'react-icons/ai'
import {MdDelete} from 'react-icons/md';
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
export const SinglePost = (props) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data,setdata] = useState(props);
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const handleChange = (e)=>{
    setdata({...data,[e.target.name]:e.target.value})
  }
    const{image,_id, heading, content ,like_data,likes, user_id} = props;
    const handlePostEdit= async()=>{
      await axios.put(`https://adobe-assignment-liard.vercel.app/posts/${_id}`,data).then((res)=>{
      console.log(res.data);
    }).catch((e)=>{
      console.log(e);
    })
    }
    const deletePost = async () =>{
      await axios.delete(`http://localhost:8080/posts/${_id}`).then((res)=>{
        navigate('/')
      }).catch((e)=>{
        console.log(e);
      })
    }
  return (
    <div className='singleBottom'>
        <img src={image}/>
        <div>
        <AiTwotoneEdit   onClick={onOpen} />
        <MdDelete onClick={deletePost}/>
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
              <FormLabel>Heading</FormLabel>
              <Input ref={initialRef} placeholder='Enter Heading' value={data.heading} name='heading' isRequired onChange={handleChange} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Content</FormLabel>
              <Input placeholder='Enter Bio' value={data.content} name='content' onChange={handleChange} isRequired />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={()=>{
              handlePostEdit()
              onClose();
            }} mr={3}>
              Save
            </Button>
            <Button onClick={()=>{
              onClose();
            }}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
