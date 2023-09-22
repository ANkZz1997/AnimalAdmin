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
  const [confirmBox, setConfirmBox] = useState(false);
  const [changeTo, setChangeTo] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
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

  const changePassApi = async()=>{
    const data = {
      userid: userId,
      password: pass
    }
    try{
      const res = await axios.post(`${URLS.EXCHANGE.ADMIN.CHANGE_ADMIN_USER_PASSWORD}`,data)
      console.log("reschangepass",res)
      if(res.status===200){
        cogoToast.success("Password Changed")
        toClose(false);
        setPass("");
        setConfirmPass("")
      }

    }catch(err){
      console.log("err",err)
    }
  }

  const handleClick = ()=>{
    if(pass === confirmPass && pass.length>8 && pass.length<16){
      changePassApi();
    }else{
      cogoToast.error("Confirm Password Is Not Matching")
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
          : <div className="change_pass_div">
              <h2>Proceed To Change Password</h2>
              <input value={pass} onChange={(e)=>{setPass(e.target.value)}} placeholder="New Password"/>
              {pass.length!==0 && pass.length <8 || pass.length>16?
              <p>Length must be between 8 to 16 character </p>:""
              
            }
              <input value={confirmPass} onChange={(e)=>{setConfirmPass(e.target.value)}}  placeholder="Confirm Password" type="password"/>
              {pass !== confirmPass || pass.length<8?
              <p>Confirm Password Should Match</p>:""}
              <button onClick={()=>{handleClick()}}>Change Password</button>
            
            </div>}
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
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .roles_list {
      display: flex;
      padding: 2px;
      width: 100%;
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

    .change_pass_div{
      min-width: 50%;
      display: flex;
      flex-direction: column;
      gap: 10px;
      input{
        background-color: transparent;
        color: white;
        /* border: none; */
        padding: 4px;
      }
      p{
        margin: 0;
        color: red;
      }
      button{
        padding: 4px;
        cursor: pointer;
      }
    }
  }
`;
