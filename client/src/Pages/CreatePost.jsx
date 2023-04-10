import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { appContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
export function CreatePost() {

  const toast = useToast();
  const navigate= useNavigate();
  const {loggedIn} = useContext(appContext)
  const [formData, setformData] = useState({ user_id:"",content: "", heading: "", image: "" });
  const handleChange= (e) =>{
    setformData({...formData,[e.target.name]:e.target.value});
  }
  const handleSumbit = async  () =>{
    if(loggedIn){
      const obj= {...formData,user_id:loggedIn._id}
    await axios.post('https://adobe-assignment-liard.vercel.app/posts',obj).then((res)=>{
      navigate('/');
    })
    }
    else{
      toast({
        title: 'Login Error',
        position: "top",
        description: "Login first",
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
    }
  }
  
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>

        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="heading" isRequired>
              <FormLabel>Heading</FormLabel>
              <Input type="text" name='heading' value={formData.heading} onChange={handleChange}  />
            </FormControl>
            <FormControl id='content' isRequired>
              <FormLabel>Content</FormLabel>
              <Input type="text" name='content' value={formData.content} onChange={handleChange}  />
            </FormControl>
            <FormControl id="image" isRequired>
              <FormLabel>Image Url</FormLabel>
              <Input type="text" name='image' value={formData.image} onChange={handleChange} />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button 
              onClick={handleSumbit}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}