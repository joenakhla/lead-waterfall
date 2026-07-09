import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PipelineSimulator from '@/components/PipelineSimulator';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <PipelineSimulator />
      <LeadCaptureForm />
      <Pricing />
      <Footer />
    </main>
  );
}
