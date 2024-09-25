import { AnimatePresence } from "framer-motion";
import AdminAuthentication from "../components/adminAuth/AdminAuthentication";
import { useEffect, useState } from "react";
import DataTable from "../components/adminAuth/dataTable";
import AdminHeader from "../components/adminAuth/AdminHeader";

const AdminPage = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showUsersData, setShowUsersData] = useState(true);
  const [newInputIsAppear, setNewInputIsAppear] = useState("");

  return (
    <div className="admin-page">
      <AnimatePresence>
        {!localStorage.getItem("isAdmin") && (
          <div className="blured-backg">
            <AdminAuthentication
              setIsAdminAuthenticated={setIsAdminAuthenticated}
            />
          </div>
        )}
      </AnimatePresence>
      <AdminHeader
        setShowUsersData={setShowUsersData}
        setNewInputIsAppear={setNewInputIsAppear}
      />
      <DataTable
        isAdminAuthenticated={isAdminAuthenticated}
        showUsersData={showUsersData}
        newInputIsAppear={newInputIsAppear}
        setNewInputIsAppear={setNewInputIsAppear}
      />
    </div>
  );
};

export default AdminPage;
