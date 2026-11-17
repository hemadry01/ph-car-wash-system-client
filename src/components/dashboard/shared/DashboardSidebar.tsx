"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  CalendarCheck,
  CalendarDays,
  CarFront,
  ChevronsUpDown,
  Droplets,
  House,
  LayoutDashboard,
  LogOut,
  UserRound,
  Users,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  TDashboardSidebarItem,
  TUser,
  TUserRole,
} from "@/type";


const roleBaseSidebarItems = {
  user: [
    {
      title: "Dashboard",
      href: "/dashboard/user",
      icon: LayoutDashboard,
    },
    {
      title: "My Bookings",
      href: "/dashboard/user/bookings",
      icon: CalendarCheck,
    },
    {
      title: "Upcoming Bookings",
      href: "/dashboard/user/bookings/upcoming",
      icon: CalendarDays,
    },
    {
      title: "My Profile",
      href: "/dashboard/user/profile",
      icon: UserRound,
    },
  ],
  admin: [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Bookings",
      href: "/dashboard/admin/bookings",
      icon: CalendarCheck,
    },
    {
      title: "Upcoming Bookings",
      href: "/dashboard/admin/bookings/upcoming",
      icon: CalendarDays,
    },
    {
      title: "Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      title: "Branches",
      href: "/dashboard/admin/branches",
      icon: Building2,
    },
    {
      title: "Services",
      href: "/dashboard/admin/services",
      icon: Droplets,
    },
    {
      title: "My Profile",
      href: "/dashboard/admin/profile",
      icon: UserRound,
    },
  ],
  branchManager: [
    {
      title: "Dashboard",
      href: "/dashboard/branchManager",
      icon: LayoutDashboard,
    },
    {
      title: "Services",
      href: "/dashboard/branchManager/services",
      icon: Droplets,
    },
    {
      title: "Bookings",
      href: "/dashboard/branchManager/bookings",
      icon: CalendarCheck,
    },
    {
      title: "Upcoming Bookings",
      href: "/dashboard/branchManager/bookings/upcoming",
      icon: CalendarDays,
    },
    {
      title: "My Profile",
      href: "/dashboard/branchManager/profile",
      icon: UserRound,
    },
  ],
};

const isActivePath = (pathname: string, href: string) =>
  href === "/dashboard"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);



const DashboardSidebar = ({ user: userProp }: { user?: TUser | null }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();

  // Prefer the live session; fall back to the prop.
  const { data: session } = authClient.useSession();
  const user = (session?.user as TUser | undefined) ?? userProp;

  const role = user?.role || "user";
  const sidebarItems = roleBaseSidebarItems [role as TUserRole] || [];
  console.log(sidebarItems);

  // On mobile the sidebar is a sheet; close it after navigating.
  const closeMobile = () => setOpenMobile(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    closeMobile();
    router.push("/");
  };

  // Items visible to the current user's role.


  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="PH Car Wash"
              render={
                <Link href={`/dashboard/${user?.role||"user"}`} onClick={closeMobile} />
              }
            >
              <div className="grid aspect-square size-8 place-items-center rounded-lg bg-[#15295e] text-[#ffc107]">
                <CarFront />
              </div>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-semibold">PH Car Wash</span>
                <span className="truncate text-xs text-sidebar-foreground/70">
                  dashboard
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item: TDashboardSidebarItem) => {
                const { title, href, icon: Icon } = item;

                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      tooltip={title}
                      isActive={isActivePath(pathname, href)}
                      render={<Link href={href} onClick={closeMobile} />}
                    >
                      <Icon />
                      <span>{title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {user && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <SidebarMenuButton
                      size="lg"
                      className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
                    />
                  }
                >
                  <Avatar className="rounded-lg after:rounded-lg">
                    <AvatarImage
                      src={user.image ?? undefined}
                      alt={user.name}
                      className="rounded-lg"
                    />
                    <AvatarFallback className="rounded-lg">
                      {user.name}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs text-sidebar-foreground/70">
                      {user.email}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="min-w-56"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="truncate">
                      {/* Signed in as {role || "user"} */}
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      render={<Link href="/" onClick={closeMobile} />}
                    >
                      <House />
                      Back to site
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      render={<Link href="/profile" onClick={closeMobile} />}
                    >
                      <UserRound />
                      My profile
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}

      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSidebar;

