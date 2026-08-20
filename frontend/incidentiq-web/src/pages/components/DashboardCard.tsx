import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  color: string;
  icon: ReactNode;
}

export default function DashboardCard({
  title,
  value,
  color,
  icon,
}: DashboardCardProps) {
  return (
    <Card
      elevation={8}
      sx={{
        borderRadius: 4,
        height: "100%",
        background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "all .25s ease",
        cursor: "pointer",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 30px rgba(0,0,0,.45)",
          borderColor: color,
        },
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
            >
              {title}
            </Typography>

            <Typography
              variant="h3"
              fontWeight="bold"
            >
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: `${color}22`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: color,
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}