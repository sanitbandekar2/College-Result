import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Card } from "../components/Card";
import Format from "./Format";
import {
  useToast,
  VStack,
  Select,
  chakra,
  FormLabel,
  Button,
  FormControl,
} from "@chakra-ui/react";
import axios from "axios";

export default function Print() {
  function printDoc(params) {
    window.print();
  }

  const [result, setResult] = useState([]);
  const [subject, setSubject] = useState([]);

  const userData = JSON.parse(localStorage.getItem("user"));
  const { id, sem } = useParams();

  const [bgSubject, setbgSubject] = useState([]);
  const [bgSubjectHolder, setBgSubjectHolder] = useState([]);
  const [elective, setElective] = useState([]);
  const [electiveHolder, setElectiveHolder] = useState([]);
  const [selectElective, setSelectElective] = useState(false);
  const [newSubjectList, setNewSubjectList] = useState([]);

  const newSubject = [];
  let subId = 0;

  const toast = useToast();

  useEffect(() => {
    axios
      .get(`http://192.168.43.49:3001/api/result/${id}/${sem}`)
      .then((res) => {
        setResult(res.data.result[0]);
        setSubject(res.data.subject);
        setElective(res.data.elective);
        setbgSubject(res.data.bg);
      })
      .catch((e) => {
        toast({
          description: e,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.log(e);
      });
  }, [id, sem]);

  useEffect(() => {}, [electiveHolder, bgSubjectHolder]);

  function getBgSubList(e) {
    const bgSelectID = e.target.value;
    if (bgSelectID !== "") {
      setBgSubjectHolder(bgSubject[bgSelectID].BridgeSubject);
    } else {
      setElectiveHolder([]);
    }
  }

  function getElective(e) {
    const electiveId = e.target.value;
    if (electiveId !== "") {
      setElectiveHolder(elective[electiveId].Subjects);
      setSelectElective(true);
    } else {
      setElectiveHolder([]);
      setSelectElective(false);
    }
  }
  const data = { userData, result, subject, bgSubjectHolder, newSubjectList };
  return (
    <div>
      <div className="printBtn">
        <Layout>
          <Card maxW="xl" mx="auto" mt={4}>
            <VStack>
              <chakra.form
                onSubmit={async (e) => {
                  e.preventDefault();
                  // const data = { userData, result, subject };
                  {
                    subject.map(
                      (subjectCom, i) => (
                        newSubject.push(subjectCom.subjects),
                        subjectCom.electiveId
                          ? newSubject.push(electiveHolder)
                          : ""
                      )
                    );
                  }
                  setNewSubjectList(newSubject);
                }}
              >
                <VStack>
                  {Array.isArray(subject) &&
                    subject.map((subjectCom, i) => (
                      <FormControl alignItems="center" key={i}>
                        <FormLabel mb="0" textTransform="uppercase" key={i}>
                          {subjectCom.subjects.SubjectName}
                        </FormLabel>
                        {subjectCom.electiveId && (
                          <Select
                            m={2}
                            textTransform="uppercase"
                            placeholder="Select"
                            onChange={(e) => {
                              getElective(e);
                            }}
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
                </VStack>
                <Button
                  mt={2}
                  w="100%"
                  maxWidth={{
                    base: "90vw",
                    sm: "80vw",
                    lg: "50vw",
                    xl: "40vw",
                  }}
                  colorScheme="pink"
                  type="submit"
                >
                  Create New
                </Button>
              </chakra.form>
            </VStack>
          </Card>
        </Layout>
        <Button
          onClick={printDoc}
          mt={2}
          w="100%"
          colorScheme="pink"
          type="submit"
        >
          Print this out!
        </Button>
      </div>
      <Format data={data} />
    </div>
  );
}
