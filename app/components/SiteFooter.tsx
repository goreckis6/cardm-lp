import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer" data-surface="dark">
      <div className="shell">
        <div className="footer-main">
          <div className="footer-brand">
            <Link className="wordmark wordmark-footer" href="/">
              <Image
                src="/brand/app-icon-128.png"
                alt=""
                width={52}
                height={52}
              />
              <span>Cardiom</span>
            </Link>
            <p>
              Personal wellness context,
              <br />
              made beautifully clear.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <strong>Legal</strong>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of use</Link>
            </div>
            <div>
              <strong>Company</strong>
              <Link href="/blog">Blog</Link>
              <Link href="/support">Support</Link>
            </div>
            <div>
              <strong>Product</strong>
              <Link href="/#features">Features</Link>
              <Link href="/#how-it-works">How it works</Link>
              <Link href="/#pricing">Pricing</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Cardiom. All rights reserved.</span>
          <span>Designed for calmer health awareness.</span>
        </div>
      </div>
    </footer>
  );
}
