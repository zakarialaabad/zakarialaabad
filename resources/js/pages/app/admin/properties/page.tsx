import { NotificationsProvider } from "@/contexts/notifications-context";
import {Adminproprietes} from "./listPorpreites";
import { ReactNode } from "react";
import { AuthProvider } from "@/contexts/auth-context";
import AdminLayout from "@/layouts/layoutAdmin";
 function AdminPropertiesProvider() {
    return (
        <>
        <AuthProvider>

        <NotificationsProvider>
            <Adminproprietes/>
        </NotificationsProvider>     
        </AuthProvider>
       
        </>
    )
}
AdminPropertiesProvider.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
export default AdminPropertiesProvider;