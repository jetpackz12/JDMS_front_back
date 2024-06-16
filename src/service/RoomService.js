export class RoomService {

    getRooms() {
        return fetch('/demo/data/rooms.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
    
}
