export type NavItemType = {
  title: string;
  nav: string;
};

export type NavType = {
  name: string;
  data: NavItemType[];
};

const user: NavItemType[] = [
  { title: "Sales", nav: "/dashboard/sales" },
  { title: "Students", nav: "/dashboard/students" },
];

const invoice: NavItemType[] = [
  { title: "Invoices", nav: "/dashboard/invoices" },
  { title: "Templates", nav: "/dashboard/templates" },
];

const payment: NavItemType[] = [
  { title: "Payments", nav: "/dashboard/payments" },
  { title: "Plans", nav: "/dashboard/plans" },
  { title: "Discounts", nav: "/dashboard/discounts" },
];

const others: NavItemType[] = [
  { title: "Courses", nav: "/dashboard/courses" },
  { title: "Guardians", nav: "/dashboard/guardians" },
];

const navigation: NavType[] = [
  { name: "User", data: user },
  { name: "Invoice", data: invoice },
  { name: "Payment", data: payment },
  { name: "Other", data: others },
];
export default navigation;
