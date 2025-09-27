'use client'
import { useState, useEffect } from "react";
import { Users, Search,  Mail, Calendar, FileText, Trash2, Edit, MoreVertical, UserCheck, UserX, Shield } from "lucide-react";
import {useAllUserAdminQuery} from '../../../Redux/Services/adminApi'
import AllUser from "../../../components/AdminUsersComp/AllUser";


interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'author' | 'user';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastLogin: string;
  blogsCount: number;
  avatar?: string;
}

export default function AllUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'author' | 'user'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const { data } = useAllUserAdminQuery(undefined)
  console.log("All users", data?.data)

  // Sample data - Replace with API call
  useEffect(() => {
    const loadUsers = () => {
      const sampleUsers: User[] = [
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          role: "admin",
          status: "active",
          joinDate: "2023-01-15",
          lastLogin: "2024-01-20",
          blogsCount: 12,
          avatar: "JD"
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane.smith@example.com",
          role: "author",
          status: "active",
          joinDate: "2023-02-20",
          lastLogin: "2024-01-19",
          blogsCount: 8,
          avatar: "JS"
        },
        {
          id: 3,
          name: "Mike Johnson",
          email: "mike.johnson@example.com",
          role: "author",
          status: "active",
          joinDate: "2023-03-10",
          lastLogin: "2024-01-18",
          blogsCount: 5,
          avatar: "MJ"
        },
        {
          id: 4,
          name: "Sarah Wilson",
          email: "sarah.wilson@example.com",
          role: "user",
          status: "active",
          joinDate: "2023-04-05",
          lastLogin: "2024-01-17",
          blogsCount: 0,
          avatar: "SW"
        },
        {
          id: 5,
          name: "Alex Chen",
          email: "alex.chen@example.com",
          role: "author",
          status: "inactive",
          joinDate: "2023-05-12",
          lastLogin: "2023-12-15",
          blogsCount: 3,
          avatar: "AC"
        },
        {
          id: 6,
          name: "David Brown",
          email: "david.brown@example.com",
          role: "user",
          status: "suspended",
          joinDate: "2023-06-08",
          lastLogin: "2023-11-20",
          blogsCount: 0,
          avatar: "DB"
        },
        {
          id: 7,
          name: "Emily Davis",
          email: "emily.davis@example.com",
          role: "author",
          status: "active",
          joinDate: "2023-07-25",
          lastLogin: "2024-01-20",
          blogsCount: 7,
          avatar: "ED"
        },
        {
          id: 8,
          name: "Robert Wilson",
          email: "robert.wilson@example.com",
          role: "user",
          status: "active",
          joinDate: "2023-08-30",
          lastLogin: "2024-01-19",
          blogsCount: 0,
          avatar: "RW"
        }
      ];

      setUsers(sampleUsers);
      setFilteredUsers(sampleUsers);
      setLoading(false);
    };

    setTimeout(loadUsers, 1000); // Simulate API delay
  }, []);

  // Filter users based on search and filters
  useEffect(() => {
    let result = users;

    if (searchTerm) {
      result = result.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }

    if (statusFilter !== 'all') {
      result = result.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(result);
  }, [searchTerm, roleFilter, statusFilter, users]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDeleteClick = (userId: number) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete));
      setSelectedUsers(selectedUsers.filter(id => id !== userToDelete));
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const toggleSelectUser = (userId: number) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === filteredUsers.length ? [] : filteredUsers.map(user => user.id));
  };

  const deleteSelectedUsers = () => {
    setUsers(users.filter(user => !selectedUsers.includes(user.id)));
    setSelectedUsers([]);
  };

  const getRoleBadge = (role: string) => {
    const styles = {
      admin: "bg-purple-100 text-purple-800 border-purple-200",
      author: "bg-blue-100 text-blue-800 border-blue-200",
      user: "bg-gray-100 text-gray-800 border-gray-200"
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${styles[role as keyof typeof styles]}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-yellow-100 text-yellow-800 border-yellow-200",
      suspended: "bg-red-100 text-red-800 border-red-200"
    };

    const icons = {
      active: <UserCheck size={12} className="mr-1" />,
      inactive: <UserX size={12} className="mr-1" />,
      suspended: <Shield size={12} className="mr-1" />
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border flex items-center ${styles[status as keyof typeof styles]}`}>
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getStats = () => {
    const total = users.length;
    const admins = users.filter(u => u.role === 'admin').length;
    const authors = users.filter(u => u.role === 'author').length;
    const active = users.filter(u => u.status === 'active').length;

    return { total, admins, authors, active };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/4 mb-6"></div>
            <div className="grid gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
              <p className="text-slate-600 mt-2">Manage all user accounts and permissions</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Users</p>
                <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Admins</p>
                <p className="text-2xl font-bold text-slate-900">{stats.admins}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Shield size={24} className="text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Authors</p>
                <p className="text-2xl font-bold text-slate-900">{stats.authors}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <FileText size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Users</p>
                <p className="text-2xl font-bold text-slate-900">{stats.active}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <UserCheck size={24} className="text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">{filteredUsers.length}</span> users found
              </div>
              {selectedUsers.length > 0 && (
                <button
                  onClick={deleteSelectedUsers}
                  className="flex items-center text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  <Trash2 size={16} className="mr-1" />
                  Delete Selected ({selectedUsers.length})
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Role Filter */}
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="author">Author</option>
                <option value="user">User</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-6 border-b border-slate-200 bg-slate-50 font-semibold text-slate-900 text-sm">
            <div className="col-span-3">User</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-2">Joined</div>
            <div className="col-span-2">Last Seen</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Table Body */}
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
          
                            
          
                            {/* Join Date */}
                            <div className="col-span-2 flex items-center text-slate-700">
                              <Calendar size={14} className="mr-2 text-slate-400" />
                              {formatDate(user?.joiningTime)}
                            </div>

                            {/* Status */}
                            <div className="col-span-2 flex items-center">
                              {formatDate(user?.lastSeenAt)}
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
                    </div>

        {/* Additional User Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4">User Distribution</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Admins</span>
                <span className="font-semibold text-slate-900">{stats.admins}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Authors</span>
                <span className="font-semibold text-slate-900">{stats.authors}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Regular Users</span>
                <span className="font-semibold text-slate-900">{stats.total - stats.admins - stats.authors}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4">Activity Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Active Users</span>
                <span className="font-semibold text-green-600">{stats.active}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Inactive Users</span>
                <span className="font-semibold text-yellow-600">{users.filter(u => u.status === 'inactive').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Suspended Users</span>
                <span className="font-semibold text-red-600">{users.filter(u => u.status === 'suspended').length}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 text-sm text-slate-600 hover:bg-slate-50 rounded transition-colors">
                Export User List
              </button>
              <button className="w-full text-left p-2 text-sm text-slate-600 hover:bg-slate-50 rounded transition-colors">
                Send Bulk Email
              </button>
              <button className="w-full text-left p-2 text-sm text-slate-600 hover:bg-slate-50 rounded transition-colors">
                Manage Permissions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Delete User Account</h3>
            <p className="text-slate-600 mb-4">
              Are you sure you want to delete this user account? This action will permanently remove the user and all their data.
            </p>
            <p className="text-sm text-red-600 mb-6">
              ⚠️ This action cannot be undone.
            </p>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}