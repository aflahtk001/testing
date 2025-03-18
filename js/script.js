let events = JSON.parse(localStorage.getItem('events')) || []; // Load from localStorage

        function saveEventsToLocalStorage() {
            localStorage.setItem('events', JSON.stringify(events));
        }

        function createEvent() {
            const eventName = document.getElementById('eventName').value;
            const eventDate = document.getElementById('eventDate').value;
            const studentList = document.getElementById('studentList').value.split(',').map(s => s.trim());

            const event = {
                name: eventName,
                date: eventDate,
                students: studentList,
                attendance: {}
            };

            events.push(event);
            updateEventDropdowns();
            clearForm('event-form');
            saveEventsToLocalStorage();  
                alert('Event created successfully!');
        }

        function updateEventDropdowns() {
            const selectEvent = document.getElementById('selectEvent');
            const dashboardEvent = document.getElementById('dashboardEvent');
            selectEvent.innerHTML = '<option value="">Select Event</option>';
            dashboardEvent.innerHTML = '<option value="">Select Event</option>';

            events.forEach((event, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = event.name;
                selectEvent.appendChild(option);
                dashboardEvent.appendChild(option.cloneNode(true));
            });
        }

        function displayAttendanceList() {
            const eventIndex = document.getElementById('selectEvent').value;
            const attendanceListDiv = document.getElementById('attendanceList');
            attendanceListDiv.innerHTML = '';

            if (eventIndex === '') return;

            const event = events[eventIndex];
            event.students.forEach(student => {
                const label = document.createElement('label');
                label.textContent = student;
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `attendance-${student.replace(/\s+/g, '')}`;
                attendanceListDiv.appendChild(label);
                attendanceListDiv.appendChild(checkbox);
                attendanceListDiv.appendChild(document.createElement('br'));
            });
        }

        document.getElementById('selectEvent').addEventListener('change', displayAttendanceList);

        function markAttendance() {
            const eventIndex = document.getElementById('selectEvent').value;
            if (eventIndex === '') return;

            const event = events[eventIndex];
            event.students.forEach(student => {
                const checkbox = document.getElementById(`attendance-${student.replace(/\s+/g, '')}`);
                event.attendance[student] = checkbox.checked;
            });
            clearForm('attendance-form');
            document.getElementById('attendanceList').innerHTML = "";
            saveEventsToLocalStorage();  
                alert('Attendance marked successfully!'); 
        }

        function displayAttendanceDashboard() {
            const eventIndex = document.getElementById('dashboardEvent').value;
            const dashboardTableDiv = document.getElementById('attendanceDashboardTable');
            dashboardTableDiv.innerHTML = '';

            if (eventIndex === '') return;

            const event = events[eventIndex];
            const table = document.createElement('table');
            const headerRow = document.createElement('tr');
            const studentHeader = document.createElement('th');
            studentHeader.textContent = 'Student';
            const attendanceHeader = document.createElement('th');
            attendanceHeader.textContent = 'Attendance';
            headerRow.appendChild(studentHeader);
            headerRow.appendChild(attendanceHeader);
            table.appendChild(headerRow);

            event.students.forEach(student => {
                const row = document.createElement('tr');
                const studentCell = document.createElement('td');
                studentCell.textContent = student;
                const attendanceCell = document.createElement('td');
                attendanceCell.textContent = event.attendance[student] ? 'Present' : 'Absent';
                row.appendChild(studentCell);
                row.appendChild(attendanceCell);
                table.appendChild(row);
            });

            dashboardTableDiv.appendChild(table);
        }

        document.getElementById('dashboardEvent').addEventListener('change', displayAttendanceDashboard);

        function clearForm(formId){
            const form = document.getElementById(formId);
            const inputs = form.querySelectorAll('input[type="text"], input[type="date"]');
            inputs.forEach(input => input.value = "");
            document.getElementById("selectEvent").value = "";
            document.getElementById("dashboardEvent").value = "";
        }

        document.getElementById('createEventButton').addEventListener('click', createEvent);
        document.getElementById('markAttendanceButton').addEventListener('click', markAttendance);
        updateEventDropdowns();  
