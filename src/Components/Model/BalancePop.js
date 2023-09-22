import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import styled from "styled-components";
import URLS from "../../utils/urls";

export default function BalancePop({ show, handleClick }) {
  const chains = useSelector((state) => state?.persistReducer?.platformChains);
  const [chainId, setChainId] = useState("")
  const [balance, setBalance] = useState("")
  const [loader, setLoader] = useState(false)

  const getBalance = async(chainId)=>{
    try{
        const data = {
            chainId: chainId? chainId : chains[0].chainId
        }
        const res = await axios.post(`${URLS.EXCHANGE.ADMIN.GET_CHAIN_BALANCE}`,data)
        if(res.status ===200){
            console.log("resresbalance",res)
            setBalance(res?.data?.data?.balance)
            setLoader(false)
        }
    }catch(e){
        console.log("err", e)
    }
  }

  useEffect(()=>{
    if(show){
        setLoader(true)
        getBalance(chainId)
    }
  },[show, chainId])

  console.log("userCheck", chains);

  return (
    <Root>
      <div className={show ? "popup active" : "popup"}>
        <div
          className="background_layer"
          onClick={() => {
            handleClick(false);
          }}
        ></div>
        <div className="child_section">
          <button
            className="cls_btn"
            onClick={() => {
              handleClick(false);
              setChainId("");
              setBalance("")
            }}
          >
            <AiOutlineCloseCircle />
          </button>

          <h2>Check Balance Of Below Present Chains...</h2>
          <div className="balance_box">
            <select onChange={(e)=>{setChainId(e.target.value)}}>
              {chains &&
                chains?.map((i) => {
                  return <option value={i.chainId}>{i.name}</option>;
                })}
            </select>
            <div className="amount_show">
                {loader? "Loading....": `${balance} Eth`}
            
            </div>
          </div>
        </div>
      </div>
    </Root>
  );
}

const Root = styled.section`
  color: whitesmoke;
  .popup {
    .background_layer {
      backdrop-filter: blur(3px);
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0px;
      top: 0px;
      z-index: 999;
      display: none;
    }
    .child_section {
      background: #070c27;
      width: 50%;
      min-width: 300px;
      justify-content: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: fit-content;
      position: fixed;
      top: -300px;
      left: 50%;
      transform: translateX(-50%);
      transition: all 1s;
      z-index: 9999;
      padding: 10px;
      text-align: center;
      border-radius: 20px;
      box-shadow: 0px 0px 10px -2px #fff;
      overflow: hidden;

      .balance_box {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid;
        width: fit-content;
        font-size: 17px;

        select{
            border: none;
            outline: none;
            color: white;
            background-color: transparent;
            padding: 5px;
            border-right: 1px solid;
        }
        .amount_show{
            padding: 5px;
            width: 150px;
        }
      }

      .cls_btn {
        position: absolute;
        right: 0;
        top: 0;
        background-color: transparent;
        height: 40px;
        width: 40px;
        border: transparent;
        svg {
          color: white;
          font-size: 30px;
        }
      }

      .btns2 {
        height: 30px;
        width: 50px;
        margin: 3px;
      }
    }
    &.active {
      .background_layer {
        display: unset;
      }
      .child_section {
        top: 30px;
      }
    }
  }
`;
