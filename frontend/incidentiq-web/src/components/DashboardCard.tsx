import { Card, CardContent, Typography, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

type DashboardCardProps = {
  title: string;
  value: string | number;
  color: string;
};

export default function DashboardCard({
  title,
  value,
  color,
}: DashboardCardProps) {
  return (
    <Card
      sx={{
        background: "#1E293B",
        color: "white",
        borderRadius: 3,
        boxShadow: 4,
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1">{title}</Typography>

          <TrendingUpIcon sx={{ color }} />
        </Box>

        <Typography
          variant="h3"
          sx={{
            mt: 2,
            fontWeight: "bold",
            color,
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}