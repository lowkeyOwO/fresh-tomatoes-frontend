import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
export default function Logout() {
    const router = useRouter();
    deleteCookie("fresh_tomatoes_auth_token");
    router.replace("/");
};
