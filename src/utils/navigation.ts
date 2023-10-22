export type NavItemType = {
  title: string;
  nav: string;
  icon: any;
};

export type NavType = {
  name: string;
  data: NavItemType[];
};

const user: NavItemType[] = [
  { title: "Sales", icon: "", nav: "/dashboard/sales" },
  { title: "Students", icon: "", nav: "/dashboard/students" },
];

const invoice: NavItemType[] = [
  { title: "Invoices", icon: "<GrMenu />", nav: "/dashboard/invoice" },
  { title: "Template ", icon: "", nav: "/dashboard/template" },
];

const payment: NavItemType[] = [
  { title: "Payments", icon: "", nav: "/dashboard/payment" },
  { title: "Plans", icon: "", nav: "/dashboard/plan" },
  { title: "Discount ", icon: "", nav: "/dashboard/discount" },
];

const others: NavItemType[] = [
  { title: "Courses", icon: "", nav: "/dashboard/courses" },
  { title: "Guardian", icon: "", nav: "/dashboard/guardian" },
];

const navigation: NavType[] = [
  { name: "User", data: user },
  { name: "Invoices", data: invoice },
  { name: "Payments", data: payment },
  { name: "Others", data: others },
];
export default navigation;
