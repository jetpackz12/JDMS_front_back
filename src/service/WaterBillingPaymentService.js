export class WaterBillingPaymentService {

    getWaterBillingPayments() {
        return fetch('/demo/data/water-billing-payment.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
    
}
