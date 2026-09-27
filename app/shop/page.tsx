import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button, Eyebrow } from "@/components/ui";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getProducts();
  return <main className="inner-page shell"><Breadcrumbs current="Products" /><Eyebrow>KHICHCHA</Eyebrow><h1>Find the right chew<br /><em>for your best friend.</em></h1><p className="inner-page__intro">A Himalayan yak milk cheese dog chew, handcrafted in Nepal and made for a slower, more satisfying chew.</p><div className="product-grid">{products.map((product) => <article className="product-card" key={product.slug}><a className="product-card__hit-area" href={`/shop/${product.slug}`} aria-label={`View ${product.name} product information`} /><div className="product-card__visual">{product.imageUrl ? <img src={product.imageUrl} alt={product.name} /> : <div className="chew-illustration"><span>KHICHCHA</span></div>}<span className="product-card__origin">{product.size.toUpperCase()} · NEPAL</span></div><div className="product-card__body"><div className="product-card__copy"><h2>{product.name}</h2><p>{product.description}</p></div><div className="product-card__actions"><Button href={`/shop/${product.slug}`}>Product information</Button><Button href={product.amazonUrl} external>Buy on Amazon ↗</Button></div></div></article>)}</div></main>;
}
