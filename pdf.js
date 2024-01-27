import pdf from 'html-pdf';
import express from 'express';
import { getTemplateSync, templateAddData, templateInject } from './template.js';

const app = express();
const PORT = 3000;

// Post request handler for generating PDF tickets
app.post('/ticket', async (req, res) => {
  const content = req.body; // Extract ticket information from the request body

  // Load the ticket template
  const templateContent = getTemplateSync('/template.html');

  // Add ticket information to the template
  const templateWithData = [
    templateAddData('title', 'Test PDF', templateContent),
    templateAddData('subtitle', 'testing pdf generation', templateContent),
    templateAddData('identify_other', 'test paragraph with some random text!', templateContent)
  ]

  // Generate PDF from the template with injected data
  const pdfDocument = new pdf({
    format: 'a4',
    orientation: 'portrait',
  });

  await pdfDocument.fromHTML(templateInject(templateWithData, templateContent));

  // Save the generated PDF file
  const fileName = `ticket-${Date.now()}.pdf`;
  await pdfDocument.save(fileName);

  // Send the generated PDF file as an attachment
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="' + fileName + '"');

  // Send the PDF file to the client
  const fileStream = fs.createReadStream(fileName);
  res.write(fileStream);
  fileStream.on('end', () => {
    res.end();
    fs.unlinkSync(fileName); // Delete the temporary PDF file
  });
});

// Get request handler to check the server status
app.get('/', (res) => {
  res.send('Generator is UpAndRunning!');
});

// Start the Express server
app.listen(() => {
  try {
    console.log(`Server Port: ${PORT}`);
  } catch (error) {
    console.error(error)
  }
}, PORT);