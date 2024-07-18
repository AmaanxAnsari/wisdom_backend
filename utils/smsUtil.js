import axios from "axios";

const sendOtpDealer = async (mobile, otp) => {
	const message =
		otp +
		" is your OTP for Consumer Premier League portal login. You can see your customers, their registered sales for the scheme period on the portal - JSW Steel";

	var url =
		"http://173.45.76.227/send.aspx?username=jswcpl&pass=jswcpl1234&route=trans1&senderid=JSWCPL&numbers=91" +
		mobile +
		"&message=" +
		message;

	await axios.get(url).then((res) => {
		const resData = res.data.toString();
		console.log(resData.length);
		if (resData.length > 2) {
			return true;
		} else {
			console.log(resData);
			return false;
		}
	});
	return await axios.get(url);
};

const sendOtpCustomer = async (mobile, otp) => {
	const message =
		otp +
		" is your OTP for Consumer Premier League portal login - JSW Steel";

	var url =
		"http://173.45.76.227/send.aspx?username=jswcpl&pass=jswcpl1234&route=trans1&senderid=JSWCPL&numbers=91" +
		mobile +
		"&message=" +
		message;

	await axios.get(url).then((res) => {
		const resData = res.data.toString();
		console.log(resData.length);
		if (resData.length > 2) {
			return true;
		} else {
			console.log(resData);
			return false;
		}
	});
	return await axios.get(url);
};

const sendRegistrationMessage = async (mobile, customerName, tncLink) => {
	var m = `Dear ${customerName}, Thank you for participating in the Consumer Premier League. Post successful verification of your data, you will get an entry in a Mega Lucky Draw. Visit : ${tncLink} to know more about the contest. - JSW Steel. *Terms & Conditions Apply.`;
	const message = encodeURIComponent(m);

	var url =
		"http://173.45.76.227/send.aspx?username=jswcpl&pass=jswcpl1234&route=trans1&senderid=JSWCPL&numbers=91" +
		mobile +
		"&message=" +
		message;

	await axios.get(url).then((res) => {
		const resData = res.data.toString();
	});
	return await axios.get(url);
};

const sendRegistrationMessageTN = async (mobile, customerName, tncLink) => {
	var m = `Dear ${customerName}, Thank you for participating in the Consumer Premier League. Post successful verification of your data, your entry will be confirmed for the contest. Visit : ${tncLink} to know more about the contest. - JSW Steel. *Terms & Conditions Apply.`;
	const message = encodeURIComponent(m);

	var url =
		"http://173.45.76.227/send.aspx?username=jswcpl&pass=jswcpl1234&route=trans1&senderid=JSWCPL&numbers=91" +
		mobile +
		"&message=" +
		message;

	await axios.get(url).then((res) => {
		const resData = res.data.toString();
	});
	return await axios.get(url);
};

const sendEntryConfirmationMessage = async (
	mobile,
	customerName,
	noOfCoupons
) => {
	var m = `Dear ${customerName}, Thank you for participating in the Consumer Premier League. Your entry is verified for the Mega Lucky Draw. You are assigned ${noOfCoupons} coupons for the Lucky Draw. You can check your coupon numbers by logging in to your profile using the given link : bit.ly/cpl_login - JSW Steel. *Terms & Conditions Apply.`;
	const message = encodeURIComponent(m);

	var url =
		"http://173.45.76.227/send.aspx?username=jswcpl&pass=jswcpl1234&route=trans1&senderid=JSWCPL&numbers=91" +
		mobile +
		"&message=" +
		message;

	await axios.get(url).then((res) => {
		const resData = res.data.toString();
	});
	return await axios.get(url);
};

const sendCouponMessageRetailer = async (
	mobile,
	customerName,
	noOfCoupons
) => {
	var m = `Dear ${customerName}, Thank you for participating in the Retailer Premier League. Your entry is verified for the Mega Lucky Draw. You are assigned ${noOfCoupons} coupons for the Lucky Draw. You can check your coupon numbers by logging in to your profile using the given link : bit.ly/jsw_rpl_login - JSW Steel. *Terms & Conditions Apply.`;
	const message = encodeURIComponent(m);

	var url =
		"http://173.45.76.227/send.aspx?username=jswcpl&pass=jswcpl1234&route=trans1&senderid=JSWCPL&numbers=91" +
		mobile +
		"&message=" +
		message;

	await axios.get(url).then((res) => {
		const resData = res.data.toString();
	});
	return await axios.get(url);
};

const sendEntryConfirmationNonTNSingleToken = async (
	mobile,
	customerName,
	tokenNumber
) => {
	var m = `Dear ${customerName}, Thank you for participating in the Consumer Premier League. Your entry is verified for the Mega Lucky Draw. Your token number is ${tokenNumber} for the Lucky Draw - JSW Steel. *Terms & Conditions Apply.`;
	const message = encodeURIComponent(m);

	var url =
		"http://173.45.76.227/send.aspx?username=jswcpl&pass=jswcpl1234&route=trans1&senderid=JSWCPL&numbers=91" +
		mobile +
		"&message=" +
		message;

	await axios.get(url).then((res) => {
		const resData = res.data.toString();
	});
	return await axios.get(url);
};

const sendEntryConfirmationNonTNMultipleToken = async (
	mobile,
	customerName,
	tokenNumber
) => {
	var m = `Dear ${customerName}, Thank you for participating in the Consumer Premier League. Your entry is verified for the Mega Lucky Draw. Your token numbers are ${tokenNumber} for the Lucky Draw - JSW Steel. *Terms & Conditions Apply.`;
	const message = encodeURIComponent(m);

	var url =
		"http://173.45.76.227/send.aspx?username=jswcpl&pass=jswcpl1234&route=trans1&senderid=JSWCPL&numbers=91" +
		mobile +
		"&message=" +
		message;

	await axios.get(url).then((res) => {
		const resData = res.data.toString();
	});
	return await axios.get(url);
};

const sendEntryConfirmationTN = async (
	mobile,
	customerName
) => {
	var m = `Dear ${customerName}, Thank you for participating in the Consumer Premier League. Your entry is verified and confirmed for the Tamil Nadu Consumer Premier League - JSW Steel. *Terms & Conditions Apply.`;
	const message = encodeURIComponent(m);

	var url =
		"http://173.45.76.227/send.aspx?username=jswcpl&pass=jswcpl1234&route=trans1&senderid=JSWCPL&numbers=91" +
		mobile +
		"&message=" +
		message;

	await axios.get(url).then((res) => {
		const resData = res.data.toString();
	});
	return await axios.get(url);
};

const sendDocumentDiscrepency = async (
	mobile,
	customerName,
	link
) => {
	var m = `Dear ${customerName}, We have observed a discrepancy in one of your invoices. Please visit ${link} to upload the correct invoice again to become eligible for Mega Lucky Draw - JSW Steel. *Terms & Conditions Apply.`;
	console.log(m);
	const message = encodeURIComponent(m);

	var url =
		"http://173.45.76.227/send.aspx?username=jswcpl&pass=jswcpl1234&route=trans1&senderid=JSWCPL&numbers=91" +
		mobile +
		"&message=" +
		message;

	await axios.get(url).then((res) => {
		const resData = res.data.toString();
	});
	return await axios.get(url);
};

const sendDocumentDiscrepencyTN = async (
	mobile,
	customerName,
	link
) => {
	var m = `Dear ${customerName}, We have observed a discrepancy in one of your invoices. Please visit ${link} to upload the correct invoice again to become eligible for the Tamil Nadu Consumer Premier League Contest - JSW Steel. *Terms & Conditions Apply.`;
	console.log(m);
	const message = encodeURIComponent(m);

	var url =
		"http://173.45.76.227/send.aspx?username=jswcpl&pass=jswcpl1234&route=trans1&senderid=JSWCPL&numbers=91" +
		mobile +
		"&message=" +
		message;

	await axios.get(url).then((res) => {
		const resData = res.data.toString();
	});
	return await axios.get(url);
};

export {
	sendOtpDealer,
	sendOtpCustomer,
	sendRegistrationMessage,
	sendRegistrationMessageTN,
	sendEntryConfirmationNonTNSingleToken,
	sendEntryConfirmationNonTNMultipleToken,
	sendEntryConfirmationTN,
	sendDocumentDiscrepency,
	sendDocumentDiscrepencyTN,
	sendEntryConfirmationMessage,
	sendCouponMessageRetailer
};
