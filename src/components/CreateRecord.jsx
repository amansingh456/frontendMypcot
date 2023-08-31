import {
   Box,
   Button,
   Heading,
   Input,
   useToast,
 } from "@chakra-ui/react";
 import axios from "axios";
 import { useState } from "react";
 import { useNavigate } from "react-router";
 
 const CreateRecord = () => {
   const [obj, setOjb] = useState({});
   const toast = useToast();
   const navigate = useNavigate();
   async function onSubmit() {
     const token = localStorage.getItem("token") || null;
     if (obj.name == undefined || obj.image == undefined || obj.email == undefined || obj.gender==undefined) {
       toast({
         title: "Warning",
         description: "Please fill all the details",
         status: "warning",
         duration: 5000,
         isClosable: true,
         position: "top",
       })
     }
     else{
       try {
         if (token) {
           const { data } = await axios.post(
             "https://cute-rose-quail-robe.cyclic.app/api/users",
             obj,
             {
               headers: {
                 Authorization: `Bearer ${token}`,
               },
             }
           );
           toast({
             title: "Success",
             description: "Record Posted",
             status: "success",
             duration: 3000,
             isClosable: true,
             position: "top",
           });
           navigate("/");
         } else {
           toast({
             title: "Error",
             description: "Please Login First",
             status: "error",
             duration: 3000,
             isClosable: true,
             position: "top",
           });
         }
       } catch (error) {
         toast({
           title: "Error",
           description: error.message,
           status: "error",
           duration: 3000,
           isClosable: true,
           position: "top",
         });
       }
     }
     
   }
 
   return (
     <Box bg={"#fce5cd"}  w={{base:"90%", sm:"80%", md:"60%", lg:"40%"}} m={"auto"} mt={{base:10, md:20}} mb={{base:10,md:20}} borderRadius={20}>
       <Box p={4} width={"100%"} maxW={"container.xl"} m={"auto"}>
         <Heading>Create Record</Heading>
         <Input
           placeholder="Name"
           mt={4}
           name="name"
           border={"1px solid gray"}
           onChange={(e) => setOjb({ ...obj, [e.target.name]: e.target.value })}
         />
         <Input
           placeholder="Image Link"
           mt={2}
           name="image"
           border={"1px solid gray"}
           onChange={(e) => setOjb({ ...obj, [e.target.name]: e.target.value })}
         />
         <Input
           placeholder="Email"
           mt={2}
           name="email"
           border={"1px solid gray"}
           onChange={(e) => setOjb({ ...obj, [e.target.name]: e.target.value })}
         />
         <Input
           placeholder="gender"
           mt={2}
           name="gender"
           border={"1px solid gray"}
           onChange={(e) => setOjb({ ...obj, [e.target.name]: e.target.value })}
         />
         <Button onClick={onSubmit} mt={4} p={5} bg={"#323232"} color={"white"} fontWeight='bold' _hover={{ bg: '#323232' }} _focus={{
             boxShadow:
               '0 0 1px 2px rgba(50, 50, 50, .75), 0 1px 1px rgba(0, 0, 0, .15)',
             bg: "#cec0b8",
             color: "#323232"
           }}>
           Submit
         </Button>
       </Box>
     </Box>
   );
 };
 
 export default CreateRecord;
 