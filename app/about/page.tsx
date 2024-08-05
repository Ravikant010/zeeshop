import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-[1000px] pt-16">
      <h1 className="text-4xl font-bold text-center mb-8">About ZeeShop</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Our Fashion Vision</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            ZeeShop is your gateway to cutting-edge fashion. We curate the latest trends and timeless classics, 
            bringing you a diverse collection of clothing that expresses your unique style.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quality & Style</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We believe in offering fashion that doesn&#39;t compromise on quality. 
              Every piece in our collection is carefully selected to ensure both style and durability.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sustainable Fashion</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              ZeeShop is committed to promoting sustainable fashion. We partner with eco-friendly brands 
              and support ethical manufacturing processes.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Our Promise</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Trendsetting collections updated regularly</li>
            <li>Excellent customer service</li>
            <li>Easy returns and exchanges</li>
            <li>Secure and convenient online shopping experience</li>
          </ul>
        </CardContent>
      </Card>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to redefine your style?</h2>
        <Link href={"/"}><Button size="lg">
          Shop Now
        </Button>
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;