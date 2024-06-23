import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms & Conditions',
};

export default function TermsAndConditions() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold mb-6 mt-8 text-center">Terms & Conditions</h1>
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden mb-8 mt-2">
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">Introduction</h2>
                    <p className="text-gray-700">
                        Welcome to SurpriseBoxStore.com. These terms and conditions outline the rules and regulations for the use of our website and the purchase of our surprise boxes. By accessing this website and/or purchasing our products, you agree to accept and comply with these terms and conditions.
                    </p>
                </div>
                <div className="p-6 border-t border-gray-200">
                    <h2 className="text-xl font-semibold mb-2">Intellectual Property</h2>
                    <p className="text-gray-700">
                        The content, trademarks, logos, and intellectual property displayed on this website are the property of SurpriseBoxStore.com. You may not use, reproduce, or distribute any of our intellectual property without prior written consent.
                    </p>
                </div>
                <div className="p-6 border-t border-gray-200">
                    <h2 className="text-xl font-semibold mb-2">Products and Orders</h2>
                    <p className="text-gray-700">
                        All purchases made through SurpriseBoxStore.com are subject to product availability. We reserve the right to refuse or cancel orders at our discretion, including if a product is listed at an incorrect price or if we suspect fraudulent activity.
                    </p>
                </div>
                <div className="p-6 border-t border-gray-200">
                    <h2 className="text-xl font-semibold mb-2">Shipping and Delivery</h2>
                    <p className="text-gray-700">
                        We offer free shipping worldwide on all surprise box orders. Delivery times may vary depending on your location. We are not responsible for delays in delivery caused by unforeseen circumstances or third-party shipping carriers.
                    </p>
                </div>
                <div className="p-6 border-t border-gray-200">
                    <h2 className="text-xl font-semibold mb-2">Returns and Refunds</h2>
                    <p className="text-gray-700">
                        Due to the nature of our surprise boxes, we do not accept returns or exchanges unless the item received is damaged or defective. Please contact our customer support team within 7 days of receiving your order to request a replacement or refund.
                    </p>
                </div>
                <div className="p-6 border-t border-gray-200">
                    <h2 className="text-xl font-semibold mb-2">Modification of Terms</h2>
                    <p className="text-gray-700">
                        SurpriseBoxStore.com reserves the right to update or modify these terms and conditions at any time without prior notice. It is your responsibility to check this page periodically for changes. Your continued use of the website following the posting of any changes constitutes acceptance of those changes.
                    </p>
                </div>
                <div className="p-6 border-t border-gray-200 flex justify-end">
                    <p className="text-gray-700">
                        For any questions regarding these terms and conditions, please <Link href="/contact"><span className="text-blue-500 hover:underline">contact us</span></Link>.
                    </p>
                </div>
            </div>
        </div>
    );
}
