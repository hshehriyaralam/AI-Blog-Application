'use client'
import { useState, useEffect } from "react";
import {useAllUserAdminQuery} from '../../Redux/Services/adminApi'
import { Users, Search,  Mail, Calendar, FileText, Trash2, Edit, MoreVertical, UserCheck, UserX, Shield } from "lucide-react";




export default function AllUser(){

    const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

      const { data } = useAllUserAdminQuery(undefined)
      console.log("All users", data?.data)
    return(
<div className="divide-y divide-slate-200">
            {data?.data?.length === 0 ? (
              <div className="p-12 text-center">
                <Users size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-600">No users found matching your criteria</p>
              </div>
            ) : (
              data?.data?.map((user:any) => (
                <div key={user.id} className="grid grid-cols-12 gap-4 p-6 hover:bg-slate-50 transition-colors">
                  {/* User Info */}
                  <div className="col-span-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                        <img
                        src={user?.profilePic}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 truncate">{user?.name}</h3>
                        <p className="text-slate-600 text-sm truncate flex items-center">
                          <Mail size={12} className="mr-1" />
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="col-span-2 flex items-center">
                    {user.role}
                  </div>

                  {/* Status */}
                  <div className="col-span-2 flex items-center">
                    Active
                  </div>

                  {/* Join Date */}
                  <div className="col-span-2 flex items-center text-slate-700">
                    <Calendar size={14} className="mr-2 text-slate-400" />
                    {formatDate(user?.joiningTime)}
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex items-center justify-end space-x-2">
                    <button className="p-2 text-blue-400 hover:text-blue-600 transition-colors" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-2 text-red-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors" title="More">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
    )
}