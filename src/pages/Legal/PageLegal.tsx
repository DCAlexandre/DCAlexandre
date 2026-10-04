import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import PageContainer from "@/components/PageContainer";
import Seo from "@/components/Seo";
import { SEO_PAGES } from "@/config/seo.config";

// ----------------------------------------------------------------------

/**
 * Page légale : mentions légales + politique de confidentialité (RGPD).
 * @description Page non indexée (noIndex) ; liée depuis le footer.
 */
function PageLegal() {
  return (
    <PageContainer motionVariant="bottom-in">
      <Seo {...SEO_PAGES.legal} />

      <Typography gutterBottom variant="h3" component="h1" align="center">
        Mentions légales & confidentialité
      </Typography>

      <Divider sx={{ my: 4 }} />

      {/* ---------------------------------------------------------------- */}

      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
        Mentions légales
      </Typography>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
        Éditeur
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Le site <strong>kared-dev.fr/alexandre</strong> est édité par <strong>Alexandre Da Costa</strong>, entrepreneur
        individuel (micro-entreprise), nom commercial <strong>AlexDev</strong>, marque <strong>Kared Dev</strong>.
        <br />
        SIRET : 935 320 770 00016. TVA non applicable, article 293 B du CGI.
        <br />
        Brunoy (91), France. Adresse complète communiquée sur demande.
        <br />
        Contact : <Link href="mailto:alexandre@kared-dev.fr">alexandre@kared-dev.fr</Link>, 07 69 62 43 79.
      </Typography>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
        Directeur de la publication
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Alexandre Da Costa.
      </Typography>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
        Hébergement
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        OVH SAS, 2 rue Kellermann, 59100 Roubaix, France,{" "}
        <Link href="https://www.ovhcloud.com" target="_blank" rel="noopener">
          ovhcloud.com
        </Link>
        .
      </Typography>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
        Propriété intellectuelle
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        L'ensemble du contenu de ce site (textes, visuels, code, marque Kared Dev) est la propriété d'Alexandre Da
        Costa, sauf mention contraire. Toute reproduction ou réutilisation sans autorisation préalable est interdite.
      </Typography>

      <Divider sx={{ my: 4 }} />

      {/* ---------------------------------------------------------------- */}

      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
        Politique de confidentialité
      </Typography>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
        Responsable du traitement
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Alexandre Da Costa (coordonnées ci-dessus).
      </Typography>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
        Données collectées & finalités
      </Typography>
      <Typography variant="body2" color="text.secondary" component="div" paragraph>
        <ul>
          <li>
            <strong>Formulaire de contact</strong> : les nom, email et message que vous transmettez, uniquement pour
            répondre à votre demande.
          </li>
          <li>
            <strong>Chatbot AskAlex</strong> : les questions saisies sont envoyées à mon service d'intelligence
            artificielle pour générer une réponse. Un simple compteur d'usage est stocké dans votre navigateur
            (localStorage), sans donnée personnelle associée.
          </li>
        </ul>
      </Typography>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
        Mesure d'audience & cookies
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Ce site n'utilise <strong>aucun cookie de traçage ni outil de mesure d'audience tiers</strong>. Aucun profilage
        n'est réalisé.
      </Typography>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
        Destinataires
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Alexandre Da Costa uniquement, ainsi que ses sous-traitants techniques (hébergeur OVH, service d'IA),
        strictement pour le fonctionnement du site.
      </Typography>

      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
        Vos droits
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition sur vos
        données. Pour l'exercer : <Link href="mailto:alexandre@kared-dev.fr">alexandre@kared-dev.fr</Link>. Vous pouvez
        également introduire une réclamation auprès de la CNIL (cnil.fr).
      </Typography>

      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 3 }}>
        Dernière mise à jour : septembre 2026.
      </Typography>
    </PageContainer>
  );
}

// ----------------------------------------------------------------------

export default PageLegal;
