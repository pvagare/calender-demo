import { toast } from 'react-toastify';

export default class Helper {

    static showToastMessage(message,isError) {
        if(isError){
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }else{
            toast.success(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }
}