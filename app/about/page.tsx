import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, PackageCheck, RefreshCw, Users } from 'lucide-react';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/api/placeholder/1920/600" 
            alt="Fashion banner" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About ZeeShop</h1>
          <p className="text-xl md:text-2xl max-w-2xl">
            Redefining fashion with purpose, style, and sustainability
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="border-none shadow-xl bg-white/50 backdrop-blur">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Fashion Vision</h2>
            <p className="text-lg text-center max-w-3xl mx-auto leading-relaxed">
              ZeeShop is more than just a fashion destination – we're a movement towards 
              mindful, expressive style. Our carefully curated collections blend contemporary 
              trends with timeless elegance, empowering you to discover and embrace your 
              unique fashion identity.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Values Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <PackageCheck className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                Every piece is carefully selected to ensure exceptional quality and longevity
              </p>
            </CardContent>
          </Card>

          <Card className="transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <Leaf className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-semibold mb-3">Sustainable Fashion</h3>
              <p className="text-gray-600">
                Committed to eco-friendly practices and ethical manufacturing
              </p>
            </CardContent>
          </Card>

          <Card className="transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <RefreshCw className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-xl font-semibold mb-3">Regular Updates</h3>
              <p className="text-gray-600">
                Fresh collections and trending styles added every week
              </p>
            </CardContent>
          </Card>

          <Card className="transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <h3 className="text-xl font-semibold mb-3">Customer First</h3>
              <p className="text-gray-600">
                Dedicated support team and hassle-free returns policy
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Redefine Your Style?</h2>
        <Link href="/">
          <Button size="lg" className="group">
            Shop Now
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;