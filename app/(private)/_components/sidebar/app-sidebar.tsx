"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ChartPie, ChevronRight, ChevronsRightIcon, LogOut, PanelLeft, User2, X } from "lucide-react";
import { Avatar, cn, Dropdown, Header, Label, Spinner, Popover, PopoverTrigger } from "@heroui/react";
import Modal from "@/ui/modal";
import { useCurrentUser } from "@/src/permissions";
import { findActivePath, matchPath } from "@/utils/utils";
import { ThemeToggle } from "../theme";
import { MenuItem, useMenu } from "./menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, useSidebar } from "@/app/(private)/_components/sidebar/sidebar";

const sidebarStyles = {
  parent: {
    base: "text-[var(--sidebar-inactive-text)] border border-transparent transition-colors duration-200",
    active: "bg-[image:var(--sidebar-active-bg)] backdrop-blur-md border border-[var(--sidebar-active-border)] shadow-[inset_0px_1px_1px_var(--sidebar-active-highlight)] text-[var(--sidebar-active-text)]",
    hover: "hover:bg-[var(--sidebar-hover-bg)]",
  },
  child: {
    base: "text-[var(--sidebar-inactive-text)] border border-transparent transition-colors duration-200",
    active: "bg-[image:var(--sidebar-active-bg)] backdrop-blur-md border border-[var(--sidebar-active-border)] shadow-[inset_0px_1px_1px_var(--sidebar-active-highlight)] text-[var(--sidebar-active-text)]",
    hover: "hover:bg-[var(--sidebar-hover-bg)]",
  },
};


type Props = {
  item: MenuItem;
  level?: number;
  expandedMap: Record<number, string | null>;
  handleExpand: (level: number, title: string) => void;
};

const PopoverNode = ({ child, pathname }: { child: MenuItem; pathname: string }) => {
  const hasChildren = child.children && child.children.length > 0;
  return (
    <li className="flex flex-col ">
      {hasChildren ? (
        <>
          <div className="px-2 py-0.5 text-[12px] font-bold text-foreground/80 mt-1">
            {child.title}
          </div>
          <ul className="flex flex-col space-y-0 border-l-2 border-divider ml-2.5 pl-1.5 mt-0.5 mb-1">
            {child.children!.map((subChild) => (
              <PopoverNode key={subChild.title} child={subChild} pathname={pathname} />
            ))}
          </ul>
        </>
      ) : (
        <Link
          href={child.url || "#"}
          className={cn(
            "flex w-full px-2 py-1 text-[13px] rounded-md transition-colors ",
            child.url && matchPath(child.url, pathname)
              ? "bg-[image:var(--sidebar-active-bg)] text-[var(--sidebar-active-text)] font-semibold"
              : "text-[var(--sidebar-inactive-text)] hover:bg-content2 hover:text-foreground"
          )}
        >
          {child.title}
        </Link>
      )}
    </li>
  );
};

function SidebarItem({ item, level = 0, expandedMap, handleExpand, }: Props) {
  const { open } = useSidebar();
  const pathname = usePathname();

  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 250);
  };

  const hasChildren = item.children && item.children.length > 0;

  const isActiveExact = matchPath(item.url, pathname);
  const isActiveParent = !!item.children && item.children.some(child => matchPath(child.url, pathname) || (child.children && findActivePath(child.children, pathname)));
  // Determine if this item is expanded
  const expanded = expandedMap[level] === item.title;

  const itemContent = hasChildren ? (
    <button onClick={() => handleExpand(level, item.title)}
      className={cn(
        "flex w-full items-center rounded-lg px-3 py-2 text-[13px] mb-0.5 transition-all duration-200",
        open ? "justify-between" : "justify-center",
        isActiveParent ? sidebarStyles.parent.active : sidebarStyles.parent.base, // Apply active/default
        !isActiveParent && sidebarStyles.parent.hover // Hover effect
      )}
    >
      <div className="flex items-center gap-3">
        {item.icon ? (
          <item.icon className={cn("w-[18px] h-[18px] flex-shrink-0 transition-colors", isActiveParent ? "text-[var(--sidebar-active-text)]" : "text-[var(--sidebar-inactive-icon)] group-hover:text-[var(--sidebar-inactive-text)]")} />
        ) : (
          <div className="w-[18px] h-[18px] flex items-center justify-center flex-shrink-0">
            <div className={cn("size-1.5 rounded-full transition-colors", isActiveParent ? "bg-[var(--sidebar-active-text)]" : "bg-[var(--sidebar-inactive-icon)] opacity-50")} />
          </div>
        )}
        {open && <span className={cn("truncate", isActiveParent ? "font-semibold" : "font-medium")}>{item.title}</span>}
      </div>
      {hasChildren && open && (
        <ChevronRight className={cn("size-4 transition-transform", isActiveParent ? "text-[var(--sidebar-active-text)] opacity-70" : "text-[var(--sidebar-inactive-icon)]", expanded ? "rotate-90" : "")} />
      )}
    </button>
  ) : (
    <Link
      href={item.url || "#"}
      className={cn(
        "flex w-full items-center rounded-lg px-3 py-1.5 text-[13px] mb-0.5 transition-all duration-200",
        open ? "justify-between" : "justify-center",
        isActiveExact ? sidebarStyles.child.active : sidebarStyles.child.base,
        !isActiveExact && sidebarStyles.child.hover
      )}
    >
      <div className="flex items-center gap-3">
        {item.icon ? (
          <item.icon className={cn("w-[18px] h-[18px] flex-shrink-0 transition-colors", isActiveExact ? "text-[var(--sidebar-active-text)]" : "text-[var(--sidebar-inactive-icon)] group-hover:text-[var(--sidebar-inactive-text)]")} />
        ) : (
          <div className="w-[18px] h-[18px] flex items-center justify-center flex-shrink-0">
            <div className={cn("size-1.5 rounded-full transition-colors", isActiveExact ? "bg-[var(--sidebar-active-text)]" : "bg-[var(--sidebar-inactive-icon)] opacity-50")} />
          </div>
        )}
        {open && <span className={cn("truncate", isActiveExact ? "font-semibold" : "font-medium")}>{item.title}</span>}
      </div>
    </Link>
  );

  return (
    <li>
      <div className="group relative">
        {open ? (
          itemContent
        ) : (
          <Popover isOpen={isHovered} onOpenChange={setIsHovered}>
            <PopoverTrigger>
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="w-full cursor-pointer">
                {itemContent}
              </div>
            </PopoverTrigger>
            <Popover.Content placement="right" isNonModal onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={"rounded-2xl"}>
              <Popover.Dialog className={cn("p-2", hasChildren ? "min-w-[200px]" : "min-w-fit")}>
                <Popover.Arrow />
                {hasChildren ? (
                  <div className="w-full">
                    <div className="px-2 py-1 font-bold text-foreground border-b border-divider mb-1 text-[13px]">
                      {item.title}
                    </div>
                    <ul className="flex flex-col space-y-0 mt-0.5 w-full">
                      {item.children!.map((child) => (
                        <PopoverNode key={child.title} child={child} pathname={pathname} />
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    href={item.url || "#"}
                    className="flex w-full whitespace-nowrap px-2 py-1 hover:bg-content2 transition-colors rounded-lg"
                  >
                    <span className="font-semibold text-foreground text-[14px]">
                      {item.title}
                    </span>
                  </Link>
                )}
              </Popover.Dialog>
            </Popover.Content>
          </Popover>
        )}
      </div>

      {/* ============================
          🔹 Render children inline (when expanded + sidebar open)
          ============================ */}
      {hasChildren && expanded && open && (
        <ul className="pl-3 border-l-2 border-divider ml-[23px] pt-1 space-y-0.5 mb-1">
          {item.children!.map((child) => (
            <SidebarItem key={child.title} item={child} level={(level || 0) + 1} expandedMap={expandedMap} handleExpand={handleExpand} />
          ))}
        </ul>
      )}
    </li>
  );
}


export function AppSidebar() {

  const { menu: Menu, isLoading } = useMenu(); // Get menu data (can be dynamic or static)
  const pathname = usePathname();
  const { open, toggle } = useSidebar();
  const { data: user } = useCurrentUser();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);

  const onOpenChange = () => setIsOpen(false);

  const handleLogout = async () => {
    // NextAuth logout (clears session cookies)
    await signOut({ redirect: false });

    // then route wherever you want
    router.push("/auth/login");
    router.refresh(); // optional but helps update UI immediately
  };


  // Track open items per level
  const [expandedMap, setExpandedMap] = useState<Record<number, string | null>>({});

  const handleExpand = (level: number, title: string) => {
    setExpandedMap((prev) => ({
      ...prev,
      [level]: prev[level] === title ? null : title, // toggle within same level
    }));
  };


  useEffect(() => {
    if (!Menu || Menu.length === 0) return;

    const activePath = findActivePath(Menu, pathname);

    if (activePath) {
      const newMap: Record<number, string | null> = {};
      activePath.forEach((title, idx) => {
        newMap[idx] = title;
      });

      setExpandedMap(newMap);
    }
  }, [pathname, Menu]);


  return (
    <Sidebar className="transition-all duration-200">
      {/* {JSON.stringify(user)} */}
      <SidebarHeader className="flex items-center w-full justify-between pt-4 pb-2">
        {open ? (
          <div className="flex w-full items-center justify-between relative px-2">
            {/* <Image src={""} alt="logo" width={100} height={100} className="w-24" unoptimized /> */}
            <div className="flex gap-2 items-center w-full">
              <ChartPie color="var(--primary)" size={25} />
              <Link href={"/"} className="text-xl font-bold">DashFlow</Link>
            </div>
            <div className="bg-surface-secondary hover:bg-content2 transition-colors p-1.5 rounded-full">
              <PanelLeft
                onClick={toggle}
                size={18}
                className="text-foreground cursor-pointer"
              /> </div>
          </div>
        ) : (
          <div className="flex items-center px-2 py-[0.25rem] relative translate-x-1 hover:bg-surface-secondary rounded-xl transition-colors cursor-pointer">
            <ChevronsRightIcon size={20} onClick={toggle} className="text-foreground" />
          </div>
        )}
      </SidebarHeader>


      <SidebarContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-6 h-full">
            <Spinner
              className="text-foreground mt-4"
              size="sm"
            />
          </div>
        ) : (
          <ul className="">
            {Menu.map((item) => (
              <SidebarItem key={item.title} item={item} expandedMap={expandedMap} handleExpand={handleExpand} />
            ))}
          </ul>)}
      </SidebarContent>

      <SidebarFooter className="pb-4">
        <Dropdown>
          <Dropdown.Trigger className="w-full">
            <div className={cn("flex items-center gap-3 hover:bg-content2/50 p-2 -mx-2 rounded-xl transition-all duration-200 w-full", open ? "justify-start px-2" : "justify-center")}>
              <Avatar className="w-9 h-9 border-2 border-primary/10 shadow-sm shrink-0">
                <Avatar.Fallback>
                  {user?.role?.charAt(0)?.toUpperCase() || "U"}
                </Avatar.Fallback>
              </Avatar>

              {open && (
                <div className="flex flex-col items-start text-left leading-tight w-full overflow-hidden">
                  <span className="text-sm font-semibold text-foreground truncate w-full">
                    {user?.role}
                  </span>

                  <span className="text-xs text-default-500 truncate w-full">
                    {user?.email}
                  </span>
                </div>
              )}
            </div>
          </Dropdown.Trigger>
          <Dropdown.Popover className="rounded-2xl">
            <Dropdown.Menu
              aria-label="Profile Actions"
              onAction={(key) => {
                if (key === "logout") onOpen();
              }}
              className="min-w-[210px] p-1"
            >
              <Dropdown.Section>
                <Header className="px-2 py-1 text-xs text-muted-foreground">
                  Account
                </Header>

                {/* Profile */}
                <Dropdown.Item
                  id="profile"
                  textValue="Profile"
                  className="min-h-9 px-5 py-1 rounded-xl"
                >
                  <div className="flex w-full items-center gap-2">
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                      <User2 className="size-4" />
                    </div>

                    <Label className="text-sm font-medium">Profile</Label>
                  </div>
                </Dropdown.Item>


                {/* Theme */}
                <Dropdown.Item
                  id="theme"
                  textValue="Theme Toggle"
                  className="min-h-9 py-1 rounded-xl px-5"
                >
                  <ThemeToggle />
                </Dropdown.Item>


                {/* Logout */}
                <Dropdown.Item
                  id="logout"
                  textValue="Log Out"
                  variant="danger"
                  className="min-h-9 px-5 py-1 rounded-xl"
                >
                  <div className="flex w-full items-center gap-2">
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                      <LogOut className="size-4 text-danger" />
                    </div>

                    <Label className="text-sm font-medium">Log Out</Label>
                  </div>
                </Dropdown.Item>
              </Dropdown.Section>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
        <Modal
          title=""
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          footerActions={[
            { label: "Cancel", radius: "sm", onPress: () => onOpenChange() },
            { label: "Confirm", radius: "sm", variant: "danger-soft", onPress: () => handleLogout() },
          ]} >
          <div className="flex flex-col items-center justify-center w-full gap-2">
            {/* <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4 "> */}
            {/* <Image src={LogoutIcon} alt="Logout Icon" width={100} height={100} className="w-18 h-18" />                    </div> */}
            <LogOut className="w-18 h-18 text-primary" />
            <p className='text-center font-medium text-lg'>Are you sure you want to log out?</p>
          </div>
        </Modal>
      </SidebarFooter>
    </Sidebar>
  );
}
