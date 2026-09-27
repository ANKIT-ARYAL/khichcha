import { Eyebrow } from "@/components/ui";

const ingredients = [["Yak milk", "Rich, traditional, and sourced from the Himalayan region."], ["Cow milk", "Blended for a familiar, nourishing base."], ["Lime juice", "Used to naturally curdle and shape the cheese."], ["A pinch of salt", "Just enough to bring it all together."]];
export function IngredientsSection() { return <section className="ingredients-band" id="ingredients"><div className="shell ingredients"><div><Eyebrow>What’s inside</Eyebrow><h2>Nothing to hide.<br /><em>Nothing to add.</em></h2></div><div className="ingredient-list">{ingredients.map(([title, description], i) => <div className="ingredient" key={title}><span>0{i + 1}</span><strong>{title}</strong><small>{description}</small></div>)}</div></div></section>; }
