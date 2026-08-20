import { Box } from "@mui/material";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        background: "#0F172A",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Navigation */}

        <TopBar />

        {/* Page */}

        <Box
          sx={{
            p: 4,
            background: "#0F172A",
            flexGrow: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}