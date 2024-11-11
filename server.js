const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Endpoint to get Roblox profile data using RoVer's API
app.get('/getRobloxProfile/:username', async (req, res) => {
    const { username } = req.params;

    try {
        // RoVer API endpoint to get Roblox ID from username
        const response = await axios.get(`https://verify.eryn.io/api/user/${username}`);

        if (response.data && response.data.robloxId) {
            const robloxId = response.data.robloxId;

            // Fetch additional Roblox profile data
            const userInfo = await axios.get(`https://users.roblox.com/v1/users/${robloxId}`);
            const avatarInfo = await axios.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${robloxId}&size=150x150&format=Png`);

            res.json({
                username: userInfo.data.name,
                displayName: userInfo.data.displayName,
                description: userInfo.data.description,
                avatarUrl: avatarInfo.data.data[0].imageUrl
            });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching Roblox profile" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
