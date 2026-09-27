import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Eyebrow } from "@/components/ui";

const faqs = [["What is KHICHCHA made from?", "KHICHCHA is made from yak milk, cow milk, lime juice, and a pinch of salt. No artificial colors or flavors."], ["Which size is right for my dog?", "Choose the size that matches your dog’s size and chewing style. Always supervise your dog while chewing."], ["Where can I buy KHICHCHA?", "KHICHCHA is available through our Amazon product listings."], ["Where is KHICHCHA made?", "KHICHCHA is handcrafted in Nepal using a time-honored chhurpi-style recipe."]];

export default function FaqPage() {
  return <main className="inner-page shell"><Breadcrumbs current="FAQ" /><Eyebrow>Good to know</Eyebrow><h1>Questions,<br /><em>answered.</em></h1><div className="faq-page__layout"><div><div className="faq-list inner-page__faq">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div><p className="inner-page__contact">Still curious? <a className="text-link" href="mailto:info.aathmandu@gmail.com">info.aathmandu@gmail.com ↗</a></p></div><Image className="inner-page__image inner-page__image--faq" src="/faq-himalayan.png" alt="A dog resting beside a Himalayan cheese chew" width={1024} height={1536} /></div></main>;
}
