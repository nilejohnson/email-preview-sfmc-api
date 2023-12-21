# Mastering SFMC: Email Preview and Extraction via API

## Overview

This repository contains code for effortlessly previewing and extracting emails from Salesforce Marketing Cloud (SFMC). The provided guide and scripts enable users to extract subject lines, pretexts, and HTML email body content using the SFMC API.

## Background

Extracting email components like subject lines and pretexts from SFMC can be challenging, especially when dealing with a large volume of emails and AMPscript-based content. This solution leverages the SFMC API to preview and extract email data efficiently.

## Features

- **Email Preview**: Preview emails as they appeared when originally sent, using a specified subscriber as the previewer.
- **Bulk Extraction**: Efficiently extract data from a multitude of emails.
- **Detailed Data Retrieval**: Extract not just subject lines and pretexts, but also the complete HTML body of emails.

## Getting Started

### Prerequisites

- Salesforce Marketing Cloud account with API access.
- Basic understanding of APIs and HTTP requests.

### Setup

1. **API Credentials**: Ensure you have your SFMC API credentials ready.
2. **Install Dependencies**: (List any libraries or tools required for running the scripts)

### Usage

1. **Construct the API Call**:
   - Use the format: `REST_BASE_URI/guide/v1/emails/assetId/dataExtension/deId/row/rowNumber/preview`
   - Replace placeholders with specific details like `assetId`, `deId`, and `rowNumber`.

2. **Performing the POST API Call**:
   - Use the constructed URL to make a POST request.
   - The response includes the HTML body, subject line, pretext, and other relevant content.

3. **Example**: See the 'examples' directory for sample scripts and usage.

## API Response Structure

The API response will contain the following fields:
- Full HTML body
- Subject line
- Preheader text
- Other relevant content

- ## Additional Information

- **Inspecting Network Tab**: A detailed guide on how to use the Chrome network tab for constructing the API call is available. This technique is crucial for identifying the right endpoints and parameters for your API requests.
- **Language Rendering**: The scripts allow you to render emails in different languages using the subscriber key. This feature is particularly useful for multilingual email campaigns.

## Contributing

Contributions to this project are welcome. If you have improvements or bug fixes:

1. Fork the repository.
2. Create a new branch for your features.
3. Submit a pull request with a clear description of your changes.

See [CONTRIBUTING.md](CONTRIBUTING.md) for more detailed instructions.

## License

This project is licensed under the [INSERT LICENSE NAME HERE] - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to the Salesforce Marketing Cloud community for their insights and support.
- Gratitude to various online forums, including Stack Overflow and blogs, for providing valuable information.