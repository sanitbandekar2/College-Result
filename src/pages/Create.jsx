import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { Card } from "../components/Card";
import {
  Input,
  useToast,
  VStack,
  HStack,
  Select,
  Box,
  chakra,
  FormLabel,
  Switch,
  Button,
  FormControl,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { nanoid } from "nanoid";

export default function Create() {
  const marksModel = {
    EX0: "",
    EX1: "",
    EX2: "",
    EX3: "",
    EX4: "",
    EX5: "",
    EX6: "",
    IA0: "",
    IA1: "",
    IA2: "",
    IA3: "",
    IA4: "",
    IA5: "",
    IA6: "",
    BX1: "",
    BI1: "",
    BX2: "",
    BI2: "",
    KX1: "",
    KI1: "",
  };

  // const subcode ={
  //     QP1:"",QP2:"",QP3:"",QP4:"",QP5:"",QP6:"",QP7:"",
  // }
  const [startDate, setStartDate] = useState(new Date());
  const [datePicker, setdatePicker] = useState(false);
  const [semState, setsemState] = useState("");
  const [month, setmonth] = useState("");
  const [subjectState, setsubjectState] = useState([]);
  const [marks, setmarks] = useState(marksModel);

  const [bgSubject, setbgSubject] = useState([]);
  const [bgSubjectHolder, setBgSubjectHolder] = useState([]);
  const [elective, setElective] = useState([]);
  const [electiveHolder, setElectiveHolder] = useState([]);
  const [Semister, setSemister] = useState([]);

  const [isSelectedBg, setIsSelectedBg] = useState(false);
  const [selectElective, setSelectElective] = useState(false);

  const toast = useToast();
  let sem = "";
  function getSem(e) {
    sem = e.target.value;
    if (sem !== "") {
      setsemState(sem);
      setIsSelectedBg(false);
      setbgSubject("");
      setmarks("");
      // setsubjectState(subjects.filter(ids => ids.id === sem))
    } else {
      setIsSelectedBg(false);
      setsemState("");
      setbgSubject("");

      setSelectElective(false);
    }
  }

  let names, value;
  const InfoUpdate = (event) => {
    names = event.target.name;
    value = event.target.value;

    console.log(names + " " + value);
    setmarks({ ...marks, [names]: value });
  };

  useEffect(() => {
    axios
      .get(`http://192.168.0.109:3001/api/semister/1`)
      .then((response) => {
        setSemister(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    if (semState !== "") {
      axios
        .get(`http://192.168.0.109:3001/api/${semState}`)
        .then((response) => {
          setsubjectState(response.data.subjectsCom);
          setElective(response.data.elective);
          setbgSubject(response.data.bg);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [semState, bgSubjectHolder, electiveHolder]);

  let years = [];
  const currentYear = new Date().getFullYear();

  for (let index = 2015; index < currentYear + 1; index++) {
    years.push(month + " " + index);
  }

  function monthPicker(e) {
    setmonth(e.target.value);
  }

  function checkMonth(params) {
    if (month === "") {
      toast({
        title: "First select month of examination",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  function getBgSubList(e) {
    const bgSelectID = e.target.value;
    if (bgSelectID !== "") {
      setBgSubjectHolder(bgSubject[bgSelectID].BridgeSubject);
      setIsSelectedBg(true);
    } else {
      setIsSelectedBg(false);
    }
  }

  function getElective(e) {
    const electiveId = e.target.value;
    if (electiveId !== "") {
      setElectiveHolder(elective[electiveId].Subjects);
      setSelectElective(true);
    } else {
      setSelectElective(false);
    }
  }
  return (
    <Layout>
      <Card maxW="xl" mx="auto" mt={4}>
        <VStack>
          <chakra.form
            onSubmit={async (e) => {
              e.preventDefault();
              console.log(marks);
            }}
          >
            <VStack>
              <Select
                onChange={(e) => getSem(e)}
                required
                placeholder="Select semister"
              >
                {Semister.map((sem, i) => (
                  <option value={sem.id} key={i++}>
                    {sem.className + " " + sem.Section}
                  </option>
                ))}
              </Select>

              <HStack w="100%">
                <Select
                  onChange={(e) => monthPicker(e)}
                  required
                  placeholder="Select month of examination"
                >
                  <option value="Apr/May">Apr/May</option>
                  <option value="Nov/Dec">Nav/Dec</option>
                </Select>

                <Select
                  required
                  placeholder="Select option"
                  onClick={checkMonth}
                >
                  {years.map((y, i) => (
                    <option value="option1" key={i}>
                      {y}
                    </option>
                  ))}
                </Select>
              </HStack>

              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="date-alerts" mb="0">
                  Enable to add date ?
                </FormLabel>
                <Switch
                  id="date-alerts"
                  onChange={() => setdatePicker(!datePicker)}
                />
              </FormControl>
              {datePicker && (
                <FormControl key={nanoid()}>
                  <Box w="100%" p={2} borderWidth="1px" borderRadius="lg">
                    <DatePicker
                      required
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </Box>
                </FormControl>
              )}

              <VStack>
                {semState !== "" &&
                  subjectState.map((subjectCom, i) => (
                    <FormControl alignItems="center" key={i}>
                      <FormLabel mb="0" textTransform="uppercase" key={i}>
                        {subjectCom.subjects.SubjectName}
                      </FormLabel>
                      <HStack>
                        <Input
                          name={"EX" + i}
                          onChange={InfoUpdate}
                          type="text"
                          placeholder={subjectCom.subjects.max}
                        />
                        <Input
                          name={"IA" + i}
                          onChange={InfoUpdate}
                          type="text"
                          placeholder={subjectCom.subjects.min}
                        />
                      </HStack>
                      {subjectCom.electiveId && (
                        <Select
                          m={2}
                          textTransform="uppercase"
                          placeholder="Select"
                          onChange={(e) => getElective(e)}
                        >
                          {elective.map((elv, i) => (
                            <option key={i} value={i}>
                              {elv.Subjects.SubjectName}
                            </option>
                          ))}
                        </Select>
                      )}
                      {subjectCom.electiveId && selectElective && (
                        <FormControl alignItems="center">
                          <FormLabel mb="0" textTransform="uppercase">
                            {electiveHolder.SubjectName}
                          </FormLabel>
                          <HStack>
                            <Input
                              name={"EX"}
                              type="text"
                              placeholder={electiveHolder.max}
                            />
                            <Input
                              name={"IA"}
                              type="text"
                              placeholder={electiveHolder.min}
                            />
                          </HStack>
                        </FormControl>
                      )}
                    </FormControl>
                  ))}

                {bgSubject.length > 0 && (
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0"></FormLabel>
                    <Select
                      placeholder="Select"
                      onChange={(e) => getBgSubList(e)}
                    >
                      {bgSubject.map((bg, i) => (
                        <option key={i} value={i}>
                          {bg.BridgeSubject.bsubjectName}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                )}
                {isSelectedBg && (
                  <FormControl alignItems="center" key={nanoid()}>
                    <FormLabel mb="0" textTransform="uppercase" key={nanoid()}>
                      {bgSubjectHolder.bsubjectName}
                    </FormLabel>
                    <HStack>
                      <Input
                        name={"EX"}
                        onChange={InfoUpdate}
                        type="text"
                        placeholder={bgSubjectHolder.bmax}
                      />
                      <Input
                        name={"IA"}
                        onChange={InfoUpdate}
                        type="text"
                        placeholder={bgSubjectHolder.iaop}
                      />
                    </HStack>
                  </FormControl>
                )}
              </VStack>
            </VStack>
            <Button
              mt={2}
              w="100%"
              maxWidth={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
              colorScheme="pink"
              type="submit"
            >
              Create New
            </Button>
          </chakra.form>
        </VStack>
      </Card>
    </Layout>
  );
}
