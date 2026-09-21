module.exports = function fillTemplate(template, item) {
  let output = template.replace(/\{\{ID\}\}/g, item.id);
  output = output.replace(/\{\{NAME\}\}/g, item.name);
  output = output.replace(/\{\{LOCATION\}\}/g, item.location);
  output = output.replace(/\{\{DESCRIPTION\}\}/g, item.description);
  output = output.replace(/\{\{CATEGORY\}\}/g, item.category);
  output = output.replace(/\{\{CONTACT\}\}/g, item.contact);

  return output;
};

