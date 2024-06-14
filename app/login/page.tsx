import CldImage from "@/components/ui/CldImage";
import LoginForm from "@/components/login/login-form";

export default function Login() {

    return (
        <div className="w-full h-screen lg:grid lg:grid-cols-2">
            <LoginForm />
            <div className="hidden bg-muted lg:block">
                <CldImage
                    src="slsx5xvcbib7rhouofab"
                    alt="Main Banner"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    height={1920}
                    width={1080}
                    sizes="100vw"
                />
            </div>
        </div>
    );
}