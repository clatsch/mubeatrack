
const apiUrl = 'http://localhost:3000/api/v1';
// ---- ACCOUNT ----
const login = async(email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${apiUrl}/users/login`,
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/shipments');
      }, 1200);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const forgotPassword = async email => {
  try {
      const res = await axios({
      method: 'POST',
      url: `${apiUrl}/users/forgotpassword`,
      data: {
        email,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Token send to E-Mail');
      window.setTimeout(() => {
        location.assign('/');
      }, 1200);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const resetPassword = async(password, passwordConfirm) => {
  const {pathname} = window.location;
  const pathArray = pathname.split('/');
  const token = pathArray[pathArray.length - 1];
  try {
      const res = await axios({
      method: 'PATCH',
      url: `${apiUrl}/users/resetPassword/`+ token,
      data: {
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Password successfully reset');
      window.setTimeout(() => {
        location.assign('/shipments');
      }, 1200);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const signup = async(employeeNumber, name, email, role, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${apiUrl}/users/signup`,
      data: {
        employeeNumber,
        name,
        email,
        role,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'User signed up successfully');
      window.setTimeout(() => {
        location.assign('/users');
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
      url: `${apiUrl}/users/logout`,
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
    const url = type === 'password' ? '0.0.0.0:3000/api/v1/users/updateMyPassword' : '0.0.0.0:3000/api/v1/users/updateMe';

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
      url: `${apiUrl}/shipments`,
    });

    if (res.data.status === 'success') {
      // showAlert('success', 'success');
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
                return (date.getDate()
                  .toString().length < 2 ? '0' : '') + date.getDate() + '.' + (month.toString().length > 1 ? month : '0' + month) + '.' + date.getFullYear();
              },
            },
            { data: 'customer.companyName' },
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
    const res = await axios({
      method: 'POST',
      url: `${apiUrl}/shipments`,
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
      url: `${apiUrl}/shipments/${id}`,
    });
    if (res.status === 204) {
      showAlert('success', 'Shipment successfully deleted.');
      showShipments();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const updateShipment = async(data, id) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `${apiUrl}/shipments/` + id,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Shipment successfully updated');
      window.setTimeout(() => {
        location.assign('/shipments');
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

// ---- CUSTOMERS ----

const showCustomers = async() => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${apiUrl}/customers`,
    });

    if (res.data.status === 'success') {
      // showAlert('success', 'success');
      $('#customersTable')
        .DataTable()
        .destroy();
      $('#customersTable')
        .on('click', '.delete-button', function() {
          const id = $(this)
            .attr('data-id');
          deleteCustomer(id);
        });
      $('#customersTable')
        .on('click', '.edit-button', function() {
          const id = $(this)
            .attr('id');
          location.assign(`/customer/${id}`);
        });

      $('#customersTable')
        .DataTable({
          'data': res.data.data.data,
          'columns': [
            {
              data: '_id',
              visible: false,
            },
            { data: 'customerNumber' },
            { data: 'companyName' },
            { data: 'address' },
            { data: 'zip' },
            { data: 'city' },
            { data: 'country' },
            { data: 'email' },
            { data: 'phone' },
            { data: 'website' },
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

const createCustomer = async data => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${apiUrl}/customers`,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'successfully created');
      window.setTimeout(() => {
        location.assign('/customers');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const deleteCustomer = async id => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${apiUrl}/customers/${id}`,
    });
    if (res.status === 204) {
      showAlert('success', 'Customer successfully deleted.');
      showCustomers();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const updateCustomer = async(data, id) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `${apiUrl}/customers/` + id,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Customer successfully updated');
      window.setTimeout(() => {
        location.assign('/customers');
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

// ---- USERS ----

const showUsers = async() => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${apiUrl}/users`,
    });

    if (res.data.status === 'success') {
      // showAlert('success', 'success');
      $('#usersTable')
        .DataTable()
        .destroy();
      $('#usersTable')
        .on('click', '.delete-button', function() {
          const id = $(this)
            .attr('data-id');
          deleteUser(id);
        });
      $('#usersTable')
        .on('click', '.edit-button', function() {
          const id = $(this)
            .attr('id');
          location.assign(`/user/${id}`);
        });

      $('#usersTable')
        .DataTable({
          'data': res.data.data.data,
          'columns': [
            {
              data: '_id',
              visible: false,
            },
            { data: 'employeeNumber' },
            { data: 'name' },
            { data: 'email' },
            { data: 'role' },
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

const deleteUser = async id => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${apiUrl}/users/${id}`,
    });
    if (res.status === 204) {
      showAlert('success', 'User successfully deleted.');
      showUsers();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const updateUser = async(data, id) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `${apiUrl}/users/` + id,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'User successfully updated');
      window.setTimeout(() => {
        location.assign('/users');
      }, 500);
    }
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
const forgotPasswordForm = document.querySelector('.form--forgotpassword');
const resetPasswordForm = document.querySelector('.form--resetpassword');
const logOutBtn = document.querySelector('.nav__el--logout');

const currentUserDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

const shipmentsTable = document.querySelector('.shipmentsTable');
const shipmentDataForm = document.querySelector('.form-shipment-data');
const newShipmentDataForm = document.querySelector('.form-new-shipment-data');

const customersTable = document.querySelector('.customersTable');
const customerDataForm = document.querySelector('.form-customer-data');
const newCustomerDataForm = document.querySelector('.form-new-customer-data');

const signupForm = document.querySelector('.form-new-user-data');
const usersTable = document.querySelector('.usersTable');
const userDataForm = document.querySelector('.form-worker-data');


// DELEGATION
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    forgotPassword(email);
  });
}
if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', e => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    resetPassword(password, passwordConfirm);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const employeeNumber = document.getElementById('employeeNumber').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const select = document.getElementById('role')
    const role = select.value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(
      employeeNumber,
      name,
      email,
      role,
      password,
      passwordConfirm);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (currentUserDataForm) {
  currentUserDataForm.addEventListener('submit', e => {
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

if (shipmentsTable) {
  showShipments();
}

if (newShipmentDataForm) {
  newShipmentDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const select = document.getElementById('companyName');
    const customer = select.value;
    const shipmentDate = document.getElementById('date').value;
    const amount = document.getElementById('amount').value;
    const inStock = document.getElementById('inStock').checked;
    const deliveryNote = document.getElementById('deliveryNote').checked;
    const rk = document.getElementById('rk').checked;
    const comment = document.getElementById('comment').value;
    const user = document.getElementById('userId').value;

    createShipment({
      shipmentDate,
      customer,
      amount,
      inStock,
      deliveryNote,
      rk,
      comment,
      user,
    });
  });
}

if (shipmentDataForm) {
  shipmentDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('shipmentId').value;
    const select = document.getElementById('companyName');
    const customer = select.value;
    const shipmentDate = document.getElementById('shipmentDate').value;
    const amount = document.getElementById('amount').value;
    const inStock = document.getElementById('inStock').checked;
    const deliveryNote = document.getElementById('deliveryNote').checked;
    const rk = document.getElementById('rk').checked;
    const comment = document.getElementById('comment').value;

    updateShipment({
      shipmentDate,
      customer,
      amount,
      inStock,
      deliveryNote,
      rk,
      comment,
    }, id);
  });
}

if (customersTable) {
  showCustomers();
}

if (newCustomerDataForm) {
  newCustomerDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const customerNumber = document.getElementById('customerNumber').value;
    const companyName = document.getElementById('companyName').value;
    const address = document.getElementById('address').value;
    const zip = document.getElementById('zip').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const website = document.getElementById('website').value;

    createCustomer({
      customerNumber,
      companyName,
      address,
      zip,
      city,
      country,
      email,
      phone,
      website,
    });
  });
}

if (customerDataForm) {
  customerDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('customerId').value;
    const customerNumber = document.getElementById('customerNumber').value;
    const companyName = document.getElementById('companyName').value;
    const address = document.getElementById('address').value;
    const zip = document.getElementById('zip').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const website = document.getElementById('website').value;

    updateCustomer({
      customerNumber,
      companyName,
      address,
      zip,
      city,
      country,
      email,
      phone,
      website,
    }, id);
  });
}

if (usersTable) {
  showUsers();
}

if (userDataForm) {
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('userId').value;
    const employeeNumber = document.getElementById('employeeNumber').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const select = document.getElementById('role');
    const role = select.value;


    updateUser({
      employeeNumber,
      name,
      email,
      role,
    }, id);
  });
}





