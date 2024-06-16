export class ElectricityBillingPaymentService {

    getElectricityBillingPayments() {
        return fetch('/demo/data/electricity-billing-payment.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
    
}
