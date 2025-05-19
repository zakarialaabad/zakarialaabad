import { NotificationsProvider } from "@/contexts/notifications-context";
import {AdminProperties} from "./listPorpreites";
import { ReactNode } from "react";
import { AuthProvider } from "@/contexts/auth-context";
import AdminLayout from "@/layouts/layoutAdmin";
 function AdminPropertiesProvider() {
    return (
        <>
        <AuthProvider>

        <NotificationsProvider>
            <AdminProperties/>
        </NotificationsProvider>     
        </AuthProvider>
       
        </>
    )
}
AdminPropertiesProvider.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
export default AdminPropertiesProvider;