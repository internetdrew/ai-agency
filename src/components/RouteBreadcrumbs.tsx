import React from "react";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Link, useLocation } from "react-router";

const RouteBreadcrumbs = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const pathnames = pathname.split("/").filter((item) => item);

  console.log(pathnames);

  const breadcrumbs = [
    { name: "Home", href: "/" },
    ...pathnames.map((name, index) => {
      const href = `/${pathnames.slice(0, index + 1).join("/")}`;
      const displayName = name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return { name: displayName, href };
    }),
  ];

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
            <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage>
                  <Link to={crumb.href}>{crumb.name}</Link>
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={crumb.href}>{crumb.name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default RouteBreadcrumbs;
