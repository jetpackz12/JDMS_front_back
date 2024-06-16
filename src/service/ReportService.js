export class ReportService {

    getReports() {
        return fetch('/demo/data/reports.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
    
}
