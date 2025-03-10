export default function handler(req, res) {
  // For demo purposes, we'll redirect to the homepage after enabling preview mode
  res.setPreviewData({
    isLocalPreview: true // Flag to indicate we're using local preview mode
  })
  res.redirect('/')
}
