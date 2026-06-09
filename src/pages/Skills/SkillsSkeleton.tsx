import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

/**
 * Placeholder animé des catégories de compétences pendant le chargement
 */
function SkillsSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, categoryIdx) => (
        <Box key={categoryIdx} sx={{ mt: 4 }}>
          <Skeleton variant="text" width={180} height={36} sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            {Array.from({ length: 6 }).map((_, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Skeleton variant="text" width="45%" />
                    <Skeleton variant="text" width={60} />
                  </Box>

                  <Skeleton variant="rounded" height={6} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </>
  );
}

// ----------------------------------------------------------------------

export default SkillsSkeleton;
