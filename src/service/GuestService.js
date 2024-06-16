export class GuestService {

    getGuests() {
        return fetch('/demo/data/guests.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
    
}
