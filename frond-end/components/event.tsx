import { Box, Paper, Typography } from "@mui/material";
import PurchaseButton from "./Tickets/purchaseButton";

type EventProps = {
  id: string;
  title: string;
  time: string;
  imageUrl?: string;
};

const EventFrame: React.FC<EventProps> = ({ id, title, time, imageUrl }) => {
  return (
    <Paper
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 230,
      }}
    >
      <Box
        sx={{
          height: 100,
          backgroundColor: "#e0e0e0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${title} image`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Typography variant="caption">No Image</Typography>
        )}
      </Box>
      <Typography
        variant="h6"
        sx={{ fontSize: "1rem", fontWeight: "bold", marginBottom: 1 }}
      >
        {title}
      </Typography>

      <Typography variant="body2" sx={{ marginBottom: 1 }}>
        {time}
      </Typography>

      <PurchaseButton eventId={id} />
    </Paper>
  );
};

export default EventFrame;
