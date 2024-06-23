import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About',
};

export default function AboutUs() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4 mt-8">About Us</h1>
            <div className="w-full max-w-4xl text-left space-y-8 mt-12">
                <p>Welcome to SurpriseBoxStore.com, where excitement and discovery meet in every surprise box we create. Our journey began with a simple idea: to bring joy and surprise to people&apos;s lives through carefully curated mystery items.</p>
                <p>At SurpriseBoxStore.com, we believe in the magic of anticipation and the thrill of the unexpected. Each surprise box is meticulously assembled with love and creativity, ensuring that every item inside sparks delight and wonder.</p>
                <p>Founded in 2011, we have grown from a passion project into a beloved online destination for those seeking unique experiences. Our team of enthusiastic curators scours the globe for the most intriguing gadgets, exquisite jewelry pieces, and rare collectibles to include in our boxes.</p>
                <p>Our commitment to quality and customer satisfaction is at the heart of everything we do. Whether you&apos;re treating yourself or surprising a loved one, each box is crafted to deliver happiness and make memories.</p>
                <p>Join us on this adventure of discovery and joy. Let SurpriseBoxStore.com be your gateway to excitement and endless possibilities.</p>
            </div>
        </div>
    );
}
