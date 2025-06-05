import React, { useRef, useState, useEffect } from "react";
import { useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// ----------------------------------------------------------------------

type HorizontalScrollArrowsProps = {
  children: React.ReactNode;
  scrollAmount?: number;
};

/**
 * Affiche les flèches de défilement horizontal
 * @param children - Les éléments à afficher
 * @param scrollAmount - La quantité de défilement
 */
const HorizontalScrollArrows = ({ children, scrollAmount = 320 }: HorizontalScrollArrowsProps) => {
  const theme = useTheme();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ----------------------------------------------------------------------

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scrollBy = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  // ----------------------------------------------------------------------

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  // ----------------------------------------------------------------------

  return (
    <Box sx={{ position: "relative", width: "100%", scrollSnapType: "x mandatory" }}>
      {showLeft && (
        <IconButton
          onClick={() => scrollBy(-scrollAmount)}
          aria-label="Défiler vers la gauche"
          title="Défiler vers la gauche"
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: 0,
            zIndex: 2,
            boxShadow: 2,
            backgroundColor: alpha(theme.palette.primary.main, 0.7),
            color: theme.palette.primary.contrastText,
            "&:hover": { backgroundColor: theme.palette.primary.main },
          }}
        >
          <ChevronLeftIcon sx={{ fontSize: { xs: "medium", md: "large" } }} />
        </IconButton>
      )}

      <Box
        ref={scrollRef}
        sx={{
          overflowX: "auto",
          overflowY: "hidden",
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          gap: 3,
          px: 5,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "::-webkit-scrollbar": { display: "none" },
        }}
      >
        {children}
      </Box>

      {showRight && (
        <IconButton
          onClick={() => scrollBy(scrollAmount)}
          aria-label="Défiler vers la droite"
          title="Défiler vers la droite"
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: 0,
            zIndex: 2,
            boxShadow: 2,
            backgroundColor: alpha(theme.palette.primary.main, 0.7),
            color: theme.palette.primary.contrastText,
            "&:hover": { backgroundColor: theme.palette.primary.main },
          }}
        >
          <ChevronRightIcon sx={{ fontSize: { xs: "medium", md: "large" } }} />
        </IconButton>
      )}
    </Box>
  );
};

// ----------------------------------------------------------------------

export default HorizontalScrollArrows;
