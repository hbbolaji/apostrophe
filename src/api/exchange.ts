import axios from "axios";

const options = {
  method: "GET",
  url: `${process.env.REACT_APP_API_URL}/latest.json`,
  params: {
    app_id: process.env.REACT_APP_APP_ID,
    prettyprint: "false",
    show_alternative: "false",
  },
  headers: { accept: "application/json" },
};

export const getExchangeRate = async () => {
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    return error;
  }
};
