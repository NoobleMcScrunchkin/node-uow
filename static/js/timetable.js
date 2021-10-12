var weekCommencing = new Date();
let dayOfWeek = weekCommencing.getDay();
weekCommencing.setDate(weekCommencing.getDate() - dayOfWeek + 1);
weekCommencing.setHours(1, 0, 0, 0);
if (dayOfWeek == 0) {
    weekCommencing.setDate(weekCommencing.getDate() - 7);
}

class Timetable {
    static getTimetableInfo(startWeek) {
        if (!startWeek) {
            startWeek = new Date();
        }
        return new Promise((resolve, reject) => {
            const request = new Request(`./api/getTimetable?wc=${startWeek.toISOString()}`);
            fetch(request, {
                headers: {
                    'method': 'GET',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
            console.log('Success:', data);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        });
    }

    static prevWeek() {

    }

    static nextWeek() {
        
    }
}