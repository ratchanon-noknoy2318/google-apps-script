# Google Apps Script Tools

A comprehensive repository of Google Apps Script (GAS) modules, automation scripts, and integration examples designed to enhance productivity within the Google Workspace ecosystem.

---

## Overview

This project provides a collection of reusable scripts aimed at automating routine tasks, managing data flows, and extending the capabilities of Google services such as Sheets, Docs, Gmail, and Forms.

---

## Project Structure

The codebase is organized into modular files to ensure maintainability and separation of concerns:

```text
├── src/
│   ├── Code.gs            # Main entry points and global configurations
│   ├── Email.gs           # Gmail interaction functions
│   ├── Sheets.gs          # Google Sheets logic
│   ├── Docs.gs            # Google Docs generation
│   └── Forms.gs           # Form processing handlers
└── appsscript.json        # Project manifest
```

---

## Supported Services

The following Google Workspace services are currently supported:

| Service | Description |
| :--- | :--- |
| **Google Sheets** | Automation of data entry, formatting, and report generation. |
| **Google Docs** | Programmatic document creation and template modification. |
| **Gmail** | Automated email dispatching, inbox organization, and parsing. |
| **Google Forms** | Handling and processing of form responses. |
| **Other Services** | Integrations with Drive, Calendar, Contacts, and more. |

---

## Function Reference

Below is a summary of the primary functions available in this repository:

| Script Name | Description | Function Signature | File |
| :--- | :--- | :--- | :--- |
| **Send Email** | Automates the sending of Gmail messages. | `sendEmail()` | `src/Email.gs` |
| **Update Sheet** | Writes data to specific ranges in Google Sheets. | `updateSheet()` | `src/Sheets.gs` |
| **Generate Doc** | Creates new Google Docs based on predefined templates. | `createDocument()` | `src/Docs.gs` |
| **Process Form Data** | Processes incoming responses from Google Forms. | `processFormResponses()` | `src/Forms.gs` |

---

## Installation

To integrate these scripts into your workflow, please follow these steps:

1.  Navigate to Google Apps Script.
2.  Create a new project.
3.  Copy the desired script modules from this repository into your project's editor.
4.  Save the project and authorize the necessary permissions when prompted.
5.  Execute the scripts manually via the editor or set up triggers for automation.

---

## Usage Examples

### Send Email

```javascript
function sendEmail() {
  GmailApp.sendEmail("recipient@example.com", "Automated Message", "Example.");
}
```

### Update Sheet

```javascript
function updateSheet() {
  SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange("A1").setValue("Updated by GAS");
}
```

---

## License

This project is licensed under the MIT License. See LICENSE for details.