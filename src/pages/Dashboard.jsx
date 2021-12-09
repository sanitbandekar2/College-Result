import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  Heading,
  Spacer,
  Button,
  Center,
  IconButton,
  VStack,
  HStack,
  Text,
  StackDivider,
} from "@chakra-ui/react";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  function craeteNewPage() {
    navigate("/create");
  }

  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`http://192.168.43.49:3001/api/resultList/${user.regno}`)
      .then((res) => {
        console.log(res.data);
        setList(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user.regno]);

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Dashboard
      </Heading>
      <Center>
        <VStack p={4} w="100%">
          <VStack
            divider={<StackDivider />}
            borderColor="gray.100"
            borderWidth="2px"
            p="4"
            borderRadius="lg"
            width="100%"
            maxWidth={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
            alignItems="stretch"
          >
            {Array.isArray(list) &&
              list.map((result, i) => (
                <HStack key={i}>
                  <Text>
                    {result.ExamYear} semester {result.Sem}
                  </Text>
                  <Spacer />
                  <IconButton
                    icon={<FaDownload />}
                    onClick={() => {
                      navigate(`/Print/${result.id}/${result.Sem}`);
                    }}
                    aria-label="toggle-dark-mode"
                  />
                </HStack>
              ))}
          </VStack>
          <Button
            onClick={craeteNewPage}
            w="100%"
            maxWidth={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
            colorScheme="pink"
            type="submit"
          >
            Create New
          </Button>
        </VStack>
      </Center>
    </Layout>
  );
}
