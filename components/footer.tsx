'use client';

import { Instagram, Mail, MapPin, Twitter } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">zeeshop</h3>
            <div className="flex items-start space-x-2 text-muted-foreground">
              {/* <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
              <p></p> */}
            </div>
            <div className="text-sm text-muted-foreground">
              Your one-stop destination for quality fashion and lifestyle products.
            </div>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/find-us" className="text-muted-foreground hover:text-primary transition">
                  Find Us
                </Link>
              </li>
              <li>
                <Link href="/stories" className="text-muted-foreground hover:text-primary transition">
                  Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="https://instagram.com" 
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition"
                >
                  <Instagram className="h-5 w-5" />
                  <span>Instagram</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="https://twitter.com" 
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition"
                >
                  <Twitter className="h-5 w-5" />
                  <span>X</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="mailto:ravikantyadav435@gmail.com" 
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition"
                >
                  <Mail className="h-5 w-5" />
                  <span>Email</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-sm border rounded-md bg-background"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-6">
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} zeeshop. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;