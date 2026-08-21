import { Box, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DevicesIcon from "@mui/icons-material/Devices";
import WarningIcon from "@mui/icons-material/Warning";
import SmartToyIcon from "@mui/icons-material/SmartToy";

export default function Sidebar() {
  return (
    <Box
      component="aside"
      sx={{
        width: 240,
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        p: 2,
        flexShrink: 0,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          mb: 4,
          px: 1,
        }}
      >
        IncidentIQ AI
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DashboardIcon />
          <Typography>Dashboard</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DevicesIcon />
          <Typography>Medical Devices</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningIcon />
          <Typography>Incidents</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SmartToyIcon />
          <Typography>AI Assistant</Typography>
        </Box>
      </Box>
    </Box>
  );
}
