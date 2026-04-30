// import HomeIcon from "@/public/assets/sidebar-icons/home-icon";
// import MasterIcon from "@/public/assets/sidebar-icons/master-icon";
// import ChildrenIcon from "@/public/assets/sidebar-icons/children";
// import PurchaseIcon from "@/public/assets/sidebar-icons/purchase-icon";
// import CompanyIcon from "@/public/assets/sidebar-icons/company-icon";
// import AdminIcon from "@/public/assets/sidebar-icons/admin-icon";

// const Menu = [

//   { title: "Home", icon: HomeIcon, url: "/dashboard" },
//   {
//     title: "Master", icon: MasterIcon, url: "#",
//     children: [
//       { title: "Roles", icon: ChildrenIcon, url: "/roles" },
//       { title: "Users", icon: ChildrenIcon, url: "/users" },
//       { title: "Publishers", icon: ChildrenIcon, url: "/publishers" },
//       { title: "Company", icon: ChildrenIcon, url: "/companies" },
//       { title: "Branches", icon: ChildrenIcon, url: "/branches" },
//       { title: "Classes", icon: ChildrenIcon, url: "/classes" },
//       { title: "Subjects", icon: ChildrenIcon, url: "/subjects" },
//       { title: "Books", icon: ChildrenIcon, url: "/books" },
//     ]
//   },
//   {
//     title: "Purchase", icon: PurchaseIcon, url: "#",
//     children: [
//       { title: "Order", icon: ChildrenIcon, url: "/purchase/order" },
//       { title: "GRN", icon: ChildrenIcon, url: "/purchase/grn" },
//       { title: "Return", icon: ChildrenIcon, url: "/purchase/return" },
//     ]
//   },
//   {
//     title: "Sales", icon: AdminIcon, url: "#",
//     children: [
//       { title: "Invoice ", icon: ChildrenIcon, url: "/admin/invoice" },
//       { title: "Invoice Return ", icon: ChildrenIcon, url: "/admin/invoice-return" },
//       { title: "Stock Report", icon: ChildrenIcon, url: "/admin/stock-report" },

//     ]
//   },
//   {
//     title: "Company", icon: CompanyIcon, url: "#",
//     children: [
//       { title: "Invoice ", icon: ChildrenIcon, url: "/company/invoice" },
//       { title: "Invoice Return ", icon: ChildrenIcon, url: "/company/invoice-return" },
//       { title: "Inter-Branch Transfer", icon: ChildrenIcon, url: "/company/material-transfer" },
//       { title: "Stock Report", icon: ChildrenIcon, url: "/company/stock-report" },
//     ]
//   },

// ];

// export default Menu;

import React, { useMemo } from "react"; 
import { icons } from "lucide-react"; 
import { useCurrentUser } from "@/src/permissions";

export type MenuItem = {
  title: string;
  url: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  children?: MenuItem[];
};

// export const useMenu = (): {menu:MenuItem[]; isLoading: boolean} => {
//   // const { menu } = useMenuContext();
// const { data: session,status  } = useSession();
//   const menuData = useMemo(() => {
//     const buildMenu = (items: any[]): MenuItem[] => {
//       return items.map((item: any) => ({
//         title: item.name,
//         url: item.url,
//          icon: item.icon
//       ? (icons as any)[item.icon]
//       : undefined,
//         children: item.children ? buildMenu(item.children) : [],
//       }));
//     };

//     // console.log(session?.user?.modules);
//     return buildMenu(session?.user?.modules || []);
//   }, [session?.user?.modules]);

//    return {
//     menu:menuData,
//     isLoading: status === "loading",
//   };
// };

export const useMenu = () => {
  const { data, isLoading } = useCurrentUser();

  const menu = useMemo(() => {
    if (!data?.modules) return [];

    const buildMenu = (items: any[]): MenuItem[] => {
      return items
        .sort((a, b) => a.order - b.order)
        .map((item) => ({
          title: item.name,
          url: item.url,
          icon: item.icon ? (icons as any)[item.icon] : undefined,
          children: item.children ? buildMenu(item.children) : [],
        }));
    };

    return buildMenu(data.modules);
  }, [data]);

  return { menu, isLoading };
};
