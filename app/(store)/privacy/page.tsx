import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4 mt-8">Privacy Policy</h1>
            <div className="w-full max-w-4xl text-left space-y-8 mt-12">
                <p>Welcome to SurpriseBoxStore.com. We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines the types of information we collect, how we use it, and the measures we take to ensure your information is secure.</p>
                <h2 className="text-xl font-semibold">Information We Collect</h2>
                <ol className="list-decimal pl-6">
                    <li><strong>Personal Information:</strong> When you create an account, make a purchase, or contact our customer support, we may collect personal information such as your name, email address, phone number, shipping address, and payment details.</li>
                    <li><strong>Non-Personal Information:</strong> We also collect non-personal information that does not directly identify you, including your browser type, device information, IP address, and browsing behavior on our website.</li>
                    <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can manage your cookie preferences through your browser settings.</li>
                </ol>
                <h2 className="text-xl font-semibold">How We Use Your Information</h2>
                <ul className="list-disc pl-6">
                    <li><strong>Order Processing and Fulfillment:</strong> Your personal information is used to process and fulfill your orders, provide customer support, and communicate with you about your purchases.</li>
                    <li><strong>Personalization:</strong> We use your information to personalize your experience on our website, including showing you products and offers that match your interests.</li>
                    <li><strong>Marketing and Promotions:</strong> With your consent, we may send you promotional emails about new products, special offers, and other updates. You can opt-out of these communications at any time by following the unsubscribe link in the email.</li>
                    <li><strong>Improving Our Services:</strong> We analyze the information we collect to improve our website, products, and services, as well as to conduct research and analysis.</li>
                </ul>
                {/* Add more sections as needed */}
                <h2 className="text-xl font-semibold">Sharing Your Information</h2>
                <p>We may share your information with third-party service providers who assist us in operating our website, processing payments, fulfilling orders, and delivering services. These providers are contractually obligated to protect your information and use it only for the purposes specified by us.</p>
                <h2 className="text-xl font-semibold">Security Measures</h2>
                <p>We implement a variety of security measures to protect your personal information, including encryption, access controls, and regular security audits.</p>
                <h2 className="text-xl font-semibold">Your Rights</h2>
                <ul className="list-disc pl-6">
                    <li><strong>Access and Correction:</strong> You have the right to access and update your personal information. You can do this by logging into your account or contacting our customer support team.</li>
                    <li><strong>Data Portability:</strong> You have the right to request a copy of the personal information we hold about you in a structured, commonly used, and machine-readable format.</li>
                    <li><strong>Deletion:</strong> You have the right to request the deletion of your personal information, subject to certain legal exceptions. To request deletion, please contact our customer support team.</li>
                    <li><strong>Withdrawal of Consent:</strong> If you have given consent for us to use your personal information, you have the right to withdraw that consent at any time.</li>
                </ul>
                <h2 className="text-xl font-semibold">Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes by posting the new policy on our website and updating the effective date at the top of this page.</p>
                <h2 className="text-xl font-semibold">Contact Us</h2>
                <p>If you have any questions or concerns about our Privacy Policy or the handling of your personal information, please <Link href="/contact"><span className="text-blue-500 hover:underline">contact us</span></Link>.</p>
            </div>
        </div>
    );
}
