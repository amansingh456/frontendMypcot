
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web"
import animationData from "../animation_llnaopyn.json"
import SingleRecord from "./SingleRecord";

const Homepage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const container = useRef(null)
  useEffect(() => {

    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    })
    async function fetchPosts() {
      const { data } = await axios.get(
        `https://cute-rose-quail-robe.cyclic.app/api/users`
      );
      setBlogPosts(data);
    }
    fetchPosts();
  }, []);
  return (
    <Box bg={"#fdefe1"}>
      <Box p={4} bg={"#fdefe1"} maxW={"container.xl"} m={"auto"} >
        <Flex flexDirection={{base:"column-reverse",sm:"column-reverse", md:"row"}} align={"center"} justifyContent={"space-between"}>
          <Box>
            <Text mt={{base:6, sm:8, md:20}} fontFamily={"Poppins"} fontSize={{base:"18px",sm:"20px", md:"24px", lg:"26px"}}>
              Our home is a unique as you are 😊
            </Text>
            <Text display={{ base: "none", sm: "none", md: "block" }} mt={5} fontFamily={"Poppins"} fontSize={40} fontWeight={"bold"}>
              Brightning homes with miantaining the Records.
            </Text>
          </Box>
          <Box ref={container}  >
          </Box>
        </Flex>

      </Box>
      <Box p={4} bg={"#fce5cd"} maxW={"container.xl"} m={"auto"} >
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10} >
          {/* {console.log(blogPosts)} */}
          {blogPosts?.map((post, ind) => (
            <SingleRecord post={post} key={ind}/>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Homepage;
