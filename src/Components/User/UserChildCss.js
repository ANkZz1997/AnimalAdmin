import styled from "styled-components";

export const UserChildCss = styled.section`

color: whitesmoke;
  * {
    margin: 0;
    padding: 0;
  }
  h2 {
        text-align: center;
      }
  .loader_parent {
    height: 100%;
  }

  .overview {
    border-radius: 10px;
    margin-top: 20px;
    background-color: rgb(17 22 50);

    .table_title {
      margin-top: 10px;
      height: 50px;
      display: flex;
      align-items: center;
      font-size: 25px;
      font-weight: 500;
      padding: 10px;
      padding-left: 30px;
      color: whitesmoke;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3{
        button{
          font-size: 12px;
          margin-left: 5px;
          padding: 3px;
        }
      }
  }

  .activity_filter{
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 10px;

    .select_type{
      background-color: #070c27;
      color: white;
      height: 30px;
    }
    button{
      height: 30px;
    }

  }

  .overview_section {
      background-color: rgb(17 22 50);
      padding: 5px 25px 25px 25px;
      h2 {
        text-align: center;
      }

      table {
        width: 100%;
        padding: 10px;
        text-align: left;
        border-collapse: collapse;
        margin-bottom: 10px;
        h4{
          text-transform: capitalize;
        }
        /* .nft_cell {
          display: flex;
          align-items: center;
          gap: 5px;
          width: fit-content;
          cursor: pointer;
          width: 100%;
        }
        img {
          height: 30px;
          width: 30px;
        } */
        thead{
          border: 1px solid;
          th{
            font-size: 18px;
            padding: 5px;
            color: rgb(140, 124, 240);
            border: 1px solid;
          }
        }
        tbody{
          tr{
            border: 1px solid;
      
            td{
              padding: 5px;
              border: 1px solid;
            }
          }
        }

        @media (max-width: 575px) {
          td,
          th {
            border: 1px solid #ccc;
            padding: 0.625em;
            text-align: right;
          }
          thead {
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
            font-weight: 400;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            text-align: left;
          }
        }
      }
    }
  }

  .date_range {
    display: flex;
    transition: all 1s;
    align-items: center;

    button {
      padding: 3px;
      border-radius: 5px;
      /* background-color: whitesmoke; */
      cursor: pointer;

    }
    .date_popup_active {
      position: fixed;
      top: 0px;
      right: 0;
      z-index: 9999;
      backdrop-filter: blur(4px);
      color: black;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 1s;

      .date_main_div {
        position: relative;

        .sav_btn{
          position: absolute;
          bottom: 0;
          margin-bottom: -34px;
          right: 0;
          border: none;
          cursor: pointer;
          padding: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .cncl_btn{
          position: absolute;
          right: 0;
          margin-top: -30px;
          margin-right: -10px;
          border-radius: 50%;
          height: fit-content;
          padding: 0px;
          background: transparent;
          color: white;
          border: none;
          :hover{
            color: #9b5050fc;
          }
          svg{
            font-size: 30px;
          }
        }
      }
    }
    .date_popup_notactive {
      content-visibility: hidden;
    }
  }



`