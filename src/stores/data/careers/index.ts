import { Career } from "@/stores/types/careers.types";
import assetLogoKaredDev from "/assets/career/logo_kared_dev.jpg";
import assetLogoComete from "/assets/career/logo_comete.jpg";
import assetLogoAexae from "/assets/career/logo_aexae.jpg";
import assetLogoInsta from "/assets/career/logo_insta.jpg";
import assetLogoUniversiteEvry from "/assets/career/logo_universite_evry.jpg";
import assetLogoGuestWhat from "/assets/career/logo_guestwhat.jpg";

// ----------------------------------------------------------------------

const data: Career[] = [
  {
    title: "Entrepreneur indépendant",
    subtitle: "Kared Dev",
    date: "2024-12-01",
    color: "primary",
    variant: "filled",
    img: assetLogoKaredDev,
  },
  {
    title: "Lead developer",
    subtitle: "Logiciel Comète",
    date: "2020-01-01",
    color: "primary",
    variant: "filled",
    img: assetLogoComete,
  },
  {
    title: "Software Engineer",
    subtitle: "Aexae",
    date: "2017-07-01",
    color: "primary",
    variant: "outlined",
    img: assetLogoAexae,
  },
  {
    title: "Développeur en alternance",
    subtitle: "Aexae",
    date: "2016-10-09",
    color: "secondary",
    variant: "filled",
    img: assetLogoAexae,
  },
  {
    title: "Développeur en alternance",
    subtitle: "GuestWhat",
    date: "2016-05-01",
    color: "secondary",
    variant: "filled",
    img: assetLogoGuestWhat,
  },
  {
    title: "Formation - BTS SIO",
    subtitle: "INSTA",
    date: "2015-09-01",
    color: "secondary",
    variant: "outlined",
    img: assetLogoInsta,
  },
  {
    title: "Licence informatique",
    subtitle: "Université Évry Paris-Saclay",
    date: "2013-09-01",
    color: "secondary",
    variant: "outlined",
    img: assetLogoUniversiteEvry,
  },
];

// ----------------------------------------------------------------------

export default data;
