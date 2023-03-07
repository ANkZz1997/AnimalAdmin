import React from 'react'
import styled from 'styled-components'

export default function index() {
  return (
    <Root>
    <div><h1>App Settings Page</h1></div>
    <table>
        <tbody>
            <tr>
                <td><h4>Banner Settings in Mobile Application {">"}</h4></td>
            </tr>
            <tr>
                <td><h4>Settings 2 {">"}</h4></td>
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
    }

}
`
