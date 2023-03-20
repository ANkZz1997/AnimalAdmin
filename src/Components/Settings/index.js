import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function index() {
  return (
    <Root>
    <div><h1>App Settings Page</h1></div>
    <table>
        <tbody>
            <tr>
                <td>
                <Link to={"/appsettings/bannersettings"}>
                    <h4>Banner Settings in Mobile Application {">"}</h4>
                </Link>
                </td>
            </tr>
            <tr>
                <td>
                <Link to={"/appsettings/platformcharge"}>
                    <h4>Set the Platform fees per transaction {">"}</h4>
                </Link>
                </td>
            </tr> <tr>
                <td><h4>Settings 3 {">"}</h4></td>
            </tr> <tr>
                <td><h4>Settings 4{">"}</h4></td>
            </tr> <tr>
                <td><h4>Settings 5 {">"}</h4></td>
            </tr> <tr>
                <td><h4>Settings 6{">"}</h4></td>
            </tr>
        </tbody>
    </table>
    </Root>
  )
}

const Root = styled.section`
color: whitesmoke;

table{
    margin-top: 20px;
    padding: 30px;
    width: 100%;

    td{
        padding: 5px;
        cursor: pointer;
        border-radius: 5px;
        :hover{
            background-color: grey;
        }
        a{
            width: 100%;
            color: whitesmoke;
        }
    }

}
`
