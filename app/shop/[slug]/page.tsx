import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button, Eyebrow } from "@/components/ui";
import { getProducts, optionalProductFields } from "@/lib/products";

export const dynamic = "force-dynamic";
const sectionLabels = [
  ["Product benefits", "benefits"],
  ["Recommended use", "use"],
  ["Additional features", "features"],
] as const;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = (await getProducts()).find((item) => item.slug === slug);
  if (!product) notFound();
  const fields = optionalProductFields(product);
  const tableRows = Array.from(
    { length: Math.ceil(fields.length / 2) },
    (_, index) => fields.slice(index * 2, index * 2 + 2),
  );
  return (
    <main className="inner-page shell">
      <Breadcrumbs current={product.name} />
      <div className="product-detail">
        <div className="product-detail__visual">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
              unoptimized
            />
          ) : (
            <div className="chew-illustration">
              <span>KHICHCHA</span>
            </div>
          )}
        </div>
        <div className="product-detail__copy">
          <div
            className="product-section-labels"
            aria-label="Product information sections"
          >
            {sectionLabels.map(([label, key]) => (
              <a className="product-section-label" href={`#${key}`} key={key}>
                <span
                  className={`product-section-label__icon product-section-label__icon--${key}`}
                  aria-hidden="true"
                />
                {label}
              </a>
            ))}
          </div>
          <Eyebrow>{product.size} size dog chew</Eyebrow>
          <h1>{product.name}</h1>
          <p className="inner-page__intro">{product.description}</p>
          {product.details && (
            <p className="product-detail__info">{product.details}</p>
          )}
          <p className="product-detail__info">
            Always supervise your dog while chewing. This product is for animal
            consumption only.
          </p>
          <Button
            className="product-detail__amazon"
            href={product.amazonUrl}
            external
          >
            Buy on Amazon ↗
          </Button>
        </div>
      </div>
      <section
        id="benefits"
        className="product-detail-section product-detail-section--benefits"
      />
      <section
        id="use"
        className="product-detail-section product-detail-section--use"
      />
      <section
        id="features"
        className="product-detail-section product-detail-section--features"
      />
      <section className="product-specs">
        <Eyebrow>Product information</Eyebrow>
        <table className="product-specs__table">
          <tbody>
            {tableRows.map((row, index) => (
              <tr key={index}>
                {row.map(([label, value]) => (
                  <td key={label}>
                    <strong>{label}</strong>
                    <span>{value}</span>
                  </td>
                ))}
                {row.length === 1 && <td aria-hidden="true" />}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
