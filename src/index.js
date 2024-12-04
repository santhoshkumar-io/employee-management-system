import './styles.css';
const employees = [
  {
    id: '227579',
    firstName: 'Santhosh',
    lastName: 'Kumar',
    dob: '19-02-2003',
    doj: '21-08-2024',
    grade: 'M1',
  },
  {
    id: '227578',
    firstName: 'Adel',
    lastName: 'Mairam',
    dob: '22-04-2003',
    doj: '21-10-2024',
    grade: 'M2',
  },
  {
    id: '227570',
    firstName: 'Asfaq',
    lastName: 'Moideen',
    dob: '18-08-2002',
    doj: '23-08-2024',
    grade: 'M1',
  },
  {
    id: '227581',
    firstName: 'Jasmine',
    lastName: 'Shaik',
    dob: '11-07-2002',
    doj: '21-08-2024',
    grade: 'M1',
  },
  {
    id: '227573',
    firstName: 'Sabarish',
    lastName: 'Sanjay',
    dob: '13-09-2003',
    doj: '21-08-2024',
    grade: 'M3',
  },
  {
    id: '227582',
    firstName: 'Balaji',
    lastName: 'Bharat',
    dob: '04-03-2003',
    doj: '21-11-2024',
    grade: 'M1',
  },
];
const convertToISODate = date => {
  const [day, month, year] = date.split('-');
  return `${year}-${month}-${day}`;
};


document.addEventListener('DOMContentLoaded', () => {
  const table = document.querySelector('#employee-table');
  const viewModal = document.getElementById('view-modal');
  const updateModal = document.getElementById('update-modal');
  const viewDetails = document.getElementById('view-details');
  const modalOverlay = document.getElementById('modal-overlay');
  const closeView = document.getElementById('close-view');
  const closeUpdate = document.getElementById('close-update');
  const updateForm = document.getElementById('update-form');

  const showModal = modal => {
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
  };

  const hideModal = modal => {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
  };

  const populateTable = () => {
    table.innerHTML = '';
    const headerRow = document.createElement('tr');
    headerRow.className = 'table-header';
    const headers = [
      'Employee Id',
      'Employee Name',
      'Date of Birth',
      'Date of Joining',
      'Grade',
      'Actions',
    ];
    headers.forEach(header => {
      const headerCell = document.createElement('th');
      headerCell.className = 'table-cell';
      headerCell.textContent = header;
      headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);

    employees.forEach(employee => {
      const row = document.createElement('tr');
      row.className = 'table-row';

      const values = [
        employee.id,
        `${employee.firstName} ${employee.lastName}`,
        employee.dob,
        employee.doj,
        employee.grade,
      ];

      values.forEach(value => {
        const cell = document.createElement('td');
        cell.className = 'table-cell';
        cell.textContent = value;
        row.appendChild(cell);
      });

      const actionCell = document.createElement('td');
      actionCell.className = 'table-cell';
      const viewIcon = document.createElement('i');
      const updateIcon = document.createElement('i');

      viewIcon.className = 'fa-solid fa-eye';
      updateIcon.className = 'fa-solid fa-user-pen';

      viewIcon.addEventListener('click', () => {
        showModal(viewModal);
        viewDetails.innerHTML = `
          <p><span>Id:</span> ${employee.id}</p>
          <p><span>Name:</span> ${employee.firstName} ${employee.lastName}</p>
          <p><span>Date of Birth:</span> ${employee.dob}</p>
          <p><span>Date of Joining:</span> ${employee.doj}</p>
          <p><span>Grade:</span> ${employee.grade}</p>
        `;
      });

      updateIcon.addEventListener('click', () => {
        showModal(updateModal);
        document.getElementById('update-id').value = employee.id;
        document.getElementById('update-fname').value = employee.firstName;
        document.getElementById('update-lname').value = employee.lastName;
        document.getElementById('update-dob').value = convertToISODate(
          employee.dob
        );
        document.getElementById('update-doj').value = convertToISODate(
          employee.doj
        );
        document.getElementById('update-grade').value = employee.grade;
      });

      actionCell.appendChild(viewIcon);
      actionCell.appendChild(updateIcon);
      row.appendChild(actionCell);
      table.appendChild(row);
    });
  };

  closeView.addEventListener('click', () => hideModal(viewModal));
  closeUpdate.addEventListener('click', () => hideModal(updateModal));

  updateForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('update-id').value;
    const fname = document.getElementById('update-fname').value;
    const lname = document.getElementById('update-lname').value;
    const dob = document.getElementById('update-dob').value;
    const doj = document.getElementById('update-doj').value;
    const grade = document.getElementById('update-grade').value;

    const employee = employees.find(emp => emp.id === id);
    if (employee) {
      employee.firstName = fname;
      employee.lastName = lname;
      employee.dob = convertToISODate(dob);
      employee.doj = convertToISODate(doj);
      employee.grade = grade;
    }
    hideModal(updateModal);
    populateTable();
  });

  populateTable();
});
