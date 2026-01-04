# Google Apps Script

Repository of Google Apps Script (GAS) projects, scripts, and examples.  
Reusable scripts for automating tasks and extending Google services.

---

## Overview

Scripts for automation, data management, and workflow enhancements in Google Workspace.

---

## Supported Services

| Service        | Description                             |
|----------------|-----------------------------------------|
| Google Sheets  | Automate data and reports               |
| Google Docs    | Generate and modify documents           |
| Gmail          | Send, read, and organize emails         |
| Google Forms   | Manage form responses                   |
| Other Services | Drive, Calendar, Contacts, etc.        |

---

## Scripts Summary

| Script Name       | Description                     | Function           |
|------------------|---------------------------------|------------------|
| Send Email        | Automates Gmail messages        | `sendEmail()`     |
| Update Sheet      | Updates Google Sheets           | `updateSheet()`   |
| Generate Doc      | Creates Google Docs from template | `createDocument()` |
| Process Form Data | Handles Google Forms responses  | `processFormResponses()` |

---

## Getting Started

1. Open [Google Apps Script](https://script.google.com/)  
2. Create a new project  
3. Copy desired scripts from this repo  
4. Save and authorize permissions  
5. Run scripts manually or via triggers  

---

## Usage Example

| Script       | Code |
|--------------|------|
| Send Email   | ```javascript<br>function sendEmail() {<br>  GmailApp.sendEmail("recipient@example.com", "Automated Message", "Example.");<br>}<br>``` |
| Update Sheet | ```javascript<br>function updateSheet() {<br>  SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange("A1").setValue("Updated by GAS");<br>}<br>``` |

---

## License

MIT License. See [LICENSE](LICENSE) for details.