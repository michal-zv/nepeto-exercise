import toast from "react-hot-toast";

export const handleErrorToast = (error) => {
  console.log(error);

  toast.error(
    error?.response?.data?.error ?? error?.message ?? "An error occurred"
  );
};
