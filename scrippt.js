let studentsData = []; // Array to store fetched student data

// Fetch student data from the provided JSON file
fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
    .then(response => response.json())
    .then(data => {
        studentsData = data;
        renderTable(studentsData); // Render table on page load
    });

// Function to render the table with student data
function renderTable(data) {
    const table = document.getElementById('studentTable');
    table.innerHTML = ''; // Clear existing table

    // Table headers
    const headers = ['ID', 'Name', 'Email', 'Marks', 'Passing', 'Class', 'Gender'];
    const headerRow = table.insertRow();
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    // Table rows
    data.forEach(student => {
        const row = table.insertRow();
        const idCell = row.insertCell();
        const nameCell = row.insertCell();
        const emailCell = row.insertCell();
        const marksCell = row.insertCell();
        const passingCell = row.insertCell();
        const classCell = row.insertCell();
        const genderCell = row.insertCell();

        idCell.textContent = student.id;
        nameCell.innerHTML = `<img src="${student.img_src}" alt="${student.first_name} ${student.last_name}" width="40"> ${student.first_name} ${student.last_name}`;
        emailCell.textContent = student.email;
        marksCell.textContent = student.marks;
        passingCell.textContent = student.passing ? 'Passing' : 'Failed';
        classCell.textContent = student.class;
        genderCell.textContent = student.gender;
    });
}

// Function to handle search
function handleSearch() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = studentsData.filter(student => {
        return (
            student.first_name.toLowerCase().includes(searchInput) ||
            student.last_name.toLowerCase().includes(searchInput) ||
            student.email.toLowerCase().includes(searchInput)
        );
    });
    renderTable(filteredData);
}

// Sort functions
function sortAZ() {
    studentsData.sort((a, b) => (a.first_name + ' ' + a.last_name > b.first_name + ' ' + b.last_name ? 1 : -1));
    renderTable(studentsData);
}

function sortZA() {
    studentsData.sort((a, b) => (a.first_name + ' ' + a.last_name < b.first_name + ' ' + b.last_name ? 1 : -1));
    renderTable(studentsData);
}

function sortByMarks() {
    studentsData.sort((a, b) => a.marks - b.marks);
    renderTable(studentsData);
}

function sortByPassing() {
    const passingStudents = studentsData.filter(student => student.passing);
    renderTable(passingStudents);
}

function sortByClass() {
    studentsData.sort((a, b) => a.class - b.class);
    renderTable(studentsData);
}

function sortByGender() {
    const maleStudents = studentsData.filter(student => student.gender === 'Male');
    const femaleStudents = studentsData.filter(student => student.gender === 'Female');

    const table = document.getElementById('studentTable');
    table.innerHTML = ''; // Clear existing table

    renderTable(maleStudents);
    renderTable(femaleStudents);
}
