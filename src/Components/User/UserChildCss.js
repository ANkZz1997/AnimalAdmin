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
  }

  .overview_section {
      background-color: rgb(17 22 50);
      padding: 25px;
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



`