
import Hero from '@/components/Hero';
import FeaturedRecipes from '@/components/FeaturedRecipes';
import SeasonalCategories from '@/components/SeasonalCategories';
import IngredientSpotlight from '@/components/IngredientSpotlight';
import CallToAction from '@/components/CallToAction';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedRecipes />
      <SeasonalCategories />
      <IngredientSpotlight />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
