import deepmerge from "@mui/utils/deepmerge";
import Box, { BoxProps } from "@mui/material/Box";
import Chip, { ChipProps } from "@mui/material/Chip";

// ----------------------------------------------------------------------

type Data = {
  name: string;
  color: string;
};

type ChipListProps = {
  data: Data[];
  size?: "small" | "medium";
  maxItems?: number | typeof Infinity;
  slotProps?: {
    box?: BoxProps;
    chip?: ChipProps;
  };
};

/**
 * Liste de Chip
 * @param data - Les données à afficher
 * @param ChipProps - Les props du Chip
 */
function ChipList({ data, maxItems = Infinity, size = "small", slotProps }: ChipListProps) {
  const boxProps = deepmerge(slotProps?.box || {}, {
    sx: { display: "flex", flexWrap: "wrap", gap: 0.8 },
  });

  const chipProps = deepmerge(slotProps?.chip || {}, {
    sx: {
      borderRadius: 8,
      fontSize: "0.7rem",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        transform: "translateY(-1px)",
      },
    },
  });

  // ----------------------------------------------------------------------

  return (
    <Box {...boxProps}>
      {data.slice(0, maxItems).map((item, idx) => (
        <Chip
          key={idx}
          label={item.name}
          size={size}
          {...chipProps}
          sx={{
            ...chipProps?.sx,
            color: item.color,
            bgcolor: `${item.color}10`,
            borderColor: item.color,
            boxShadow: `0 0 0 1px ${item.color}40`,
          }}
        />
      ))}

      {maxItems !== Infinity && data.length > maxItems && (
        <Chip
          label={`+${data.length - maxItems}`}
          size={size}
          sx={{
            bgcolor: "grey.400",
            color: "grey.800",
            fontSize: "0.7rem",
          }}
        />
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

export default ChipList;
