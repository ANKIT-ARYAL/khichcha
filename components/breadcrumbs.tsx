import Link from "next/link";

export function Breadcrumbs({ current, parent }: { current: string; parent?: { label: string; href: string } }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      <span aria-hidden="true">›</span>
      {parent && <><Link href={parent.href}>{parent.label}</Link><span aria-hidden="true">›</span></>}
      <span aria-current="page">{current}</span>
    </nav>
  );
}
