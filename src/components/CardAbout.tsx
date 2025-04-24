import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";

// ----------------------------------------------------------------------

type CardAboutProps = {
  color: string;
  Icon: React.ElementType;
  children: React.ReactNode;
};

/**
 * Affiche une carte avec une icône et un texte
 */
const CardAbout = ({ color, Icon, children }: CardAboutProps) => {
  const styleCard = {
    borderLeft: "4px solid",
    borderColor: color,
    transition: "transform 0.3s",
    "&:hover": { transform: "translateY(-5px)" }
  };

  // ----------------------------------------------------------------------

  return (
    <Card elevation={3} sx={styleCard}>
      <CardContent sx={{ display: "flex", alignItems: "center", p: 2, gap: 2 }}>
        <Icon sx={{ color, margin: "auto" }} fontSize="large" />

        <Stack spacing={1} sx={{ userSelect: "none" }}>
          {children}
        </Stack>
      </CardContent>
    </Card>
  );
};

// ----------------------------------------------------------------------

export default CardAbout;
