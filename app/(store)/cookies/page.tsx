import React from 'react';
import Link from 'next/link';

export default function CookiesPolicy() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4 mt-8">Cookies Policy</h1>
            <div className="w-full max-w-4xl text-left space-y-8 mt-12">
                <p>Welcome to SurpriseBoxStore.com. This website uses cookies to enhance your browsing experience and provide personalized content and advertisements. By using our website, you consent to the use of cookies in accordance with this policy.</p>
                <h2 className="text-xl font-semibold">What Are Cookies?</h2>
                <p>Cookies are small text files that are stored on your device when you visit a website. They allow the website to recognize your device and store information about your preferences or past actions.</p>
                <h2 className="text-xl font-semibold">How We Use Cookies</h2>
                <p>We use cookies for various purposes, including:</p>
                <ul className="list-disc pl-6">
                    <li><strong>Essential Cookies:</strong> These cookies are necessary for the operation of our website. They enable basic functions such as page navigation and access to secure areas of the website.</li>
                    <li><strong>Analytics Cookies:</strong> We use analytics cookies to understand how visitors interact with our website, which helps us improve its performance and usability.</li>
                    <li><strong>Personalization Cookies:</strong> These cookies allow us to remember your preferences and personalize your browsing experience, such as language settings or shopping cart contents.</li>
                    <li><strong>Advertising Cookies:</strong> We partner with third-party advertising networks that may use cookies to deliver relevant advertisements to you based on your interests both on our website and other websites.</li>
                </ul>
                <h2 className="text-xl font-semibold">Your Cookie Choices</h2>
                <p>You can manage your cookie preferences by adjusting your browser settings to block or delete cookies. However, please note that blocking cookies may affect your experience on our website, and some features may not function properly.</p>
                <h2 className="text-xl font-semibold">Changes to This Policy</h2>
                <p>We may update this Cookies Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically for any updates.</p>
                <h2 className="text-xl font-semibold">Contact Us</h2>
                <p>If you have any questions or concerns about our use of cookies or this Cookies Policy, please <Link href="/contact"><span className="text-blue-500 hover:underline">contact us</span></Link>.</p>
            </div>
        </div>
    );
}
