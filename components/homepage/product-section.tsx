import Image from "next/image";
import { Button, Eyebrow, SectionHeading } from "@/components/ui";
import type { ProductData } from "@/lib/products";

export function ProductSection({ products }: { products: ProductData[] }) {
  return (
    <section className="section shell" id="shop">
      <div className="section-intro section-intro--chew text-center">
        <Eyebrow>The chew</Eyebrow>
        <SectionHeading>Good things take a little longer.</SectionHeading>
        <p>
          Not a treat that disappears in seconds. KHICHCHA is a firm, flavorful
          chew that keeps curious mouths engaged and happy.
        </p>
      </div>
      <div className="product-grid">
        {products.map((product, index) => (
          <article
            className={`product-card ${index === 0 ? "product-card--featured" : ""}`}
            key={product.slug}
          >
            <a
              className="product-card__hit-area"
              href={`/shop/${product.slug}`}
              aria-label={`View ${product.name} product information`}
            />
            <div className="product-card__visual">
              <span className="product-card__size">{product.size}</span>
              {product.imageUrl ? (
                <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 760px) 100vw, 50vw" unoptimized />
              ) : (
                <div className="chew-illustration">
                  <span>KHICHCHA</span>
                </div>
              )}
              <span className="product-card__origin">N E P A L</span>
            </div>
            <div className="product-card__body">
              <div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
              <div className="product-card__actions">
                <Button href={product.amazonUrl} external>
                  Buy on Amazon <span>↗</span>
                </Button>
                <a
                  className="review-link"
                  href={product.amazonUrl || product.reviewUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  See reviews on Amazon
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
