const express = require('express');
const YAML = require('yamljs');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());

const yamlDirectory = path.join(__dirname, 'configs');

const loadYAMLFiles = () => {
  const files = fs.readdirSync(yamlDirectory).filter(file => file.endsWith('.yaml'));
  const yamlData = files.map(file => {
    const filePath = path.join(yamlDirectory, file);
    return YAML.load(filePath);
  });
  return yamlData;
};

app.get('/api/configs', (req, res) => {
  try {
    const allConfigs = loadYAMLFiles();
    res.json(allConfigs);  // Sends an array of all YAML files content
  } catch (err) {
    res.status(500).send('Error reading YAML files');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
