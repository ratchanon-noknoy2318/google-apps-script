// ================================================================
//  Google Apps Script - Patient Registration & Dashboard API
//  SPREADSHEET_ID และ SHEET_NAME ไม่ถูก hardcode
// ================================================================

// ================================================================
//  ตั้งค่า SPREADSHEET_ID และ SHEET_NAME ครั้งแรกผ่าน PropertiesService
// ================================================================
function setConfig(spreadsheetId, sheetName) {
  if (!spreadsheetId || !sheetName) {
    throw new Error('Please provide both spreadsheetId and sheetName.');
  }
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty('SPREADSHEET_ID', spreadsheetId);
  scriptProperties.setProperty('SHEET_NAME', sheetName);
  Logger.log('Configuration saved successfully.');
}

// ================================================================
//  ฟังก์ชันช่วยดึง Spreadsheet และ Sheet
// ================================================================
function getSpreadsheet() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const spreadsheetId = scriptProperties.getProperty('SPREADSHEET_ID');
  const sheetName = scriptProperties.getProperty('SHEET_NAME');

  if (!spreadsheetId || !sheetName) {
    throw new Error('Spreadsheet ID and Sheet Name not set. Please run setConfig() first.');
  }

  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found.`);
  }

  return { spreadsheet, sheet };
}

// ================================================================
//  ฟังก์ชันจัดการ GET requests (Dashboard)
// ================================================================
function doGet(e) {
  try {
    const { spreadsheet } = getSpreadsheet();
    return handleGetDashboardData(spreadsheet);
  } catch (err) {
    Logger.log(err);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: "An error occurred in doGet: " + err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================================================
//  ฟังก์ชันจัดการ POST requests (ลงทะเบียนผู้ป่วย)
// ================================================================
function doPost(e) {
  try {
    const { sheet } = getSpreadsheet();
    const data = JSON.parse(e.postData.contents);
    const action = data.action || 'register_new';

    if (action === 'find_patient') {
      const patientData = findPatientById(sheet, data.nationalId);
      if (patientData) {
        return ContentService.createTextOutput(JSON.stringify({ success: true, patient: patientData }))
          .setMimeType(ContentService.MimeType.JSON);
      } else {
        return ContentService.createTextOutput(JSON.stringify({ success: false, error: "ไม่พบข้อมูลผู้ป่วย" }))
          .setMimeType(ContentService.MimeType.JSON);
      }

    } else if (action === 'register_new' || action === 'register_existing') {
      const newRow = [
        data.nationalId,
        new Date(),
        data.firstName,
        data.lastName,
        data.gender,
        data.dob,
        "'" + data.phone,
        data.allergies || '',
        data.symptoms,
        data.weight || '',
        data.height || '',
        data.age || '',
        data.desired,
        data.disease || '',
        data.address || '',
        data.certificate || ''
      ];
      sheet.appendRow(newRow);
      return ContentService.createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);

    } else {
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Unknown action" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
    Logger.log(error.toString());
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================================================
//  ฟังก์ชันค้นหาข้อมูลผู้ป่วยจากเลขบัตรประชาชน
// ================================================================
function findPatientById(sheet, nationalId) {
  const data = sheet.getDataRange().getValues();
  const searchId = String(nationalId).trim();

  for (let i = data.length - 1; i >= 1; i--) {
    const sheetNationalId = String(data[i][0]).trim();
    if (sheetNationalId === searchId) {
      const dobValue = data[i][5];
      let formattedDob = '';
      if (dobValue instanceof Date && !isNaN(dobValue)) {
        formattedDob = Utilities.formatDate(dobValue, 'Asia/Bangkok', 'yyyy-MM-dd');
      } else if (typeof dobValue === 'string' && dobValue) {
        formattedDob = dobValue.substring(0, 10);
      }
      return {
        nationalId: data[i][0],
        firstName: data[i][2],
        las
