type ObjType = {
  [key: string]: string | number | Date | boolean;
};
export const getFormData = (obj: ObjType) => {
  const formData = new FormData();

  Object.entries(obj).forEach((result: any[]) => {
    formData.append(result[0], result[1]);
  });

  return formData;
};

export const getRemain = (portions: any[]) => {
  return portions
    .filter((inv: any) => inv.status === "unpaid")
    .reduce((acc: any, cur: any) => acc + cur.portion, 0);
};

export const getPaid = (portions: any[]) => {
  return portions
    .filter((inv: any) => inv.status === "paid")
    .reduce((acc: any, cur: any) => acc + cur.portion, 0);
};
