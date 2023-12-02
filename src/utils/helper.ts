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
