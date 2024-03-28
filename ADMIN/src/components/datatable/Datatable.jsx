import { useEffect, useState } from "react";
// Importing the SCSS file here
import "./datatable.scss";
// Importing the Data grid here
import { DataGrid } from "@mui/x-data-grid";
// Importing the customized Components
import useFetch from "../../hooks/useFetch";
import { userColumns, userRows } from "../../datatablesource";
// Importing the External Packages here
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

// Functional Component that returns the Data table
const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(`/${path}`);

  // UseEffect function to fetch the data when changes
  useEffect(() => {
    setList(data);
  }, [data]);

  // Function to delete based on filtered id
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  // Action column to view and delete the rows
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
