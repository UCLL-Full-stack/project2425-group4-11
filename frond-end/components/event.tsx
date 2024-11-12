import { Box, Paper, Typography } from "@mui/material";

type EventProps = {
    title: string;
    time: string;
    imageUrl?: string;
}

const EventFrame: React.FC<EventProps> = ({ title, time, imageUrl }) => {
    return (
        <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: 230 }}>
            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: 1}}>
                {title}
            </Typography>

            <Typography variant="body2" sx={{ marginBottom: 1 }}>
                {time}
            </Typography>

            <Box
                sx={{
                width: 80,
                height: 80,
                backgroundColor: '#e0e0e0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }}
            >
                {imageUrl ? (
                    <img src={imageUrl} alt={`${title} image`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <Typography variant="caption">No Image</Typography>
                )}
            </Box>
        </Paper>
    );
};

export default EventFrame;