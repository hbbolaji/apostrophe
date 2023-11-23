export type UserType = {
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  phoneNumber: string;
  contactNumber: string;
  whatsappNumber: string;
  emailAddress: string;
  gender: string;
  id: string;
  uid: string;
};

export type StudentType = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  gender: string;
  phoneNumber: string;
  contactNumber: string;
  whatsappNumber: string;
  dateOfBirth: Date;
  residence: string;
  nationality: string;
  placementTest: string;
  spokenLanguage: string;
  academicStatus: string;
  financialStatus: string;
  id: string;
  uid: string;
  role?: string;
};

export type AuthType = {
  token: string;
  currentUser: any;
  sendToken: (token: string) => void;
};

export type LoginType = {
  email: string;
  password: string;
};
