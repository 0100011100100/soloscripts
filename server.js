const serverSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    users: [String] // List of usernames
});

const Server = mongoose.model('Server', serverSchema);

app.post('/create-server', authenticateJWT, async (req, res) => {
    const { name } = req.body;
    const newServer = new Server({ name, users: [req.user.username] });
    await newServer.save();
    res.json({ message: 'Server created' });
});
