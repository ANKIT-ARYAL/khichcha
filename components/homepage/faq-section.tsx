import { Eyebrow } from "@/components/ui";
import { faqs } from "@/lib/content";

export function FaqSection() { return <section className="faq-section shell" id="faq"><div><Eyebrow>Good to know</Eyebrow><h2>Questions,<br /><em>answered.</em></h2><a className="text-link" href="mailto:info.aathmandu@gmail.com">Still curious? Write to us ↗</a></div><div className="faq-list">{faqs.map((faq, i) => <details key={faq.question} open={i === 0}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div></section>; }
