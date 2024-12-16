import { Paper, Typography } from "@mui/material";

type EventProps = {
    title: string;
    genre: string;
    time: string;
    date: Date;
}

const EventDetails: React.FC<EventProps> = ({ title, genre, time, date }) => {
    return (
        <Paper
          sx={{
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 400,
          }}
        >
            <Typography
                variant="h6"
                sx={{ fontSize: "1rem", fontWeight: "bold", marginBottom: 1 }}
            >
                {title}
            </Typography>
            <Typography
                variant="h6"
                sx={{ fontSize: "1rem", fontWeight: "bold", marginBottom: 1 }}
            >
                {genre}
            </Typography>
            <Typography
                variant="h6"
                sx={{ fontSize: "1rem", fontWeight: "bold", marginBottom: 1 }}
            >
                {time}
            </Typography>
        </Paper>
    )
}

export default EventDetails;