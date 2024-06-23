import ContactForm from "@/components/contact/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Contact Us',
};

export default function Contact() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <ContactForm />
        </div>
    )
}