
let supportedInstruments = [{
  supportedMethods: ['basic-card'],
  data: {
    supportedNetworks: [
      'visa', 'mastercard', 'amex', 'discover',
      'diners', 'jcb', 'unionpay'
    ]
  }
}];

const paymentRequestService = async (details) => {
  let request = new PaymentRequest(supportedInstruments, details);

  
  try {
    const result = await request.show();
    return result
  } catch (error) {
    console.log(error)
  }
}

export default paymentRequestService;