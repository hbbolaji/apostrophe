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
  return [...user, ...userSales, ...invoice, ...payment, ...others];
};
export default navigation;
