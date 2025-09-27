'use client'
import { useState, useEffect, useContext } from "react";
import {useAllUserAdminQuery} from '../../Redux/Services/adminApi'
import { ContextTheme } from "../../Context/DarkTheme";
import { Users, Search, Mail, Calendar, FileText, Trash2, Edit, MoreVertical, UserCheck, UserX, Shield, Ban, Crown, PenTool, Heart } from "lucide-react";


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



export default function AllUserAdminPage({filteredUsers,handleDeleteClick}:any){
  const { themeValue, light, dark } = useContext(ContextTheme);
  const { data } = useAllUserAdminQuery(undefined)

    const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRoleBadge = (user: User) => {
      const baseStyles = "px-2 py-1 text-xs font-medium rounded-full border";
      
      if (themeValue) {
        // Light theme
        const styles = {
          admin: "bg-purple-100 text-purple-800 border-purple-200",
          author: "bg-blue-100 text-blue-800 border-blue-200",
          user: "bg-gray-100 text-gray-800 border-gray-200"
        };
        return (
          <span className={`${baseStyles} ${styles[user.role]} flex items-center`}>
            {user.role === 'admin' && <Crown size={10} className="mr-1" />}
            {user.role === 'author' && <PenTool size={10} className="mr-1" />}
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </span>
        );
      } else {
        // Dark theme
        const styles = {
          admin: "bg-purple-900/30 text-purple-400 border-purple-700",
          author: "bg-blue-900/30 text-blue-400 border-blue-700",
          user: "bg-gray-700 text-gray-300 border-gray-600"
        };
        return (
          <span className={`${baseStyles} ${styles[user.role]} flex items-center`}>
            {user.role === 'admin' && <Crown size={10} className="mr-1" />}
            {user.role === 'author' && <PenTool size={10} className="mr-1" />}
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </span>
        );
      }
    };


    const getStatusBadge = (user: User) => {
    const baseStyles = "px-2 py-1 text-xs font-medium rounded-full border flex items-center";
    
    if (user.isBanned) {
      return themeValue 
        ? `${baseStyles} bg-red-100 text-red-800 border-red-200`
        : `${baseStyles} bg-red-900/30 text-red-400 border-red-700`;
    } else {
      return themeValue
        ? `${baseStyles} bg-green-100 text-green-800 border-green-200`
        : `${baseStyles} bg-green-900/30 text-green-400 border-green-700`;
    }
  };

    const formatLastSeen = (dateString: string): string => {
    const now = new Date();
    const lastSeen = new Date(dateString);
    const diffMs = now.getTime() - lastSeen.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  };




    return(
      <div className={`rounded-2xl shadow-lg border overflow-hidden ${
                themeValue ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
              }`}>
                {/* Table Header */}
                <div className={`hidden md:grid grid-cols-12 gap-4 p-6 border-b ${
                  themeValue ? 'border-gray-200 bg-gray-50 text-gray-900' : 'border-gray-700 bg-gray-900 text-white'
                } font-semibold text-sm`}>
                  <div className="col-span-3">User</div>
                  <div className="col-span-2">Role</div>
                  <div className="col-span-1 text-center">Blogs</div>
                  <div className="col-span-1 text-center">Likes</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Last Active</div>
                </div>
      
                {/* Table Body */}
                <div className={`divide-y ${
                  themeValue ? 'divide-gray-200' : 'divide-gray-700'
                }`}>
                  {filteredUsers.length === 0 ? (
                    <div className="p-12 text-center">
                      <Users size={48} className={`mx-auto mb-4 ${
                        themeValue ? 'text-gray-300' : 'text-gray-600'
                      }`} />
                      <p className={themeValue ? 'text-gray-600' : 'text-gray-300'}>
                        No users found matching your criteria
                      </p>
                    </div>
                  ) : (
                    filteredUsers.map((user:any) => (
                      <div
                        key={user.id}
                        className={`grid grid-cols-12 gap-4 p-6 transition-colors duration-200 items-center group ${
                          themeValue 
                            ? 'hover:bg-gray-50' 
                            : 'hover:bg-gray-700/50'
                        }`}
                      >
      
                        {/* User Info */}
                        <div className="col-span-12 md:col-span-3 flex items-center space-x-3">
                          <div className="relative">
                            {user.profilePic ? (
                              <img
                                src={user.profilePic}
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover shadow-sm"
                              />
                            ) : (
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                themeValue 
                                  ? 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600' 
                                  : 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30 text-blue-400'
                              }`}>
                                <Users size={16} />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className={`font-semibold truncate ${
                              themeValue ? 'text-gray-900' : 'text-white'
                            }`}>
                              {user.name}
                            </h3>
                            <p className={`text-xs truncate flex items-center ${
                              themeValue ? 'text-gray-600' : 'text-gray-300'
                            }`}>
                              <Mail size={10} className="mr-1" />
                              {user.email}
                            </p>
                          </div>
                        </div>
      
                        {/* Role */}
                        <div className="col-span-6 md:col-span-2 flex items-center">
                          {getRoleBadge(user)}
                        </div>
      
                        {/* Blog Count */}
                        <div className="col-span-3 md:col-span-1 flex items-center justify-center">
                          <div className={`flex items-center space-x-1 ${
                            themeValue ? 'text-gray-700' : 'text-gray-200'
                          }`}>
                            <FileText size={14} />
                            <span className="font-medium">{user.blogCount}</span>
                          </div>
                        </div>
      
                        {/* Total Likes */}
                        <div className="col-span-3 md:col-span-1 flex items-center justify-center">
                          <div className={`flex items-center space-x-1 ${
                            themeValue ? 'text-gray-700' : 'text-gray-200'
                          }`}>
                            <Heart size={14} />
                            <span className="font-medium">{user.totalLikes}</span>
                          </div>
                        </div>
      
                        {/* Status */}
                        <div className="col-span-6 md:col-span-2 flex items-center">
                          <span className={getStatusBadge(user)}>
                                <UserCheck size={10} className="mr-1" />
                                Active
                          </span>
                        </div>
      
                        {/* Last Active */}
                        <div className="col-span-6 md:col-span-2 flex items-center justify-between">
                          <span className={`text-xs ${
                            themeValue ? 'text-gray-600' : 'text-gray-300'
                          }`}>
                            {formatLastSeen(user.lastSeenAt)}
                          </span>
                          
                          {/* Actions */}
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => handleDeleteClick(user.id)}
                              className={`p-2 rounded-lg transition-all duration-200 ${
                                themeValue
                                  ? 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700'
                                  : 'bg-red-900/30 hover:bg-red-900/50 text-red-400 hover:text-red-300'
                              }`}
                              title="Delete User"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
    )
}