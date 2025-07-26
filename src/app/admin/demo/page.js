"use client";

import { AdminAuthProvider } from "@/context_api/AdminAuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import DemoAnimations from "@/components/admin/DemoAnimations";

const AdminDemoPage = () => {
  return (
    <AdminAuthProvider>
      <AdminLayout>
        <DemoAnimations />
      </AdminLayout>
    </AdminAuthProvider>
  );
};

export default AdminDemoPage;
