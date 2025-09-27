'use client'
import { useState, useContext, useMemo } from "react";
import { useAllUserAdminQuery } from '../../../Redux/Services/adminApi'
import { ContextTheme } from "../../../Context/DarkTheme";
import LoadingPage from "../../../components/layout/LoadingPage";
import NameFilter from "../../../components/AdminUsersComp/Filter";
import AllUserAdminPage from "../../../components/AdminUsersComp/AllUser"
import DeletePopUp from "../../../components/AdminUsersComp/DeletePopUp"

 interface User {
  id: string;
  name: string;
  email: string;
  profilePic?: string;
  role: 'admin' | 'author' | 'user';
  isBanned: boolean;
  blogCount: number;
  totalLikes: number;
  joiningTime: string;
  lastSeenAt: string;
  bio?: string;
  isAdmin: boolean;
}

export default function AllUsers() {
  const { themeValue, light, dark } = useContext(ContextTheme);
  const { data, isLoading } = useAllUserAdminQuery(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const users: User[] = data?.data || [];

  // Filter users based on search and filters
  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let result = users;

    if (q) {
      result = result.filter(user =>
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q)
      );
    }
    return result;
  }, [users, searchQuery]);



  if (isLoading) return <LoadingPage />;
  

  return (
    <div className={`min-h-screen ${themeValue ? light : dark} p-2`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className={`text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent`}>
                User Management
              </h1>
              <p className={`mt-2 ${themeValue ? 'text-gray-600' : 'text-gray-300'}`}>
                Manage all user accounts and permissions
              </p>
            </div>
          </div>
        </div>

        <NameFilter  
        themeValue={themeValue}
        light={light}
        dark={dark}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        />

           {/* Users Table */}
        <AllUserAdminPage 
        filteredUsers={filteredUsers}
      setShowDeleteModal={setShowDeleteModal}
        />
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && <DeletePopUp  
      themeValue={themeValue }
      light={light}
      dark={dark}
      setShowDeleteModal={setShowDeleteModal}
       />}
    </div>
  );
}