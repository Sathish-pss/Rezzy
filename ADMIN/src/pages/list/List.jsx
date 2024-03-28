// Import the SCSS Files here
import "./list.scss";
// Import the Customized Components here
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";

/**
 *
 * @param {*} param0
 * @returns Functional Components returns the Lists
 */
const List = ({ columns }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable columns={columns} />
      </div>
    </div>
  );
};

export default List;
