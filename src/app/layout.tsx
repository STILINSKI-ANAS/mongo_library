'use client';
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Typography } from '@mui/material';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />
          <Box sx={{ flex: 1 }}>
            {children}
          </Box>
          <Box sx={{ mt: 5, p: 3, textAlign: 'center', bgcolor: 'primary.light', borderRadius: '8px', width: '100%' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Master Students in Big Data and AI
            </Typography>
            <Typography variant="body2">
              Faculté Polydisciplinaire de Taroudant
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Anas Ethabity, Abdelhakim Kadim
            </Typography>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
