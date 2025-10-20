import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const title = 'Welcome to Activities';
  const [activites, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>("https://localhost:7026/api/activities")
    .then(response => setActivities(response.data))
    return () => {}
  }, []);

  return (
    <>
      <Typography variant='h3'>{title}</Typography>
      <List>
        {activites.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText>{activity.title}</ListItemText></ListItem>
        ))}
      </List>
    </>
  );
}

export default App
