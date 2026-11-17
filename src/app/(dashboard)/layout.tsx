"use client"
import React, { type ReactNode } from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from '@/components/dashboard/shared/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/shared/DashboardHeader';
import { authClient } from '@/lib/auth-client';


const DashboardLayout = ({ children }: { children: ReactNode }) => {

  const{data:session} = authClient.useSession();
  const user = session?{
    name:session.user.name,
    email:session.user.email,
    image:session.user.image,
    role:session.user.role,
  }:null;
     return (
       <SidebarProvider>
         <DashboardSidebar  user={user}/>
         <SidebarInset>
           <DashboardHeader />
           <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
         </SidebarInset>
       </SidebarProvider>
     );
};

export default DashboardLayout;