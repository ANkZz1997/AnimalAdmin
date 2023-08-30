import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styled from "styled-components";
import URLS from "../../../utils/urls";
import ConfirmDialogue from "../../Model/ConfirmDialogue";
import cogoToast from "cogo-toast";

export default function AccessActions({ currentRole, userId ,updateApi, toClose }) {
  const [activeTab, setActiveTab] = useState("change_role");
  const [rolesData, setRolesData] = useState("");
  const [actualRole, setActualRole] = useState("");
  const [confirmBox, setConfirmBox] = useState(false)
  const [changeTo, setChangeTo] = useState("")
  const [newData,setNewData] = useState({
    userid: "",
    role: ""
  })

  const getRoleApi = async () => {
    try {
      const res = await axios.get(`${URLS.EXCHANGE.ADMIN.GET_ROLES}`);
      console.log("resres", res);
      setRolesData(res?.data?.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  const changeRoleApi = async ()=>{
    try{
        const res = await axios.post(`${URLS.EXCHANGE.ADMIN.CHANGE_USER_ROLES}`,newData)
        console.log("res.status", res)
        if(res?.status===200){
            cogoToast.success("Role Changed Successfully")
            toClose(false);
            setConfirmBox(false)
            updateApi(true)
            setActiveTab("change_role");
        }

    }catch(err){
        console.log("err",err)
    }
  }

  useEffect(() => {
    setActualRole(currentRole)
    getRoleApi();
    setNewData({...newData, userid: userId})
  }, [currentRole, userId]);

  console.log("newData",newData)
  return (
    <Root>
      <button
        className="cls_btn"
        onClick={() => {
          toClose(false);
          setActiveTab("change_role");
        }}
      >
        <AiOutlineCloseCircle />
      </button>

      <div className="act_tabs">
        <button
          onClick={() => {
            setActiveTab("change_role");
          }}
          className={activeTab === "change_role" ? "act_btn On" : "act_btn"}
        >
          Change Assigned Role
        </button>
        <button
          onClick={() => {
            setActiveTab("change_pass");
          }}
          className={activeTab === "change_pass" ? "act_btn On" : "act_btn"}
        >
          Change Admin Password
        </button>
      </div>

      <div className="act_body">
        {activeTab == "change_role"
          ? rolesData &&
            rolesData?.map((i, ix) => {
              return (
                <div className="roles_list" key={ix}>
                  <div>{i.name}</div>
                  <div>{i.code}</div>
                  <button
                    onClick={()=>{setConfirmBox(true);setChangeTo(i?.name); setNewData({...newData, role:i.id})}}
                    className={
                      actualRole === i.code
                        ? "change_act_btn match"
                        : "change_act_btn"
                    }
                  >
                    Assign
                  </button>
                </div>
              );
            })
          : "Change Password"}
      </div>
      <ConfirmDialogue  show={confirmBox} handleClick={(e)=>{setConfirmBox(e)}}>
             <h1>Confirm Change Role To {changeTo} </h1>
             <p>Do you really want to change rol?</p>
             <button className='btns2' onClick={()=>{changeRoleApi()} }>Yes</button> 
             <button className='btns2' onClick={()=>{setConfirmBox(false)}}>No</button>
        </ConfirmDialogue>
    </Root>
  );
}

const Root = styled.section`
  background: #060d31;
  margin: auto;
  position: relative;
  border: 1px solid;
  /* border-radius: 20px; */
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  min-height: 60%;
  min-width: 60%;
  max-height: 90%;
  max-width: 90%;
  *::-webkit-scrollbar {
    display: none;
  }

  .act_tabs {
    display: flex;
    gap: 10px;
    .act_btn {
      padding: 5px;
      cursor: pointer;
    }
    .On {
      border-bottom: 3px solid green;
    }
  }
  .cls_btn {
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 0px;
    margin: 0px;
    padding: 0px;
    background-color: transparent;
    border: none;
    color: white;
    svg {
      font-size: 25px;
    }
  }

  .act_body {
    padding: 10px;
    overflow: scroll;

    .roles_list {
      display: flex;
      padding: 2px;
      > div {
        flex: 1;
        padding: 5px;
        border: 1px solid;
      }
      > .change_act_btn {
        flex: 1;
        padding: 5px;
        border: 1px solid;
      }
      .match {
        background-color: #3a813a;
      }
    }
  }
`;
