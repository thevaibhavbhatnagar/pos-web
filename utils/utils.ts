import { FC, SVGProps } from "react";

type IconType = FC<SVGProps<SVGSVGElement>>;

type SidebarChild = {
  title: string;
  url: string;
  icon?: IconType;
  children?: SidebarChild[];
};

type SidebarItemType = {
  title: string;
  icon?: IconType;
  url: string;
  children?: SidebarChild[];
};

// export function matchPath(template: string, pathname: string) {
//   const templateSegments = template.split("/").filter(Boolean);
//   const pathSegments = pathname.split("/").filter(Boolean);

//   if (templateSegments.length > pathSegments.length) return false;

//   return templateSegments.every((seg, i) => seg.startsWith("[") || seg === pathSegments[i]);
// }


export function matchPath(template?: string, pathname?: string) {
  if (!template || !pathname) return false;

  const templateSegments = template.split("/").filter(Boolean);
  const pathSegments = pathname.split("/").filter(Boolean);

  if (templateSegments.length > pathSegments.length) return false;

  return templateSegments.every((seg, i) => seg === pathSegments[i]);
}

export function findActivePath(
  items: SidebarItemType[] | SidebarChild[],
  pathname: string,
  path: string[] = []
): string[] | null {
  for (const item of items) {
    if (matchPath(item.url, pathname)) return [...path, item.title];
    if (item.children) {
      const childPath = findActivePath(item.children, pathname, [...path, item.title]);
      if (childPath) return childPath;
    }
  }
  return null;
}
