import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import URLS from "../../../utils/urls";
import moment from "moment";
import CreateAdmin from "./CreateAdmin";
import LoaderCSS from "../../Loader";
import ViewPermission from "./ViewPermission";
import AccessActions from "./AccessActions";

export default function AssignRoles() {
  const [userData, setUserData] = useState("");
  const [permissionData, setPermissionData] = useState("");
  const [pop, setPop] = useState(false);
  const [loader, setLoader] = useState(true);
  const [permission, setPermission] = useState(false);
  const [actionAccess, setActionAccess] = useState(false);
  const [updateApi, setUpdateApi] = useState(false);
  const [currentRole, setCurrentRole] = useState("");
  const [userId, setUserId] = useState("");

  const getAdminUsers = async () => {
    try {
      const res = await axios.get(`${URLS.EXCHANGE.ADMIN.GET_ADMIN_USERS}`);
      console.log("res", res);
      setUserData(res?.data?.data?.records);
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAdminUsers();
  }, [updateApi]);

  console.log("userId", userId, userData);
  return (
    <Root>
      <div className="create_admin">
        <h3>
          Create New Admin User{" "}
          <button
            onClick={() => {
              setPop(true);
            }}
          >
            Add+
          </button>
        </h3>
        <div className={pop ? "popup" : "popup off"}>
          <CreateAdmin
            clsBtn={(e) => {
              setPop(e);
            }}
            updateApi={(e) => {
              setUpdateApi(e);
            }}
          />
        </div>
      </div>
      <div className="get_admin">
        <h3>List of all admin users</h3>
        {loader ? (
          <LoaderCSS />
        ) : (
          <table>
            <thead className="table_head">
              <tr>
                <th>Admin Username</th>
                <th>Name</th>
                <th>Created On</th>
                <th>Current Role</th>
                <th>View Permissions</th>
                <th>Take Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData?.map((i, ix) => {
                  return (
                    <tr key={ix}>
                      <td data-label="Username">
                        {/* {i?.avatar} */}
                        {i?.username}
                      </td>
                      <td data-label="Name">{i?.name}</td>
                      <td data-label="Created On">
                        {moment(i?.createdAt).format("DD-MMM-YYYY")}
                      </td>
                      <td data-label="Role">{i?.role?.name}</td>
                      <td
                        className="td_click"
                        data-label="View Permissions"
                        onClick={() => {
                          setPermission(true);
                          setPermissionData(i);
                        }}
                      >
                        Click Here
                      </td>
                      <td
                        className="td_click"
                        data-label="Action"
                        onClick={() => {
                          setActionAccess(true);
                          setCurrentRole(i.role.code);
                          setUserId(i?.id);
                          setUpdateApi(false);
                        }}
                      >
                        Click Here{" "}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
      <div className={permission ? "dialog_box" : "dialog_box no"}>
        <ViewPermission
          permissionData={permissionData}
          toClose={(e) => {
            setPermission(e);
          }}
        />
      </div>
      <div className={actionAccess ? "dialog_box" : "dialog_box no"}>
        <AccessActions
          currentRole={currentRole}
          userId={userId}
          updateApi={(e)=>{setUpdateApi(e)}}
          toClose={(e) => {
            setActionAccess(e);
          }}
        />
      </div>
    </Root>
  );
}

const Root = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;

  .create_admin {
    button {
      padding: 5px;
      font-size: 15px;
      margin: 0px 10px;
      cursor: pointer;
    }

    .popup {
      height: 100%;
      position: fixed;
      width: 100%;
      top: 0px;
      left: 0;
      z-index: 999;
      backdrop-filter: blur(3px);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .off {
      display: none;
    }
  }

  .get_admin {
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
    .td_click {
      cursor: pointer;
      &:hover {
        background-color: gray;
      }
    }

    table {
      margin-top: 10px;
      width: 100%;
      text-align: left;
      border: 1px solid;
      border-collapse: collapse;

      @media (max-width: 600px) {
        border: hidden;
        td,
        th {
          border: 1px solid #ccc;
          padding: 0.625em;
          text-align: right;
          padding: 5px;
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
  }

  .dialog_box {
    height: 100%;
    position: fixed;
    width: 100%;
    top: 0px;
    left: 0;
    z-index: 999;
    backdrop-filter: blur(3px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialog_box.no {
    display: none;
  }
`;
