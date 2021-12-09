import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  Select,
  FormLabel,
  Input,
  Heading,
  Stack,
  chakra,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";

export default function HomePage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [userData, setuserData] = useState(
    () =>
      JSON.parse(localStorage.getItem("user")) || {
        regno: "",
        studentName: "",
        fatherName: "",
        motherName: "",
        department: "",
        isLogin: false,
      }
  );
  let names, value;
  const InfoUpdate = (event) => {
    names = event.target.name;
    value = event.target.value;

    setuserData({ ...userData, [names]: value });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userData));
  }, [userData]);

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Enter Basic Details
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            if (
              !userData.regno ||
              !userData.fatherName ||
              !userData.motherName ||
              !userData.department
            ) {
              toast({
                description: "Credentials not valid",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            } else {
              navigate("/Dashboard");
            }
            console.log(userData);
          }}
          onReset={async (e) => {
            e.preventDefault();
            if (useState != null) {
              setuserData({
                regno: "",
                studentName: "",
                fatherName: "",
                motherName: "",
                department: "",
                isLogin: false,
              });
            }
          }}
        >
          <Stack spacing="6">
            <FormControl>
              <FormLabel>Register No.</FormLabel>
              <Input
                textTransform="uppercase"
                name="regno"
                type="text"
                autoComplete="regno"
                required
                value={userData.regno}
                onChange={InfoUpdate}
              />
            </FormControl>
            <FormControl id="studentName">
              <FormLabel>Student Name</FormLabel>
              <Input
                textTransform="uppercase"
                name="studentName"
                type="text"
                autoComplete="studentName"
                required
                value={userData.studentName}
                onChange={InfoUpdate}
              />
            </FormControl>
            <FormControl id="fatherName">
              <FormLabel>Father Name</FormLabel>
              <Input
                textTransform="uppercase"
                name="fatherName"
                type="text"
                autoComplete="fatherName"
                required
                value={userData.fatherName}
                onChange={InfoUpdate}
              />
            </FormControl>
            <FormControl id="motherName">
              <FormLabel>Mother Name</FormLabel>
              <Input
                textTransform="uppercase"
                name="motherName"
                type="text"
                autoComplete="motherName"
                required
                value={userData.motherName}
                onChange={InfoUpdate}
              />
            </FormControl>
            <FormControl id="department">
              <FormLabel>Department</FormLabel>
              <Select
                textTransform="uppercase"
                value={userData.department}
                name="department"
                placeholder="Select Department"
                required
                onChange={InfoUpdate}
              >
                <option value="option1">Option 1</option>
              </Select>
            </FormControl>
            <Button type="submit" colorScheme="primary" size="lg" fontSize="md">
              Submit
            </Button>
            <Button
              type="reset"
              variant="outline"
              colorScheme="pink"
              size="lg"
              fontSize="md"
            >
              Reset
            </Button>
          </Stack>
        </chakra.form>
      </Card>
    </Layout>
  );
}
