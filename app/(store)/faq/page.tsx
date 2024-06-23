import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function FAQ() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4 mt-8">FAQ</h1>
            <div className="hidden md:block w-full max-w-4xl text-left space-y-8 mt-12">
                <div>
                    <h2 className="text-xl font-semibold">What is a surprise box?</h2>
                    <p>A surprise box is a unique and exciting way to receive a mystery item from our curated selection. Each box contains one item chosen at random from the items available for that particular box. It&apos;s a fun and adventurous way to discover new products!</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold">How does it work?</h2>
                    <p>Simply choose the surprise box you want to purchase and complete the checkout process. Once your order is placed, we will randomly select one item from the box&apos;s available pool of products and ship it to you.</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold">Are the items in the surprise box of good quality?</h2>
                    <p>Absolutely! We carefully select each item to ensure it meets our quality standards. Whether it&apos;s a gadget, a piece of jewelry, or a collectible, you can be assured that every item is of excellent quality.</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold">Can I choose what&apos;s inside the box?</h2>
                    <p>The thrill of a surprise box lies in the mystery of not knowing what you&apos;ll get. Unfortunately, you cannot choose the specific item inside. However, rest assured that all items are thoughtfully selected and worth the value of the box.</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold">Is shipping free?</h2>
                    <p>Yes, shipping is completely free! We offer free worldwide shipping on all our surprise boxes, so you can enjoy your mystery item without any additional costs.</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold">How long does delivery take?</h2>
                    <p>Delivery times vary depending on your location. Typically, orders are processed within 1-3 business days and shipped thereafter. For domestic orders, expect delivery within 5-7 business days. International orders may take up to 15-20 business days.</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold">Can I return or exchange my surprise box?</h2>
                    <p>Due to the nature of the surprise box, we do not accept returns or exchanges. If there is an issue with the item you receive, such as damage during shipping, please contact our customer support team, and we will resolve the issue promptly.</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold">What if I receive a damaged or defective item?</h2>
                    <p>If your item arrives damaged or defective, please reach out to our customer support team within 7 days of receiving your order. We will be happy to assist you with a replacement or a refund.</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold">How can I contact customer support?</h2>
                    <p>You can contact our customer support team via email at support@surpriseboxstore.com or through our contact form on the website. We aim to respond to all inquiries within 24 hours.</p>
                </div>
            </div>
            <div className="block md:hidden w-full">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is a surprise box?</AccordionTrigger>
                        <AccordionContent>
                            <p>A surprise box is a unique and exciting way to receive a mystery item from our curated selection. Each box contains one item chosen at random from the items available for that particular box. It&apos;s a fun and adventurous way to discover new products!</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How does it work?</AccordionTrigger>
                        <AccordionContent>
                            <p>Simply choose the surprise box you want to purchase and complete the checkout process. Once your order is placed, we will randomly select one item from the box&apos;s available pool of products and ship it to you.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-left">Are the items in the surprise box of good quality?</AccordionTrigger>
                        <AccordionContent>
                            <p>Absolutely! We carefully select each item to ensure it meets our quality standards. Whether it&apos;s a gadget, a piece of jewelry, or a collectible, you can be assured that every item is of excellent quality.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Can I choose what&apos;s inside the box?</AccordionTrigger>
                        <AccordionContent>
                            <p>The thrill of a surprise box lies in the mystery of not knowing what you&apos;ll get. Unfortunately, you cannot choose the specific item inside. However, rest assured that all items are thoughtfully selected and worth the value of the box.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>Is shipping free?</AccordionTrigger>
                        <AccordionContent>
                            <p>Yes, shipping is completely free! We offer free worldwide shipping on all our surprise boxes, so you can enjoy your mystery item without any additional costs.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger>How long does delivery take?</AccordionTrigger>
                        <AccordionContent>
                            <p>Delivery times vary depending on your location. Typically, orders are processed within 1-3 business days and shipped thereafter. For domestic orders, expect delivery within 5-7 business days. International orders may take up to 15-20 business days.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-7">
                        <AccordionTrigger>Can I return or exchange my surprise box?</AccordionTrigger>
                        <AccordionContent>
                            <p>Due to the nature of the surprise box, we do not accept returns or exchanges. If there is an issue with the item you receive, such as damage during shipping, please contact our customer support team, and we will resolve the issue promptly.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-8">
                        <AccordionTrigger>What if I receive a damaged or defective item?</AccordionTrigger>
                        <AccordionContent>
                            <p>If your item arrives damaged or defective, please reach out to our customer support team within 7 days of receiving your order. We will be happy to assist you with a replacement or a refund.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-9">
                        <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
                        <AccordionContent>
                            <p>You can contact our customer support team via email at support@surpriseboxstore.com or through our contact form on the website. We aim to respond to all inquiries within 24 hours.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
