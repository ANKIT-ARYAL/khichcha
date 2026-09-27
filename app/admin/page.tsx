import { isAdminAuthenticated } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin-dashboard";
export default async function AdminPage() { if (!(await isAdminAuthenticated())) redirect("/admin/login"); return <AdminDashboard />; }
