export default function handler(req, res) {
  // Enable preview mode and redirect to homepage
  res.setPreviewData({
    isLocalPreview: true
  });
  res.redirect('/');
}
