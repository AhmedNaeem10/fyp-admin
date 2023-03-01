import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const getAllSlots = async () => {
  const res = await axios.get(`${BASE_URL}/get/all/slots`);
  return res;
};

export const getAllVenues = async () => {
  const res = await axios.get(`${BASE_URL}/get/all/venue`);
  return res;
};

export const sendFile = async (formData, toastId, toast) => {
  const res = await axios.post(`${BASE_URL}/add/timetable`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (p) => {
      const progress = p.loaded / p.total;

      if (toastId.current === null) {
        toastId.current = toast.info(
          `Uploading ${Math.round(progress * 100, 0)}%`,
          { progress }
        );
      } else {
        toast.update(toastId.current, {
          render: () => <>Uploading {Math.round(progress * 100, 0)}%</>,
          progress,
        });
      }
    },
  });
  return res;
};

export const addFaculty = async (formData, toastId, toast) => {
  const res = await axios.post(`${BASE_URL}/add/faculty`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (p) => {
      const progress = p.loaded / p.total;

      if (toastId.current === null) {
        toastId.current = toast.info(
          `Uploading ${Math.round(progress * 100, 0)}%`,
          { progress }
        );
      } else {
        toast.update(toastId.current, {
          render: () => <>Uploading {Math.round(progress * 100, 0)}%</>,
          progress,
        });
      }
    },
  });
  return res;
};

export const getSummary = async (date) => {
  const res = await axios.get(`${BASE_URL}/summary/faculty/${date}`);
  return res;
};

export const uploadVideo = async (formData, toastId, toast) => {
  const res = await axios.post(`${BASE_URL}/files`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (p) => {
      const progress = p.loaded / p.total;

      if (toastId.current === null) {
        toastId.current = toast.info(
          `Uploading ${Math.round(progress * 100, 0)}%`,
          { progress }
        );
      } else {
        toast.update(toastId.current, {
          render: () => <>Uploading {Math.round(progress * 100, 0)}%</>,
          progress,
        });
      }
    },
  });
  return res;
};
