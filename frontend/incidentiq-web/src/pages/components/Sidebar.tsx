import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

export default function TopBar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "#0F172A",
        borderBottom: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <Toolbar>

        <Stack direction="row" spacing={2} alignItems="center">

          <MonitorHeartIcon
            sx={{
              color: "#00BCD4",
              fontSize: 34,
            }}
          />

          <Box>

            <Typography
              variant="h6"
              fontWeight="bold"
            >
              IncidentIQ AI
            </Typography>

            <Typography
              variant="caption"
              color="gray"
            >
              Healthcare Operations Intelligence Platform
            </Typography>

          </Box>

        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Chip
          label="LIVE"
          color="success"
          sx={{
            mr: 3,
            fontWeight: "bold",
          }}
        />

        <Chip
          label="127 Devices"
          color="info"
          sx={{ mr: 2 }}
        />

        <Chip
          label="3 Critical"
          color="error"
          sx={{ mr: 3 }}
        />

        <IconButton color="inherit">

          <Badge
            badgeContent={4}
            color="error"
          >
            <NotificationsIcon />
          </Badge>

        </IconButton>

        <Avatar
          sx={{
            bgcolor: "#2563EB",
            ml: 2,
            mr: 1,
          }}
        >
          <AccountCircleIcon />
        </Avatar>

        <Typography
          fontWeight="bold"
        >
          Mark Zotman
        </Typography>

      </Toolbar>
    </AppBar>
  );
}