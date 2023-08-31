import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const Update = () => {
  const id = useParams()
  const [obj, setOjb] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  async function onSubmit() {
    const token = localStorage.getItem("token") || null;
    if (obj.name == undefined || obj.status == undefined || obj.image == undefined || obj.email == undefined || obj.gender == undefined) {
      toast({
        title: "Warning",
        description: "Please fill all the details",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
    }
    else {
      try {
        if (token) {
          const { data } = await axios.put(
            `https://cute-rose-quail-robe.cyclic.app/api/users/${id.id}`,
            obj,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          toast({
            title: "Success",
            description: "Updated Record",
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

  const handleDelete = async(id) => {
    const token = localStorage.getItem("token") || null;
    try {
      if (token) {
        const { data } = await axios.delete(
          `https://cute-rose-quail-robe.cyclic.app/api/users/${id.id}`,
          obj,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast({
          title: "Success",
          description: "Record Deleted",
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

  return (
    <Flex justify={"space-around"}
      flexDirection={{base:"column-reverse", sm:"column-reverse" ,md:"row", lg:"row"}}
      align={"center"}
      borderRadius={"10px"}
      p={2}
      w={{ base: "90%", sm: "90%", md: "90%", lg: "90%" }}
    >
      <Box bg={"#fce5cd"} w={{ base: "90%", sm: "90%", md: "90%", lg: "40%" }} m={"auto"} mt={{ base: 10, md: 20 }} mb={{ base: 10, md: 20 }} borderRadius={20}>
        <Box p={4} width={"100%"} maxW={"container.xl"} m={"auto"}>
          <Heading>Update Record</Heading>
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
            placeholder="Gender"
            mt={2}
            name="gender"
            border={"1px solid gray"}
            onChange={(e) => setOjb({ ...obj, [e.target.name]: e.target.value })}
          />
          <Input
            placeholder="Status"
            mt={2}
            name="status"
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
      <Button colorScheme="red" onClick={()=>handleDelete(id)}>
        Delete Record
      </Button>
    </Flex>
  );
};

export default Update;
