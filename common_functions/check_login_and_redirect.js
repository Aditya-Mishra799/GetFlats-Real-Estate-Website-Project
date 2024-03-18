import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSnackBar } from "@components/SnackBar/SnackBarService";
// code to redirect a user to home page if they are not logged in from a particual page
export const useCheckLoginAndRedirect = (session, status) => {
  const router = useRouter()
  const snackBar = useSnackBar()
  useEffect(()=>{
    if (!session?.user && status === "unauthenticated") {
      snackBar.open('alert', {
        label: 'Login Required!',
        message: 'Please Login to avail this feature',
        link: {
          label: 'login',
          href: '/auth'
        }
      })
      router.push("/");
    }
  }, [session])
  return null
};
