function getTimetableInfo(startWeek) {
    if (!startWeek) {
        startWeek = new Date();
    }
    return new Promise((resolve, reject) => {
        const request = new Request(`./getTimetable?wc=${startWeek.toISOString()}`);
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