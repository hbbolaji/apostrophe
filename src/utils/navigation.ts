export type NavItemType = {
  title: string;
  nav: string;
  role?: string;
};

export type NavType = {
  name: string;
  data: NavItemType[];
};

const user: NavItemType[] = [
  { title: "Sales", nav: "/dashboard/sales", role: "admin" },
  { title: "Students", nav: "/dashboard/students", role: "admin" },
];

const userSales: NavItemType[] = [
  { title: "Profile", nav: "/dashboard/me", role: "sales" },
];

const invoice: NavItemType[] = [
  { title: "Invoices", nav: "/dashboard/invoices", role: "admin" },
  { title: "Templates", nav: "/dashboard/templates", role: "both" },
];

const payment: NavItemType[] = [
  { title: "Payments", nav: "/dashboard/payments", role: "both" },
  { title: "Plans", nav: "/dashboard/plans", role: "admin" },
  { title: "Discounts", nav: "/dashboard/discounts", role: "admin" },
];

const others: NavItemType[] = [
  { title: "Courses", nav: "/dashboard/courses", role: "admin" },
  { title: "Guardians", nav: "/dashboard/guardians", role: "admin" },
];

const navigation = () => {
  return [
    // { name: "Admin", data: user },
    // { name: "My Profile", data: userSales },
    // { name: "Invoice", data: invoice },
    // { name: "Payment", data: payment },
    // { name: "Other", data: others },
    ...user,
    ...userSales,
    ...invoice,
    ...payment,
    ...others,
  ];
};
export default navigation;
