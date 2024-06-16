export class TenantService {

    getTenants() {
        return fetch('/demo/data/tenants.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
    
}
