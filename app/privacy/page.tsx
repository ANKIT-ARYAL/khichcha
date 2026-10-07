import { Breadcrumbs } from "@/components/breadcrumbs";

export default function PrivacyPage() {
  return (
    <main className="policy-page shell">
      <Breadcrumbs current="Privacy" />
      <span className="eyebrow">Aathmandu Inc.</span>
      <h1>Privacy policy</h1>
      <p>
        Aathmandu Inc. (“we,” “us”) operates aathmandu.com. This policy explains
        what information we collect and how we use it.
      </p>
      <h2>Information we collect</h2>
      <p>
        When you contact us, we collect the information you provide, such as
        your name, email address, and message. Our hosting provider may also
        automatically collect basic technical data, such as your IP address,
        browser type, and pages visited.
      </p>
      <h2>How we use it</h2>
      <p>
        We use your information to respond to inquiries and to maintain and
        improve our website. We do not sell your personal information.
      </p>
      <h2>Sharing and purchases</h2>
      <p>
        We share information only with service providers who help us run the
        website, or when required by law. We do not sell products directly on
        this site. Purchases made through Amazon are governed by Amazon’s
        privacy policy.
      </p>
      <h2>Cookies</h2>
      <p>
        Our website may use cookies for basic functionality and analytics. You
        can disable cookies in your browser settings.
      </p>
      <h2>Contact</h2>
      <p>Aathmandu Inc.<br />info.aathmandu@gmail.com</p>
    </main>
  );
}
