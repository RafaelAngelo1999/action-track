import { toast } from "react-toastify";

class ToastService {
  success(message: string) {
    toast.success(message);
  }

  error(message: string) {
    toast.error(message);
  }
}

export default new ToastService();
