import React from 'react';
import Link from 'next/link';

export default function LegalPolicy() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4 mt-8">Legal Disclaimer</h1>
            <div className="w-full max-w-4xl text-left space-y-8 mt-12">
                <p>Welcome to SurpriseBoxStore.com. Please read this Legal Disclaimer carefully before using our website.</p>
                <h2 className="text-xl font-semibold">Disclaimer of Prize Liability</h2>
                <p>SurpriseBoxStore.com offers surprise boxes where customers may receive a randomly selected item as a prize. We do not assume any responsibility for the quality, condition, or suitability of the prizes received through our surprise boxes. Any prizes obtained through our service are provided without warranties or guarantees.</p>
                <h2 className="text-xl font-semibold">Website Content</h2>
                <p>All content provided on this website is for informational purposes only. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website for any purpose.</p>
                <h2 className="text-xl font-semibold">Intellectual Property</h2>
                <p>The intellectual property rights in all software and content (including photographic images) made available to you on or through this website remain the property of SurpriseBoxStore.com and are protected by copyright laws and treaties around the world. All such rights are reserved by SurpriseBoxStore.com and its licensors.</p>
                <h2 className="text-xl font-semibold">Limitation of Liability</h2>
                <p>To the fullest extent permitted by law, we shall not be liable for any direct, indirect, incidental, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to, use of, inability to access or use, or reliance on this website, or (b) any conduct or content of any third party on the website.</p>
                <h2 className="text-xl font-semibold">Modification of Agreement</h2>
                <p>We reserve the right to modify this Legal Disclaimer at any time, effective upon posting of the modified disclaimer on this website. Continued use of the website after any such changes shall constitute your consent to such changes.</p>
                <h2 className="text-xl font-semibold">Contact Us</h2>
                <p>If you have any questions about this Legal Disclaimer, please <Link href="/contact"><span className="text-blue-500 hover:underline">contact us</span></Link>.</p>
            </div>
        </div>
    );
}
