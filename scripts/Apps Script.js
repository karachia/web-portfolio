// Version 1.0

var TO_ADDRESS = '<Email Address>';
var RECAPTCHA_SECRET_KEY = '<reCAPTCHA Secret Key>';
var GENERAL_FORM_SPREADSHEET_ID = '<Spreadsheet ID>';
var messageType = '';

// Test function to simulate a form submission
function TestGeneral() {
	var sampleEvent = {
		postData: {
			contents: JSON.stringify({
				firstName: 'Jane',
				lastName: 'Doe',
				email: 'skarachiani@apple.com',
        phone: '+1 (555) 123-4567',
				subject: 'Test: Subject',
				message: 'This is a test message from the contact form.',
				messageType: 'general',
				website: '', // Honeypot field should be empty for valid submissions
				fax: '' // Second honeypot field should be empty for valid submissions
			})
		}
	};
	var result = doPost(sampleEvent);
	Logger.log(result.getContent());
}

// Test function for Music Commission
function TestMusicCommission() {
	var sampleEvent = {
		postData: {
			contents: JSON.stringify({
				firstName: 'John',
				lastName: 'Smith',
				email: 'john.smith@orchestra.com',
				phone: '+1 (555) 123-4567',
				subject: 'Test: Music Commission Request',
				message: 'I would like to commission a new piece for our orchestra.',
				messageType: 'musicCommission',
				duration: '15',
				estimatedDate: 'March 2024',
				instrumentation: 'Full Orchestra',
				performer: 'City Philharmonic Orchestra',
				performanceLocation: 'City Concert Hall',
				website: '',
				fax: ''
			})
		}
	};
	var result = doPost(sampleEvent);
	Logger.log(result.getContent());
}

// Test function for Art Commission
function TestArtCommission() {
	var sampleEvent = {
		postData: {
			contents: JSON.stringify({
				firstName: 'Sarah',
				lastName: 'Johnson',
				email: 'sarah.johnson@gallery.com',
				phone: '555-987-6543',
				subject: 'Test: Art Commission Inquiry',
				message: 'I am interested in commissioning artwork for our gallery exhibition.',
				messageType: 'artCommission',
				dateNeeded: 'February 2024',
				size: '24" x 36"',
				delivery: 'digital',
				website: '',
				fax: ''
			})
		}
	};
	var result = doPost(sampleEvent);
	Logger.log(result.getContent());
}

// Test function for Performance Notice
function TestPerformanceNotice() {
	var sampleEvent = {
		postData: {
			contents: JSON.stringify({
				firstName: 'Michael',
				lastName: 'Chen',
				email: 'michael.chen@music.edu',
				phone: '+1-555-456-7890',
				subject: 'Test: Performance Notice',
				message: 'I will be performing one of your pieces at our upcoming concert.',
				messageType: 'performanceNotice',
				date: '2024-01-15',
				performer: 'Michael Chen, Piano',
				location: 'University Concert Hall, Music Department',
				selectedPiece: 'Whirling Onward for orchestra',
				website: '',
				fax: ''
			})
		}
	};
	var result = doPost(sampleEvent);
	Logger.log(result.getContent());
}

// Test function for Score Purchase
function TestScorePurchase() {
	var sampleEvent = {
		postData: {
			contents: JSON.stringify({
				firstName: 'Emily',
				lastName: 'Davis',
				email: 'emily.davis@ensemble.com',
				phone: '(555) 789-0123',
				subject: 'Test: Score Purchase Request',
				message: 'I would like to purchase the score for our quartet performance.',
				messageType: 'scorePurchase',
				purchaseType: 'both',
				selectedPiece: 'Whirling Onward for orchestra',
				website: '',
				fax: ''
			})
		}
	};
	var result = doPost(sampleEvent);
	Logger.log(result.getContent());
}

function doPost(e) {
	try {
		Logger.log(e); // the Google Script version of console.log see: Class Logger

		// Parse JSON from request body
		var requestBody = e.postData.contents;
		var mailData = JSON.parse(requestBody);

		// Validate and sanitize
		mailData = validateAndSanitizeFormData(mailData);

    // Record form the submitted data in spreadsheet
    record_data(e, mailData, getSheetName(messageType));

		// names and order of form elements (if set)
		var orderParameter = mailData.formDataNameOrder;
		var dataOrder;
		if (orderParameter) {
			dataOrder = JSON.parse(orderParameter);
		}

		MailApp.sendEmail({
			to: TO_ADDRESS,
			name: String(mailData.firstName) + ' ' + String(mailData.lastName),
			subject: '[Web - ' + getSheetName(messageType) + '] ' + String(mailData.subject),
			replyTo: String(mailData.email),
			htmlBody: formatMailBody(mailData, dataOrder)
		});

		Logger.log('Sent Email!');
		
    return ContentService.createTextOutput(
			JSON.stringify({ status: 'success', data: JSON.stringify(mailData) })
		).setMimeType(ContentService.MimeType.JSON);
			// .setHeader('Access-Control-Allow-Origin', '*')
			// .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
			// .setHeader('Access-Control-Allow-Headers', 'Content-Type');
	} catch (error) {
		// if error return this
		Logger.log(error);
		return ContentService.createTextOutput(
			JSON.stringify({ status: 'Error', error: error.message })
		).setMimeType(ContentService.MimeType.JSON);
	}
}

// HELPER FUNCTIONS

// Verify reCAPTCHA token
function verifyRecaptcha(token) {
	var url = 'https://www.google.com/recaptcha/api/siteverify';
	var payload = {
		secret: RECAPTCHA_SECRET_KEY,
		response: token
	};

	var options = {
		method: 'POST',
		payload: payload
	};

	var response = UrlFetchApp.fetch(url, options);
	var result = JSON.parse(response.getContentText());

	return result.success;
}

// spit out all the keys/values from the form in HTML for email
// uses an array of keys if provided or the object to determine field order
function formatMailBody(obj, order) {
	var result = '';
	if (!order) {
		order = Object.keys(obj);
	}

	// loop over all keys in the ordered form data
	// for (var idx in order) {
	//   var key = order[idx];
	//   result += "<h4 style='text-transform: capitalize; margin-bottom: 0'>" + key + "</h4><div>" + sanitizeInput(obj[key]) + "</div>";
	//   // for every key, concatenate an `<h4 />`/`<div />` pairing of the key name and its value,
	//   // and append it to the `result` string created at the start.
	// }

	var name = obj['firstName'] + ' ' + obj['lastName'];
  result += "<div><h2 style='text-transform: capitalize; margin-bottom: 0'>" + getSheetName(messageType) + '</h4></div>'
	result += getHeader('Subject:') + getBodyHTML(obj['subject']);
	result += getHeader('Name:') + getBodyHTML(name);
	result += getHeader('Email:') + getBodyHTML(obj['email']);

	if (messageType === 'musicCommission') {
		result += getHeader('Duration:') + getBodyHTML(obj['duration']);
		result += getHeader('Estimated Date:') + getBodyHTML(obj['estimatedDate']);
		result += getHeader('Instrumentation:') + getBodyHTML(obj['instrumentation']);
		result += getHeader('Performer:') + getBodyHTML(obj['performer']);
		if (obj['performanceLocation']) {
			result += getHeader('Performance Location:') + getBodyHTML(obj['performanceLocation']);
		}
	} else if (messageType === 'artCommission') {
		result += getHeader('Date Needed By:') + getBodyHTML(obj['dateNeeded']);
		result += getHeader('Size:') + getBodyHTML(obj['size']);
		result += getHeader('Delivery:') + getBodyHTML(obj['delivery']);
	} else if (messageType === 'performanceNotice') {
		result += getHeader('Date:') + getBodyHTML(obj['date']);
		result += getHeader('Performer:') + getBodyHTML(obj['performer']);
		result += getHeader('Location:') + getBodyHTML(obj['location']);
		result += getHeader('Selected Piece:') + getBodyHTML(obj['selectedPiece']);
	} else if (messageType === 'scorePurchase') {
		result += getHeader('Purchase Type:') + getBodyHTML(obj['purchaseType']);
		result += getHeader('Selected Piece:') + getBodyHTML(obj['selectedPiece']);
	}

  result += getHeader('Message:') + getBodyHTML(obj['message']);

	return result;
}

function getHeader(aString) {
	var ret = '';
	ret += "<h4 style='text-transform: capitalize; margin-bottom: 0'>" + aString + '</h4>';
	return ret;
}

function getBodyHTML(rawInput) {
	var ret = '';
	ret += '<div>' + sanitizeInput(rawInput) + '</div>';
	return ret;
}

// sanitize content from the user - trust no one
// ref: https://developers.google.com/apps-script/reference/html/html-output#appendUntrusted(String)
function sanitizeInput(rawInput) {
	var placeholder = HtmlService.createHtmlOutput(' ');
	placeholder.appendUntrusted(rawInput);

	return placeholder.getContent();
}

// Validate and sanitize form data
function validateAndSanitizeFormData(obj) {
	// Verify reCAPTCHA first
  // TODO: uncoment before production
	// if (!obj.recaptchaToken) {
	// 	throw new Error('reCAPTCHA verification required.');
	// }

	// if (!verifyRecaptcha(obj.recaptchaToken)) {
	// 	throw new Error('reCAPTCHA verification failed.');
	// }

	// Check honeypot fields first
	if (obj.website && obj.website !== '') {
		throw new Error('Spam detected.');
	}
	if (obj.fax && obj.fax !== '') {
		throw new Error('Spam detected.');
	}

	// Validate message type
	var validMessageTypes = ['musicCommission', 'artCommission', 'performanceNotice', 'scorePurchase', 'general'];
	if (!obj.messageType) {
		throw new Error('Message type is required.');
	}
	if (!validMessageTypes.includes(obj.messageType)) {
		throw new Error('Invalid message type.');
	}
	
	// Store validated message type
	messageType = String(obj.messageType).trim();

	var requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
	var sanitized = {};
	
	// Add message type to sanitized data
	// sanitized.messageType = messageType;
	
	for (var i = 0; i < requiredFields.length; i++) {
		var key = requiredFields[i];
		if (!(key in obj)) {
			throw new Error('Missing required field: ' + key);
		}
		var value = String(obj[key]).trim();
		if (!value) {
			throw new Error("Field '" + key + "' cannot be empty.");
		}
		sanitized[key] = value;
	}
	
	// Email validation
	var emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if (!emailPattern.test(sanitized.email)) {
		throw new Error('Invalid email address.');
	}
	
	// Phone validation (optional field)
	if (obj.phone && obj.phone !== '') {
		var phoneValue = String(obj.phone).trim();
		if (phoneValue) {
			// Remove all non-digit characters except + for country code
			var cleanedPhone = phoneValue.replace(/[^\d+]/g, '');
			
			// Check if it starts with + (international format)
			if (cleanedPhone.startsWith('+')) {
				// International format: +[country code][number]
				// Must have at least 7 digits after country code
				var digitsAfterPlus = cleanedPhone.substring(1).replace(/\D/g, '');
				if (digitsAfterPlus.length < 7 || digitsAfterPlus.length > 15) {
					throw new Error('Invalid phone number format. International numbers should be 7-15 digits.');
				}
			} else {
				// Domestic format: just digits
				// Must be 10-15 digits (10 for US/Canada, more for other countries)
				var digitsOnly = cleanedPhone.replace(/\D/g, '');
				if (digitsOnly.length < 10 || digitsOnly.length > 15) {
					throw new Error('Invalid phone number format. Phone numbers should be 10-15 digits.');
				}
			}
			
			// Store the original formatted phone number
			sanitized.phone = phoneValue;
		}
	}
	
	// Validate and store conditional fields based on message type
	if (messageType === 'musicCommission') {
		var musicFields = ['duration', 'estimatedDate', 'instrumentation', 'performer'];
		for (var j = 0; j < musicFields.length; j++) {
			var field = musicFields[j];
			if (!(field in obj) || !String(obj[field]).trim()) {
				throw new Error('Missing required field for music commission: ' + field);
			}
			sanitized[field] = String(obj[field]).trim();
		}
		// Optional field
		if (obj.performanceLocation) {
			sanitized.performanceLocation = String(obj.performanceLocation).trim();
		}
	} else if (messageType === 'artCommission') {
		var artFields = ['dateNeeded', 'size', 'delivery'];
		for (var k = 0; k < artFields.length; k++) {
			var field = artFields[k];
			if (!(field in obj) || !String(obj[field]).trim()) {
				throw new Error('Missing required field for art commission: ' + field);
			}
			sanitized[field] = String(obj[field]).trim();
		}
	} else if (messageType === 'performanceNotice') {
		var performanceFields = ['date', 'performer', 'location'];
		for (var l = 0; l < performanceFields.length; l++) {
			var field = performanceFields[l];
			if (!(field in obj) || !String(obj[field]).trim()) {
				throw new Error('Missing required field for performance notice: ' + field);
			}
			sanitized[field] = String(obj[field]).trim();
		}
		// Validate selected piece
		if (!obj.selectedPiece) {
			throw new Error('Missing required field for performance notice: selectedPiece');
		}

		sanitized.selectedPiece = String(obj.selectedPiece).trim();

	} else if (messageType === 'scorePurchase') {
		if (!obj.purchaseType || !String(obj.purchaseType).trim()) {
			throw new Error('Missing required field for score purchase: purchaseType');
		}
		sanitized.purchaseType = String(obj.purchaseType).trim();
		// Validate selected piece
		if (!obj.selectedPiece) {
			throw new Error('Missing required field for score purchase: selectedPiece');
		}
		sanitized.selectedPiece = String(obj.selectedPiece).trim();
	}
    
    // Cannot validate corporate emails! So comment out...
    // if (!validateEmail(sanitized.email)) {
    //     throw new Error('Could not verify the email address.');
    // }

	Logger.log('Sanitized!');
	return sanitized;
}

function getSheetName(messageType) {
	if (messageType === 'musicCommission') {
		return 'Music Commission';
	} else if (messageType === 'artCommission') {
		return 'Art Commission';
	} else if (messageType === 'performanceNotice') {
		return 'Performance Notice';
	} else if (messageType === 'scorePurchase') {
		return 'Score Purchase';
	} else {
		return 'General';
	}
}

// /**
//  * record_data inserts the data received from the html form submission
//  * e is the data received from the POST
//  */
function record_data(e, formData, sheetName) {
	var lock = LockService.getDocumentLock();
	lock.waitLock(30000); // hold off up to 30 sec to avoid concurrent writing

	try {
		Logger.log(JSON.stringify(e)); // log the POST data in case we need to debug it

		// select the 'responses' sheet by default
		var doc = SpreadsheetApp.openById(GENERAL_FORM_SPREADSHEET_ID);
		var sheet = doc.getSheetByName(sheetName);

		var oldHeader = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
		var newHeader = oldHeader.slice();
		var fieldsFromForm = Object.keys(formData); // getDataColumns(e.parameters);
    var date = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles"});
		var row = [date]; // first element in the row should always be a timestamp

		// loop through the header columns
		for (var i = 1; i < oldHeader.length; i++) {
			// start at 1 to avoid Timestamp column
			var field = oldHeader[i];
			var output = getFieldFromData(field, formData);
			row.push(output);

			// mark as stored by removing from form fields
			var formIndex = fieldsFromForm.indexOf(field);
			if (formIndex > -1) {
				fieldsFromForm.splice(formIndex, 1);
			}
		}

		// set any new fields in our form
		for (var i = 0; i < fieldsFromForm.length; i++) {
			var field = fieldsFromForm[i];
			var output = getFieldFromData(field, formData);
			row.push(output);
			newHeader.push(field);
		}

		// more efficient to set values as [][] array than individually
		var nextRow = sheet.getLastRow() + 1; // get next row
		sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

		// update header row with any new data
		if (newHeader.length > oldHeader.length) {
			sheet.getRange(1, 1, 1, newHeader.length).setValues([newHeader]);
		}
	} catch (error) {
		Logger.log(error);
	} finally {
		lock.releaseLock();
		return;
	}
}

function getFieldFromData(field, data) {
	var values = data[field] || '';
	var output = values.join ? values.join(', ') : values;
	return output;
}

function validateEmail(email) {
	let ss = SpreadsheetApp.openByUrl(
		SpreadsheetApp.create('Email Validation Spreadsheet', 1, 1).getUrl()
	);

    try {
        ss.addViewer(email);
    } catch (e) {
        setTrashed();
        return false;
    }
    setTrashed();
    return true;
	
	function setTrashed() {
		ss.removeViewer(email);
		DriveApp.getFilesByName('Email Validation Spreadsheet').next().setTrashed(true);
	}
}

// not used
// function getDataColumns(data) {
// 	return Object.keys(data).filter(function (column) {
// 		return !(
// 			column === 'formDataNameOrder' ||
// 			column === 'formGoogleSheetName' ||
// 			column === 'formGoogleSendEmail' ||
// 			column === 'honeypot'
// 		);
// 	});
// }