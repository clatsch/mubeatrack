// ---- ACCOUNT ----
const login = async(email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/overview');
      }, 1200);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const logout = async() => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};

// Type is either 'password' or 'data
const updateSettings = async(data, type) => {
  try {
    const url = type === 'password' ? 'http://localhost:3000/api/v1/users/updateMyPassword' : 'http://localhost:3000/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

// ---- SHIPMENTS ----
const showShipments = async() => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/shipments',
    });

    if (res.data.status === 'success') {
      showAlert('success', 'success');
      $('#shipmentsTable')
        .DataTable()
        .destroy();
      $('#shipmentsTable')
        .on('click', '.delete-button', function() {
          const id = $(this)
            .attr('data-id');
          deleteShipment(id);
        });
      $('#shipmentsTable')
        .on('click', '.edit-button', function() {
          const id = $(this)
            .attr('id');
          location.assign(`/shipment/${id}`);
        });

      $('#shipmentsTable')
        .DataTable({
          'data': res.data.data.data,
          'columns': [
            {
              data: '_id',
              visible: false,
            },
            {
              data: 'shipmentDate',
              render: function(data) {
                let date = new Date(data);
                let month = date.getMonth() + 1;
                return (date.getDate().toString().length < 2 ? '0' : '') + date.getDate() + '.' + (month.toString().length > 1 ? month : '0' + month) + '.' + date.getFullYear();
              },
            },
            { data: 'client.companyName' },
            { data: 'amount' },
            {
              data: 'inStock',
              render: function(data) {
                if (data) {
                  return '<input type="checkbox" checked disabled>';
                } else {
                  return '<input type="checkbox" disabled>';
                }
              },
              orderable: false,
            },
            {
              data: 'deliveryNote',
              render: function(data) {
                if (data) {
                  return '<input type="checkbox" checked disabled>';
                } else {
                  return '<input type="checkbox" disabled>';
                }
              },
              orderable: false,
            },
            {
              data: 'rk',
              render: function(data) {
                if (data) {
                  return '<input type="checkbox" checked disabled>';
                } else {
                  return '<input type="checkbox" disabled>';
                }
              },
              orderable: false,
            },
            {
              data: 'comment',
              orderable: false,
            },
            {
              data: '_id',
              render: function(data) {
                return '<a href="#" id="' + data + '" class="edit-button"><i class="fas fa-edit"></i></a>' + '   ' + '<a href="#" data-id="' + data + '" class="delete-button"><i class="fas fa-trash-alt"></i></a>';
              },
              orderable: false,
            },
          ],
        });
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const createShipment = async data => {
  try {
    // Get the id of the currently logged in user

    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/shipments',
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'successfully created');
      window.setTimeout(() => {
        location.assign('/shipments');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const deleteShipment = async id => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://localhost:3000/api/v1/shipments/${id}`,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Shipment successfully deleted.');
      showShipments();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

// ---- CLIENTS ----

const showClients = async() => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/clients',
    });

    if (res.data.status === 'success') {
      showAlert('success', 'success');
      $('#clientsTable')
        .DataTable()
        .destroy();
      $('#clientsTable')
        .DataTable({
          'data': res.data.data.data,
          'columns': [
            {
              data: '_id',
              visible: false,
            },
            { data: 'companyName' },
            { data: 'customerNumber' },
            { data: 'email' },
            {
              data: '_id',
              render: function(data) {
                return '<button id="' + data + '" class="delete-button">Delete</button>' + ' ' + '<button id="' + data + '" class="edit-button">Edit</button>';
              },
            },
          ],
        });
    }
    const deleteButtons = document.getElementsByClassName('delete-button');
    const editButtons = document.getElementsByClassName('edit-button');
    const deleteButtonPressed = e => {
      deleteClient(e.target.id);
    };

    const editButtonPressed = e => {
      location.assign(`/shipment/${e.target.id}`);
    };

    for (let button of deleteButtons) {
      button.addEventListener('click', deleteButtonPressed);
    }

    for (let button of editButtons) {
      button.addEventListener('click', editButtonPressed);
    }

  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

// const createClient = async(companyName, customerNumber, email) => {
const createClient = async data => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/clients',
      data,
    });
    console.log(res.data.status);
    if (res.data.status === 'success') {
      showAlert('success', 'successfully created');
      window.setTimeout(() => {
        location.assign('/clients');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const editClient = async data => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/api/v1/clients',
      data,
    });
    console.log(res.data.status);
    if (res.data.status === 'success') {
      showAlert('success', 'successfully created');
      window.setTimeout(() => {
        location.assign('/clients');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const deleteClient = async id => {
  try {
    await axios({
      method: 'DELETE',
      url: 'http://localhost:3000/api/v1/clients/' + id,
    });
    showClients();
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

// ---- ALERTS ----
const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body')
    .insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

// DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const newClientDataForm = document.querySelector('.form-client-data');
const clientDataForm = document.querySelector('.form-client-data');
const clientsTable = document.querySelector('.clientsTable');
const shipmentsTable = document.querySelector('.shipmentsTable');
const newShipmentDataForm = document.querySelector('.form-shipment-data');

// DELEGATION
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm) {
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      {
        passwordCurrent,
        password,
        passwordConfirm,
      },
      'password',
    );

    document.querySelector('.btn--save-password').textContent = 'Save Password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (newClientDataForm) {
  newClientDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const companyName = document.getElementById('companyName').value;
    const customerNumber = document.getElementById('customerNumber').value;
    const email = document.getElementById('email').value;

    createClient({
      companyName,
      customerNumber,
      email,
    });
  });
}

if (clientDataForm) {
  newClientDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const companyName = document.getElementById('companyName').value;
    const customerNumber = document.getElementById('customerNumber').value;
    const email = document.getElementById('email').value;

    createClient({
      companyName,
      customerNumber,
      email,
    });
  });
}

if (clientsTable) {
  showClients();
}

if (shipmentsTable) {
  showShipments();
}

if (newShipmentDataForm) {
  newShipmentDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const select = document.getElementById('companyName');
    const client = select.value;
    const shipmentDate = document.getElementById('date').value;
    const amount = document.getElementById('amount').value;
    const inStock = document.getElementById('inStock').checked;
    const deliveryNote = document.getElementById('deliveryNote').checked;
    const rk = document.getElementById('rk').checked;
    const comment = document.getElementById('comment').value;
    const user = document.getElementById('userId').value;

    createShipment({
      shipmentDate,
      client,
      amount,
      inStock,
      deliveryNote,
      rk,
      comment,
      user,
    });
  });
}



