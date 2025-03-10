export default function handler(req, res) {
  if (req.method === 'POST') {
    // Handle saving changes
    try {
      // In a real app, you'd save to a database here
      // For demo, we'll just enable preview mode with the changes
      res.setPreviewData({
        isLocalPreview: true,
        changes: req.body
      });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save changes' });
    }
  } else {
    // Enable preview mode and redirect to homepage
    res.setPreviewData({
      isLocalPreview: true
    });
    res.redirect('/');
  }
}
