import { Eyebrow } from "@/components/ui";

const benefits = [
  [
    "Slow chewing satisfaction",
    "A firm texture that turns snack time into a slower, more rewarding ritual.",
  ],
  [
    "Just four simple ingredients",
    "Yak and cow milk, lime juice, and a pinch of salt. That’s it.",
  ],
  [
    "No artificial colors or flavors",
    "Nothing extra. Just honest ingredients and a chew your dog can enjoy.",
  ],
];
export function BenefitsSection({ content }: { content?: string }) {
  const customBenefits = content
    ? content.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean)
    : null;

  return (
    <section className="benefits-band" id="benefits">
      <div className="shell benefits">
        <div className="benefits__heading">
          <Eyebrow>Why dogs love it</Eyebrow>
          <h2>
            Simple by nature.
            <br />
            <em>Thoughtful by design.</em>
          </h2>
        </div>
        <div className="benefits__list">
          {customBenefits
            ? customBenefits.map((title, i) => (
                <div className="benefit" key={i}>
                  <span>0{i + 1}</span>
                  <h3>{title}</h3>
                </div>
              ))
            : benefits.map(([title, description], i) => (
                <div className="benefit" key={title}>
                  <span>0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
