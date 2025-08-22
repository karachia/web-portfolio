// Score Purchase Webhook Handler for Payhip Integration
// Version 1.0

var TO_ADDRESS = '<Email Address>';
var PAYHIP_API_KEY = '<Payhip API Key>';
var SCORE_PURCHASES_SPREADSHEET_ID = '<Spreadsheet ID>';

// Test function to simulate a Payhip webhook
function TestScorePurchase() {
	var testData = {
		"id": "ZGjVj5x4GN",
		"email": "customer@example.com",
		"first_name": "John",
		"last_name": "Doe",
		"currency": "USD",
		"price": 1500, // $15.00 in cents
		"vat_applied": false,
		"ip_address": "72.334.28.154",
		"items": [
			{
				"product_id": "2804256",
				"product_name": "Whirling Onward - Full Score",
				"product_key": "RGsF",
				"product_permalink": "https://payhip.com/b/RGsF",
				"quantity": "1",
				"on_sale": false,
				"used_coupon": false,
				"used_social_discount": false,
				"used_cross_sell_discount": false,
				"used_upgrade_discount": false,
				"promoted_by_affiliate": false,
				"has_variant": false
			}
		],
		"checkout_questions": [
			{
				"question": "Is this purchase for an upcoming performance? If so, please indicate the date and location of the performance.&nbsp;",
				"response": "Yes, December 15th at Carnegie Hall"
			},
			{
				"question": "Any special requests or notes?",
				"response": "Please send digital copy as well"
			}
		],
		"payment_type": "card",
		"stripe_fee": 48,
		"payhip_fee": 33,
		"unconsented_from_emails": false,
		"is_gift": false,
		"date": 1703693218,
		"type": "paid",
		"signature": "dbcdccb0dfc5a57rh704bc75d7bbb18hdd3ee85f4081d5c4adbff934622919d8"
	};
	
	var sampleEvent = {
		postData: {
			contents: JSON.stringify(testData)
		}
	};
	var result = doPost(sampleEvent);
	Logger.log(result.getContent());
}

function doPost(e) {
	try {
		Logger.log('Received webhook request');
		Logger.log(e);

		// Parse JSON from request body
		var requestBody = e.postData.contents;
		var webhookData = JSON.parse(requestBody);

		// Validate webhook signature for security
		if (!verifyWebhookSignature(webhookData.signature)) {
			Logger.log('Invalid webhook signature');
			return ContentService.createTextOutput(
				JSON.stringify({ status: 'error', message: 'Invalid signature' })
			).setMimeType(ContentService.MimeType.JSON);
		}

		// Only process 'paid' events
		if (webhookData.type !== 'paid') {
			Logger.log('Ignoring non-paid event: ' + webhookData.type);
			return ContentService.createTextOutput(
				JSON.stringify({ status: 'ignored', message: 'Non-paid event' })
			).setMimeType(ContentService.MimeType.JSON);
		}

		// Validate and sanitize webhook data
		var sanitizedData = validateAndSanitizeWebhookData(webhookData);

		// Record purchase data in spreadsheet
		recordPurchaseData(sanitizedData, requestBody);

		// Send email notification
		sendPurchaseNotificationEmail(sanitizedData);

		Logger.log('Successfully processed score purchase webhook');
		
		return ContentService.createTextOutput(
			JSON.stringify({ status: 'success', transaction_id: sanitizedData.id })
		).setMimeType(ContentService.MimeType.JSON);

	} catch (error) {
		Logger.log('Error processing webhook: ' + error.message);
		return ContentService.createTextOutput(
			JSON.stringify({ status: 'error', message: error.message })
		).setMimeType(ContentService.MimeType.JSON);
	}
}

// HELPER FUNCTIONS

// Verify webhook signature using Payhip API key
function verifyWebhookSignature(signature) {
	if (!PAYHIP_API_KEY || PAYHIP_API_KEY === '<Payhip API Key>') {
		Logger.log('Warning: Payhip API key not configured, skipping signature verification');
		return true; // Allow for testing, but should be false in production
	}
	
	var expectedSignature = Utilities.computeDigest(
		Utilities.DigestAlgorithm.SHA_256,
		PAYHIP_API_KEY,
		Utilities.Charset.UTF_8
	);
	
	// Convert to hex string
	var expectedHex = expectedSignature.map(function(byte) {
		return (byte < 0 ? byte + 256 : byte).toString(16).padStart(2, '0');
	}).join('');
	
	return signature === expectedHex;
}

// Validate and sanitize webhook data
function validateAndSanitizeWebhookData(data) {
	var sanitized = {};
	
	// Required fields validation
	var requiredFields = ['id', 'email', 'currency', 'price', 'items', 'date', 'type'];
	for (var i = 0; i < requiredFields.length; i++) {
		var field = requiredFields[i];
		if (!(field in data)) {
			throw new Error('Missing required field: ' + field);
		}
	}
	
	// Sanitize basic fields
	sanitized.id = String(data.id).trim();
	sanitized.email = String(data.email).trim();
	sanitized.first_name = String(data.first_name || '').trim();
	sanitized.last_name = String(data.last_name || '').trim();
	sanitized.currency = String(data.currency).trim();
	sanitized.price = parseFloat(data.price) || 0;
	sanitized.date = parseInt(data.date) || 0;
	sanitized.type = String(data.type).trim();
	
	// Validate email format
	var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailPattern.test(sanitized.email)) {
		throw new Error('Invalid email format');
	}
	
	// Process items array
	if (!Array.isArray(data.items) || data.items.length === 0) {
		throw new Error('No items in purchase');
	}
	
	sanitized.items = [];
	for (var j = 0; j < data.items.length; j++) {
		var item = data.items[j];
		sanitized.items.push({
			product_id: String(item.product_id || '').trim(),
			product_name: String(item.product_name || '').trim(),
			product_key: String(item.product_key || '').trim(),
			product_permalink: String(item.product_permalink || '').trim(),
			quantity: parseInt(item.quantity) || 1
		});
	}
	
	// Optional fields
	sanitized.payment_type = String(data.payment_type || 'unknown').trim();
	sanitized.stripe_fee = parseFloat(data.stripe_fee) || 0;
  sanitized.paypal_fee = parseFloat(data.paypal_fee) || 0;
	sanitized.payhip_fee = parseFloat(data.payhip_fee) || 0;
	sanitized.is_gift = Boolean(data.is_gift);
	sanitized.ip_address = String(data.ip_address || '').trim();
	
	// Process checkout questions into a single string
	sanitized.checkout_questions = '';
	if (Array.isArray(data.checkout_questions) && data.checkout_questions.length > 0) {
		var questionsArray = [];
		for (var k = 0; k < data.checkout_questions.length; k++) {
			var q = data.checkout_questions[k];
			if (q.question && q.response) {
				// Clean up HTML entities and formatting
				var question = String(q.question).replace(/&nbsp;/g, ' ').replace(/<[^>]*>/g, '').trim();
				var response = String(q.response).trim();
				questionsArray.push('Q: ' + question + ' | A: ' + response);
			}
		}
		sanitized.checkout_questions = questionsArray.join(' || ');
	}
	
	return sanitized;
}

// Record purchase data in Google Sheets
function recordPurchaseData(data, rawPostData) {
	var lock = LockService.getDocumentLock();
	lock.waitLock(30000);
	
	try {
		var doc = SpreadsheetApp.openById(SCORE_PURCHASES_SPREADSHEET_ID);
		var sheet = doc.getSheetByName('Score Purchases') || doc.insertSheet('Score Purchases');
		
		// Initialize headers if sheet is empty
		if (sheet.getLastRow() === 0) {
			var headers = [
				'Timestamp',
				'Transaction ID',
				'Customer Email',
				'First Name',
				'Last Name',
				'Product Name',
				'Product ID',
				'Product Key',
				'Quantity',
				'Price (cents)',
				'Price (formatted)',
				'Currency',
				'Payment Type',
				'Stripe Fee',
        'PayPal Fee',
				'Payhip Fee',
				'Net Amount',
				'Is Gift',
				'IP Address',
				'Product Link',
				'Purchase Date',
				'Checkout Questions',
				'Raw Post Data'
			];
			sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
			
			// Format header row
			var headerRange = sheet.getRange(1, 1, 1, headers.length);
			headerRange.setFontWeight('bold');
			headerRange.setBackground('#f0f0f0');
		}
		
		// Add row for each item in the purchase
		var timestamp = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
		var purchaseDate = new Date(data.date * 1000).toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
		
		for (var i = 0; i < data.items.length; i++) {
			var item = data.items[i];
			var itemPrice = data.items.length > 1 ? Math.round(data.price / data.items.length) : data.price;
			var formattedPrice = formatPrice(itemPrice, data.currency);
			var netAmount = itemPrice - (data.stripe_fee / data.items.length) - (data.paypal_fee / data.items.length) - (data.payhip_fee / data.items.length);
			
			var row = [
				timestamp,
				data.id,
				data.email,
				data.first_name,
				data.last_name,
				item.product_name,
				item.product_id,
				item.product_key,
				item.quantity,
				itemPrice,
				formattedPrice,
				data.currency,
				data.payment_type,
				Math.round(data.stripe_fee / data.items.length),
        Math.round(data.paypal_fee / data.items.length),
				Math.round(data.payhip_fee / data.items.length),
				Math.round(netAmount),
				data.is_gift ? 'Yes' : 'No',
				data.ip_address,
				item.product_permalink,
				purchaseDate,
				data.checkout_questions,
				rawPostData || ''
			];
			
			var nextRow = sheet.getLastRow() + 1;
			sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
		}
		
		Logger.log('Successfully recorded purchase data to spreadsheet');
		
	} catch (error) {
		Logger.log('Error recording to spreadsheet: ' + error.message);
		throw error;
	} finally {
		lock.releaseLock();
	}
}

// Send email notification about the purchase
function sendPurchaseNotificationEmail(data) {
	try {
		var subject = '[Score Purchase] New sale - ' + formatPrice(data.price, data.currency);
		var htmlBody = formatPurchaseEmailBody(data);
		
		MailApp.sendEmail({
			to: TO_ADDRESS,
			subject: subject,
			htmlBody: htmlBody
		});
		
		Logger.log('Successfully sent purchase notification email');
		
	} catch (error) {
		Logger.log('Error sending email: ' + error.message);
		throw error;
	}
}

// Format the email body for purchase notifications
function formatPurchaseEmailBody(data) {
	var html = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">';
	
	// Header
	html += '<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">';
	html += '<h2 style="color: #28a745; margin: 0;">🎵 New Score Purchase!</h2>';
	html += '</div>';
	
	// Purchase Summary
	html += '<div style="background-color: #fff; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">';
	html += '<h3 style="color: #343a40; margin-top: 0;">Purchase Summary</h3>';
	html += '<p><strong>Transaction ID:</strong> ' + sanitizeHtml(data.id) + '</p>';
	html += '<p><strong>Total Amount:</strong> ' + formatPrice(data.price, data.currency) + '</p>';
	html += '<p><strong>Customer Email:</strong> ' + sanitizeHtml(data.email) + '</p>';
	if (data.first_name || data.last_name) {
		html += '<p><strong>Customer Name:</strong> ' + sanitizeHtml(data.first_name + ' ' + data.last_name).trim() + '</p>';
	}
	html += '<p><strong>Payment Method:</strong> ' + sanitizeHtml(data.payment_type) + '</p>';
	html += '<p><strong>Purchase Date:</strong> ' + new Date(data.date * 1000).toLocaleString("en-US", { timeZone: "America/Los_Angeles" }) + '</p>';
	if (data.is_gift) {
		html += '<p><strong>🎁 This is a gift purchase</strong></p>';
	}
	html += '</div>';
	
	// Items
	html += '<div style="background-color: #fff; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">';
	html += '<h3 style="color: #343a40; margin-top: 0;">Items Purchased</h3>';
	
	for (var i = 0; i < data.items.length; i++) {
		var item = data.items[i];
		html += '<div style="border-left: 4px solid #007bff; padding-left: 15px; margin-bottom: 15px;">';
		html += '<h4 style="margin: 0 0 8px 0; color: #007bff;">' + sanitizeHtml(item.product_name) + '</h4>';
		html += '<p style="margin: 4px 0;"><strong>Product ID:</strong> ' + sanitizeHtml(item.product_id) + '</p>';
		html += '<p style="margin: 4px 0;"><strong>Quantity:</strong> ' + item.quantity + '</p>';
		if (item.product_permalink) {
			html += '<p style="margin: 4px 0;"><strong>Product Page:</strong> <a href="' + sanitizeHtml(item.product_permalink) + '" target="_blank">View on Payhip</a></p>';
		}
		html += '</div>';
	}
	html += '</div>';
	
	// Checkout Questions (if any)
	if (data.checkout_questions) {
		html += '<div style="background-color: #fff; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">';
		html += '<h3 style="color: #343a40; margin-top: 0;">📝 Checkout Questions</h3>';
		
		// Split the combined string back into individual Q&A pairs
		var questionPairs = data.checkout_questions.split(' || ');
		for (var j = 0; j < questionPairs.length; j++) {
			var pair = questionPairs[j];
			if (pair.trim()) {
				// Extract question and answer from "Q: question | A: answer" format
				var parts = pair.split(' | A: ');
				if (parts.length === 2) {
					var question = parts[0].replace('Q: ', '').trim();
					var answer = parts[1].trim();
					html += '<div style="border-left: 4px solid #17a2b8; padding-left: 15px; margin-bottom: 15px;">';
					html += '<p style="margin: 0 0 5px 0; font-weight: bold; color: #17a2b8;">' + sanitizeHtml(question) + '</p>';
					html += '<p style="margin: 0; color: #495057;">' + sanitizeHtml(answer) + '</p>';
					html += '</div>';
				}
			}
		}
		html += '</div>';
	}
	
	// Financial Breakdown
	html += '<div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">';
	html += '<h3 style="color: #343a40; margin-top: 0;">Financial Breakdown</h3>';
	html += '<p><strong>Gross Amount:</strong> ' + formatPrice(data.price, data.currency) + '</p>';
	html += '<p><strong>Stripe Fee:</strong> -' + formatPrice(data.stripe_fee, data.currency) + '</p>';
  html += '<p><strong>Paypal Fee:</strong> -' + formatPrice(data.paypal_fee, data.currency) + '</p>';
	html += '<p><strong>Payhip Fee:</strong> -' + formatPrice(data.payhip_fee, data.currency) + '</p>';
	var netAmount = data.price - data.stripe_fee - data.paypal_fee - data.payhip_fee;
	html += '<p style="font-size: 18px;"><strong>Net Amount:</strong> <span style="color: #28a745;">' + formatPrice(netAmount, data.currency) + '</span></p>';
	html += '</div>';
	
	// Footer
	html += '<div style="text-align: center; color: #6c757d; font-size: 12px; margin-top: 30px;">';
	html += '<p>This notification was automatically generated by your Payhip webhook integration.</p>';
	html += '</div>';
	
	html += '</div>';
	
	return html;
}

// Format price from cents to currency format
function formatPrice(priceInCents, currency) {
	var price = priceInCents / 100;
	var currencySymbols = {
		'USD': '$',
		'EUR': '€',
		'GBP': '£',
		'CAD': 'C$',
		'AUD': 'A$'
	};
	
	var symbol = currencySymbols[currency] || currency + ' ';
	return symbol + price.toFixed(2);
}

// Sanitize HTML content to prevent XSS
function sanitizeHtml(input) {
	if (!input) return '';
	return String(input)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#x27;');
} 