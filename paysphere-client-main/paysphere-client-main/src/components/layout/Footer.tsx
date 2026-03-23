import { Link } from "react-router";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Facebook, Twitter } from "lucide-react";
import Logo from "@/assets/icons/Logo";
import { useUserInfoQuery } from "@/redux/features/auth/auth";

export default function Footer() {
  const { data } = useUserInfoQuery();
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="space-y-3">
            <Logo />
            <p className="text-sm text-muted-foreground">
              A modern digital wallet for everyone.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-2xl"
                asChild
              >
                <Link
                  to="https://facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-2xl"
                asChild
              >
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Middle Section */}
          <nav className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <div className="font-medium mb-3">Product</div>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link to="/features" onClick={() => window.scrollTo(0, 0)}>
                    Features
                  </Link>
                </li>
                <li>
                  {!data ? (
                    <Link to="/pricing" onClick={() => window.scrollTo(0, 0)}>
                      Pricing
                    </Link>
                  ) : (
                    <Link to={`/${data.role}/wallet`} onClick={() => window.scrollTo(0, 0)}>
                      Wallet
                    </Link>
                  )}
                </li>
                <li>
                  <Link to="/faq" onClick={() => window.scrollTo(0, 0)}>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-medium mb-3">Company</div>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Right Section (Contact + Quick Links) */}
          <div className="text-sm space-y-3">
            <div className="space-y-2">
              <div className="font-medium mb-2">Contact Us</div>
              <p className="text-muted-foreground">support@paysphere.com</p>
              <p className="text-muted-foreground">+880 1234-567890</p>
              <p className="text-muted-foreground">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <Separator className="my-6" />
        <div className="text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} PaySphere. All rights reserved.
          </span>
          <div className="flex gap-4">
            <Link to="/privacy" onClick={() => window.scrollTo(0, 0)}>
              Privacy
            </Link>
            <Link to="/terms" onClick={() => window.scrollTo(0, 0)}>
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
