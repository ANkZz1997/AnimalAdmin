import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styled from "styled-components";
import URLS, { EXCHANGE_URL } from "../../../utils/urls";
import LoaderCSS from "../../Loader";
import moment from "moment";
import cogoToast from "cogo-toast";

export default function CreateAdmin({ clsBtn , updateApi }) {
  const [allRoles, setAllRoles] = useState("");
  const [err, setErr] = useState(false);
  const [loader, setLoader] = useState(true);
  const [roleName, setRoleName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    password: "",
    role: "",
  });

  const getRoles = async () => {
    try {
      const res = await axios.get(`${URLS.EXCHANGE.ADMIN.GET_ROLES}`);
      console.log("resresres", res.data?.data);
      setAllRoles(res.data?.data?.reverse());
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  const postUserWithRoles = async () => {
    if(newUser.password.length<8 || newUser.password.length>16){
      cogoToast.warn("Confirm password does not match")
    }
    if(newUser.password !== confirmPass){
      cogoToast.warn("Confirm password does not match")
    }
    if(!newUser.role){
      cogoToast.warn("Please select a role")
    }
    if(newUser.username.length<4 || newUser.username.length>16){
      cogoToast.warn("Username Should be between 4 to 16 Character")
    }
    if(newUser.name.length<4 || newUser.name.length>16){
      cogoToast.warn("Name Should be between 4 to 16 Character")
    }

    try{
      const res = await axios.post(`${URLS.EXCHANGE.ADMIN.CREATE_USER_ASSIGN_CODE}`,newUser)
      if(res.status===200){
        cogoToast.success("Admin User Created")
        updateApi(true)
        clsBtn(false);
        setRoleName("");
        setConfirmPass("");
        setNewUser({
          name: "",
          username: "",
          password: "",
          role: "",
        });
      }

    }catch(err){
      console.log("err",err)
    }
  };

  const handleClick = (id, name) => {
    setNewUser({ ...newUser, role: id });
    setRoleName(name);
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <Root>
      <h2>Create New Admin Account And Assign Role To It</h2>
      <button
        className="cls_btn"
        onClick={() => {
          clsBtn(false);
          setRoleName("");
          setConfirmPass("");
          setNewUser({
            name: "",
            username: "",
            password: "",
            role: "",
          });
        }}
      >
        <AiOutlineCloseCircle />
      </button>
      <div className="create_admin_body">
        <div className="body_child1">
          <div>
            <h3>Name</h3>
            <input
              value={newUser.name}
              onChange={(e) => {
                setNewUser({ ...newUser, name: e.target.value });
              }}
            />
          </div>
            <p className={newUser.name.length===0 || newUser.name.length>4 && newUser.name.length<16?"err":"err on"}>Length must be between 4 to 16 character</p>
          <div>
            <h3>Username</h3>
            <input
              value={newUser.username}
              onChange={(e) => {
                setNewUser({ ...newUser, username: e.target.value });
              }}
            />
          </div>
            <p className={newUser.username.length===0 || newUser.username.length>4 && newUser.username.length<16?"err":"err on"}>Length must be between 4 to 16 character</p>

          <div>
            <h3>Password</h3>
            <input
              value={newUser.password}
              onChange={(e) => {
                setNewUser({ ...newUser, password: e.target.value });
              }}
            />
          </div>
          <p className={newUser.password.length===0 || newUser.password.length>8 && newUser.password.length<16?"err":"err on"}>Length must be between 8 to 16 character</p>

          <div>
            <h3>Confirm Password</h3>
            <input
              value={confirmPass}
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
            />
          </div>
          <p className={confirmPass === newUser.password?"err":"err on"}>Password is not matching</p>

        </div>
        <div className="body_child2">
          <h3>Assigning Role - {roleName ? roleName : "Select Below Roles"}</h3>
          <button
            onClick={() => {
              postUserWithRoles();
            }}
          >
            Create New Admin User
          </button>
        </div>
      </div>

      <h3>All Active Roles</h3>
      <div className="child">
        {loader ? (
          <LoaderCSS />
        ) : (
          <table>
            <thead className="head_table">
              <tr>
                <th>S.No</th>
                <th>Role Name</th>
                <th>Role Code</th>
                <th>Created On</th>
                <th>Updated On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allRoles?.map((i, ix) => {
                return (
                  <tr key={ix}>
                    <td data-label="S.No">{ix + 1}</td>
                    <td data-label="Role">{i?.name}</td>
                    <td data-label="Code">{i?.code}</td>
                    <td data-label="Created On">{`${moment(i?.createdAt).format(
                      "DD-MMM-YY"
                    )}`}</td>
                    <td data-label="Updated On">{`${moment(i?.updatedAt).format(
                      "DD-MMM-YY"
                    )}`}</td>
                    <td
                      onClick={() => {
                        handleClick(i?.id, i?.name);
                      }}
                      className={
                        newUser.role === i.id ? "btn_td clicked" : "btn_td"
                      }
                    >
                      Click To Select
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </Root>
  );
}

const Root = styled.section`
  background: #060d31;
  height: 80%;
  margin: auto;
  min-width: 80%;
  /* width: 100%; */
  position: relative;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;

  input {
    border: 1px solid white;
    background-color: transparent;
    color: white;
  }
  .cls_btn {
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
    margin: 0px !important;
    padding: 0px !important;
    svg {
      font-size: 30px;
    }
  }

  .create_admin_body {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;

    .body_child1 {
      flex: 1;
      display: flex;
      gap: 10px;
      flex-direction: column;
      .err{
        margin:0;
        color: red;
        display:none;
      }
      .on{
        display: block;
      }

      > div {
        display: flex;
        gap: 20px;
        h3 {
          max-width: 200px;
          width: 100%;
        }
      }
    }
    .body_child2 {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      button {
        margin: 0;
        padding: 10px;
      }
    }
  }

  .child {
    overflow: scroll;
    table {
      /* margin-top: 10px; */
      width: 100%;
      text-align: left;
      border: 1px solid;
      border-collapse: collapse;

      tr,
      thead,
      td,
      th {
        border: 1px solid;
      }

      td,
      th {
        padding: 5px;
      }

      thead.head_table {
        position: sticky;
        top: 0px;
        background: #060d31;
        box-shadow: 0px 0px 1px 1px white;
      }

      @media (max-width: 600px) {
        border: hidden;
        td,
        th {
          border: 1px solid #ccc;
          padding: 0.625em;
          text-align: right;
        }
        thead.head_table {
          border: none;
          clip: rect(0 0 0 0);
          height: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          position: absolute;
          width: 1px;
          text-align: right;
        }
        tr {
          border-bottom: 2px solid #ddd;
          display: block;
          margin-bottom: 0.8em;
        }
        td {
          border-bottom: 1px solid #ddd;
          display: block;
        }

        td::before {
          content: attr(data-label);
          float: left;
          font-weight: bold;
          text-transform: uppercase;
          display: flex;
          align-items: center;
        }
        td:last-child {
          border-bottom: 0;
        }
      }
    }

    .btn_td {
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: green;
      }
    }
    .clicked {
      background-color: green;
    }
  }
`;
