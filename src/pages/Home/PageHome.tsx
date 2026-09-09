import PageContainer from "@/components/PageContainer";
import Seo from "@/components/Seo";
import { SEO_PAGES } from "@/config/seo.config";
import BoxAbout from "@/pages/Home/BoxAbout";
import BoxDescription from "@/pages/Home/BoxDescription";
import BoxStats from "@/pages/Home/BoxStats";
import BoxHowIWork from "@/pages/Home/BoxHowIWork";
import BoxRecommendations from "@/pages/Home/BoxRecommendations";

/**
 * Page d'accueil
 * @description Affiche une présentation générale
 */
function PageHome() {
  return (
    <PageContainer motionVariant="stagger-children">
      <Seo {...SEO_PAGES.home} />

      <BoxDescription />

      <BoxStats />

      <BoxAbout />

      <BoxHowIWork />

      <BoxRecommendations />
    </PageContainer>
  );
}

// ----------------------------------------------------------------------

export default PageHome;
