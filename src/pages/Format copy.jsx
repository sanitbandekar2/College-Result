import logo from "./log.png";
import "../App.css";
import { nanoid } from "nanoid";
import React, { useState } from "react";

export default function Format({ data }) {
  let result = data.result;
  let userData = data.userData;
  let subject = data.subject;
  let newsub = data.newSubjectList;
  let bg = [data.bgSubjectHolder];
  console.log(newsub);

  let slNo = 1,
    lastRow;
  let maxSum = [];
  let max25 = [];
  let maxTotalSum = [];
  let minTotalSum = [];
  let marksObtained = [];
  let bxTotal = [];

  const {
    EX1,
    EX2,
    EX3,
    EX4,
    EX5,
    EX6,
    EX7,
    IA1,
    IA2,
    IA3,
    IA4,
    IA5,
    IA6,
    IA7,
    BX1,
    BI1,
    BX2,
    BI2,
    BX3,
    BI3,
  } = data.result;

  let EX = [EX1, EX2, EX3, EX4, EX5, EX6, EX7];
  let IA = [IA1, IA2, IA3, IA4, IA5, IA6, IA7];
  let BX = [BX1, BX2, BX3];
  let BI = [BI1, BI2, BI3];

  function remove(array) {
    const params = ["AB", "", "*", "--"];
    let AB = array.filter((s) => s !== params[0]);
    let empty = AB.filter((s) => s !== params[1]);
    let star = empty.filter((s) => s !== params[2]);
    let dash = star.filter((s) => s !== params[3]);
    return dash.map((i) => Number(i));
  }
  function plus(total, num) {
    return total + num;
  }

  function sum(array) {
    if (
      typeof array != "undefined" &&
      array != null &&
      array.length != null &&
      array.length > 0
    ) {
      let removed = remove(array);
      return removed.reduce(plus);
    }
  }

  return (
    <div className="main-holder" id="main-holder">
      <div className="main-header">
        <div>
          <div className="squareNone"></div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "center",
            }}
          >
            <p style={{ paddingRight: "10px" }}>ಕನಾ೯ಟಕ </p>
            <img src={logo} alt="Logo" width="50px" />
            <p style={{ paddingLeft: "10px" }}> ಸಕಾ೯ರ</p>
          </div>
          <p>
            GOVERNMENT OF KARNATAKA
            <br />
          </p>
          <p>ತಾಂತ್ರಿಕ ಶಿಕ್ಷಣ ಇಲಾಖೆ, ಬೆಂಗಳೂರು</p>
          <p>DEPARTMENT OF TECHNICAL EDUCATION, BENGALURU</p>
          <p>ತಾಂತ್ರಿಕ ಪರೀಕ್ಷಾ ಮಂಡಳಿ</p>
          <p>
            SEMISTER MARKS
            <br />
            <b>FIRST</b> SEMISTER EXAMINATIONS <b>2020</b>
          </p>
        </div>
        <div className="square">
          <br />
          Photo
          <br />
          Attested
          <br />
          By
          <br />
          Principal
        </div>
      </div>

      <div className="basicData">
        <div className="basicDataLeft">
          <table>
            <tbody>
              <tr>
                <td>Programme</td>
                <td>
                  : <b>Computer</b>
                </td>
              </tr>
              <tr>
                <td>Name of Candidate</td>
                <td>
                  : <b>{result.StudentName}</b>
                </td>
              </tr>
              <tr>
                <td>Father's Name</td>
                <td>
                  : <b>{userData.fatherName}</b>
                </td>
              </tr>
              <tr>
                <td>Mother's Name</td>
                <td>
                  : <b>{userData.motherName}</b>
                </td>
              </tr>
              <tr>
                <td>Name of Institution</td>
                <td>
                  : <b></b>
                </td>
              </tr>
              <tr>
                <td>Date Of Result</td>
                <td>
                  : <b>ABCD</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="basicDataRight">
          <table className="dateEndreg">
            <tbody>
              <tr>
                <td style={{ textAlign: "right", textTransform: "uppercase" }}>
                  register no : <b> {userData.regno}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <table className="marks-table">
        <tbody>
          <tr>
            <th rowSpan="2">
              Sl.
              <br />
              NO
            </th>
            <th rowSpan="2" colSpan="2">
              QP Code & <br />
              COURSE TITLES
            </th>

            <th colSpan="3">Semister End Examination(SEE)</th>

            <th colSpan="2" style={{ fontSize: "9px" }}>
              Contineous Internal Evaluation(CIE)
            </th>

            <th colSpan="3">Total Marks</th>
            <th rowSpan="2">
              Course result
              <br />
              <small>(9)</small>
            </th>
          </tr>
          <tr>
            <td>
              Max.
              <br />
              Marks
              <br />
              (1)
            </td>
            <td>
              Min.
              <br />
              Marks
              <br />
              (2)
            </td>
            <td>
              Marks.
              <br />
              Obtained
              <br />
              (3)
            </td>
            <td>
              Max.
              <br />
              Marks
              <br />
              (4)
            </td>
            <td>
              Marks.
              <br />
              Obtained
              <br />
              (5)
            </td>
            <td>
              Max.
              <br />
              Marks
              <br />
              (6)
            </td>
            <td>
              Min.
              <br />
              Marks
              <br />
              (7)
            </td>
            <td>
              Marks.
              <br />
              Obtained
              <br />
              (8)
            </td>
          </tr>

          {subject.length > 0 &&
            subject.map((sub, i) => (
              <tr key={i}>
                <td style={{ height: "20px" }}>{(lastRow = slNo++)}</td>
                <td>{sub.subjects.SubjectCode}</td>
                <td
                  width="350px"
                  style={{ textTransform: "uppercase", textAlign: "left" }}
                >
                  {sub.subjects.SubjectName}
                </td>
                <td>
                  {EX[i] !== "" &&
                    (sub.subjects.max
                      ? Array.isArray(maxSum.push(sub.subjects.max))
                      : "",
                    sub.subjects.max)}
                </td>
                <td>{EX[i] !== "" && sub.subjects.min}</td>
                <td>{EX[i]}</td>
                <td>
                  {EX[i] !== "" &&
                    (sub.subjects.max25
                      ? Array.isArray(max25.push(sub.subjects.max25))
                      : "",
                    sub.subjects.max25)}
                </td>
                <td>{EX[i] !== "" && IA[i]}</td>
                <td>
                  {EX[i] !== "" &&
                    (sub.subjects.maxtotal
                      ? Array.isArray(maxTotalSum.push(sub.subjects.maxtotal))
                      : "",
                    sub.subjects.maxtotal)}
                </td>
                <td>
                  {EX[i] !== "" &&
                    (sub.subjects.mintotal
                      ? Array.isArray(minTotalSum.push(sub.subjects.mintotal))
                      : "",
                    sub.subjects.mintotal)}
                </td>
                <td>
                  {
                    (Number(EX[i]) + Number(IA[i])
                      ? Array.isArray(
                          marksObtained.push(Number(EX[i]) + Number(IA[i]))
                        )
                      : "",
                    EX[i] !== "" && Number(EX[i]) + Number(IA[i]))
                  }
                </td>
                <td>
                  {EX[i] !== "" &&
                    (Number(EX[i]) + Number(IA[i]) >= sub.subjects.mintotal
                      ? "P"
                      : "F")}
                </td>
              </tr>
            ))}

          {lastRow <= 6 && (
            <tr>
              <td style={{ height: "100px" }}> 6</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
          {lastRow <= 7 && (
            <tr>
              <td style={{ height: "60px" }}>7</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
          {lastRow >= 8 && (
            <tr>
              <td style={{ height: "50px" }}>8</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}

          <tr>
            <td colSpan="3">
              <b>GRAND TOTAL</b>
            </td>
            <td>{EX.length > 0 ? sum(maxSum) : ""}</td>
            <td></td>
            <td>{EX.length > 0 ? sum(EX) : ""}</td>
            <td>{EX.length > 0 ? sum(max25) : ""}</td>
            <td>{EX.length > 0 ? sum(IA) : ""}</td>
            <td>{EX.length > 0 ? sum(maxTotalSum) : ""}</td>
            <td>{EX.length > 0 ? sum(minTotalSum) : ""}</td>
            <td>{EX.length > 0 ? sum(marksObtained) : ""}</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="12" className="txtupper subject">
              <p className="left">
                TOTAL IN WORD :<b> </b>
              </p>
            </td>
          </tr>
          <tr>
            <td colSpan="12" className="txtupper subject">
              <p className="left">
                Result :<b> </b>
              </p>
            </td>
          </tr>
          <tr>
            <td colSpan="12">
              <p className="center"></p>
              <p>
                BRIDGE COURSES(For Lateral entry Student only)& KANNADA
                COURSE(For all students)
              </p>
            </td>
          </tr>
          <tr>
            <td className="line">
              SL.
              <br />
              NO
            </td>
            <td className="line" colSpan="2">
              QP Code & COURSE TITLES
            </td>
            <td>(1)</td>
            <td>(2)</td>
            <td>(3)</td>
            <td>(4)</td>
            <td>(5)</td>
            <td>(6)</td>
            <td>(7)</td>
            <td>(8)</td>
            <td>(9)</td>
          </tr>
          {Array.isArray(bg) &&
            bg.map((bgs, i) => (
              <tr>
                <td></td>
                <td>{bgs.bsubjectCode}</td>
                <td>{bgs.bsubjectName}</td>
                <td>{bgs.bmax}</td>
                <td>{bgs.bmin}</td>
                <td>{BX[2]}</td>
                <td>{bgs.iaop}</td>
                <td>{BI[2]}</td>
                <td>{bgs.bmaxtotal}</td>
                <td>{bgs.bmintotal}</td>
                <td>
                  {
                    (Array.isArray(BX)
                      ? (BX[2] !== "--" && bxTotal.push(BI[2])) ||
                        (BI[2] !== "--" && bxTotal.push(BX[2]))
                      : "",
                    sum(bxTotal))
                  }
                </td>
                <td>{sum(bxTotal) >= bgs.bmintotal ? "P" : "F"}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <table className="note">
        <tr>
          <td>
            <b>Note :</b>
          </td>
          <td className="subject">
            1. No minimum marks prescribed for CIE except for Kannada course for
            which it is 20 marks.
          </td>
        </tr>
        <tr>
          <td></td>
          <td className="subject">
            2. Bridge and Kannada course are considered as eligibility criteria
            only for the award of diploma and not for promotion to the higher
            semester and &#160; &#160; for className declaration.
          </td>
        </tr>
        <tr>
          <td></td>
          <td className="subject">
            3. Any discrepancy in entry of marks, corrections of names, results
            etc., must be pointed out by the Candidate and get corrected within
            30 days.
          </td>
        </tr>
        <tr>
          <td></td>
          <td className="subject">
            4. Awarding of className in Diploma is based on First attempt total
            marks of Fifth and Sixth semester.
            <br />
            &#160; &#160;(below 60% Second className, above 60% First className
            and above 75% First className with Distinction)
          </td>
        </tr>
      </table>

      <table className="tbl-sing">
        <tr>
          <td className="left">
            Signature of the candidate
            <br />
          </td>
          <td className="center">Signature of HOD</td>
          <td className="right">
            Signature of Principal &#160;&#160;&#160;
            <br />
            With seal of the Institution
          </td>
        </tr>
      </table>
    </div>
  );
}
