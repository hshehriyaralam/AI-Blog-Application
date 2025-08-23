import AdminProtectedRoute from "../../components/layout/AdminProtected"


export default function Admin(){
    return(
        <AdminProtectedRoute>
        <div>
            <h1>Admin Dashboard</h1>
        </div>
        </AdminProtectedRoute>
      
    )
}