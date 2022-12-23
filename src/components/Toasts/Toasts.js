import { toast } from 'react-toastify';

const ToastError = () => {
    toast.error(`Hey, enter something normal`, {
          theme: "colored"
      })
}

const ToastSuccess = (total, name)  => {
    toast.success(`We find ${total} ${name} images `, {
    theme: "colored"
 })
}


export {ToastError, ToastSuccess}