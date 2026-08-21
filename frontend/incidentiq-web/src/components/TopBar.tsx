import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export default function TopBar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "#0F172A",
        borderBottom: "1px solid #334155",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            flexGrow: 1,
          }}
        >
          Healthcare Operations Center
        </Typography>

        <Box>
          <Typography variant="body2" sx={{ color: "#94A3B8" }}>
            Simulation Environment
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
