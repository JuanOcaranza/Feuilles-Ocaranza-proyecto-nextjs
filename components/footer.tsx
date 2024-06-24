import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from "lucide-react";
import Link from 'next/link';
import { Separator } from "./ui/separator";

export default function Footer() {
    return (
        <footer className="bg-white shadow-sm mt-6">
            <Separator className="opacity-40"/>
            <div className="mx-auto max-w-7xl px-6 py-12 md:py-14 lg:px-8">
                <div className="hidden sm:block sm:divide-y sm:divide-gray-200 sm:space-y-0 sm:gap-8">
                    <div className="sm:py-8 sm:pb-0 sm:grid sm:grid-cols-5 sm:gap-8">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">Company</h3>
                            <ul role="list" className="mt-6 space-y-6">
                                <li className="text-sm">
                                    <Link href="/about" className="text-gray-500 hover:text-gray-600">About Us</Link>
                                </li>
                                <li className="text-sm">
                                    <Link href="/terms" className="text-gray-500 hover:text-gray-600">Terms & Conditions</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-12 sm:mt-0">
                            <h3 className="text-sm font-medium text-gray-900">Legal</h3>
                            <ul role="list" className="mt-6 space-y-6">
                                <li className="text-sm">
                                    <Link href="/privacy" className="text-gray-500 hover:text-gray-600">Privacy</Link>
                                </li>
                                <li className="text-sm">
                                    <Link href="/cookies" className="text-gray-500 hover:text-gray-600">Cookies</Link>
                                </li>
                                <li className="text-sm">
                                    <Link href="/legal" className="text-gray-500 hover:text-gray-600">Legal</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-12 sm:mt-0">
                            <h3 className="text-sm font-medium text-gray-900">Support</h3>
                            <ul role="list" className="mt-6 space-y-6">
                                <li className="text-sm">
                                    <Link href="/contact" className="text-gray-500 hover:text-gray-600">Contact Us</Link>
                                </li>
                                <li className="text-sm">
                                    <Link href="/faq" className="text-gray-500 hover:text-gray-600">FAQ</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-12 sm:mt-0">
                            <h3 className="text-sm font-medium text-gray-900">Links</h3>
                            <ul role="list" className="mt-6 space-y-6">
                                <li className="text-sm">
                                    <Link href="/" className="text-gray-500 hover:text-gray-600">Home</Link>
                                </li>
                                <li className="text-sm">
                                    <Link href="/products?featured=true" className="text-gray-500 hover:text-gray-600">Featured</Link>
                                </li>
                                <li className="text-sm">
                                    <Link href="/products" className="text-gray-500 hover:text-gray-600">Products</Link>
                                </li>
                                <li className="text-sm">
                                    <Link href="/products?onOffer=true" className="text-gray-500 hover:text-gray-600">Sale</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-12 sm:mt-0">
                            <h3 className="text-sm font-medium text-gray-900">Social</h3>
                            <ul role="list" className="mt-6 flex space-x-6">
                                <li className="text-sm">
                                    <Link href="https://www.facebook.com" target="_blank" aria-label="Facebook" className="text-gray-500 hover:text-gray-600"><FacebookIcon /></Link>
                                </li>
                                <li className="text-sm">
                                    <Link href="https://www.x.com" target="_blank" aria-label="Twitter" className="text-gray-500 hover:text-gray-600"><TwitterIcon /></Link>
                                </li>
                                <li className="text-sm">
                                    <Link href="https://www.instagram.com" target="_blank" aria-label="Instagram" className="text-gray-500 hover:text-gray-600"><InstagramIcon /></Link>
                                </li>
                                <li className="text-sm">
                                    <Link href="https://www.linkedin.com" target="_blank" aria-label="Linkedin" className="text-gray-500 hover:text-gray-600"><LinkedinIcon /></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="sm:hidden sm:py-8 sm:pb-0 sm:grid-cols-5 sm:gap-8">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Company</AccordionTrigger>
                            <AccordionContent>
                                <ul role="list" className="mt-2 space-y-2">
                                    <li className="text-sm">
                                        <Link href="/about" className="text-gray-500 hover:text-gray-600">About Us</Link>
                                    </li>
                                    <li className="text-sm">
                                        <Link href="/terms" className="text-gray-500 hover:text-gray-600">Terms & Conditions</Link>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Legal</AccordionTrigger>
                            <AccordionContent>
                                <ul role="list" className="mt-2 space-y-2">
                                    <li className="text-sm">
                                        <Link href="/privacy" className="text-gray-500 hover:text-gray-600">Privacy</Link>
                                    </li>
                                    <li className="text-sm">
                                        <Link href="/cookies" className="text-gray-500 hover:text-gray-600">Cookies</Link>
                                    </li>
                                    <li className="text-sm">
                                        <Link href="/legal" className="text-gray-500 hover:text-gray-600">Legal</Link>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Support</AccordionTrigger>
                            <AccordionContent>
                                <ul role="list" className="mt-2 space-y-2">
                                    <li className="text-sm">
                                        <Link href="/contact" className="text-gray-500 hover:text-gray-600">Contact Us</Link>
                                    </li>
                                    <li className="text-sm">
                                        <Link href="/faq" className="text-gray-500 hover:text-gray-600">FAQ</Link>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>Links</AccordionTrigger>
                            <AccordionContent>
                                <ul role="list" className="mt-2 space-y-2">
                                    <li className="text-sm">
                                        <Link href="/" className="text-gray-500 hover:text-gray-600">Home</Link>
                                    </li>
                                    <li className="text-sm">
                                        <Link href="/products?featured=true" className="text-gray-500 hover:text-gray-600">Featured</Link>
                                    </li>
                                    <li className="text-sm">
                                        <Link href="/products" className="text-gray-500 hover:text-gray-600">Products</Link>
                                    </li>
                                    <li className="text-sm">
                                        <Link href="/products?onOffer=true" className="text-gray-500 hover:text-gray-600">Sale</Link>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Social</AccordionTrigger>
                            <AccordionContent>
                                <ul role="list" className="mt-2 space-y-2">
                                    <li className="text-sm">
                                        <Link href="https://www.facebook.com" target="_blank" aria-label="Facebook" className="text-gray-500 hover:text-gray-600">Facebook</Link>
                                    </li>
                                    <li className="text-sm">
                                        <Link href="https://www.x.com" target="_blank" aria-label="Twitter" className="text-gray-500 hover:text-gray-600">Twitter</Link>
                                    </li>
                                    <li className="text-sm">
                                        <Link href="https://www.instagram.com" target="_blank" aria-label="Instagram" className="text-gray-500 hover:text-gray-600">Instagram</Link>
                                    </li>
                                    <li className="text-sm">
                                        <Link href="https://www.linkedin.com" target="_blank" aria-label="Linkedin" className="text-gray-500 hover:text-gray-600">LinkedIn</Link>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </footer>
    );
}
