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

// ---- CLIENTS ----

const showClients = async() => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/clients',
    });

    if (res.data.status === 'success') {
      showAlert('success', 'successfully fetched');

      $('#clientTable')
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
              render : function( data ) {
                return '<button id="' + data + '" class="delete-button">Delete</button>';
              }},
          ],
        });
    }
    const buttons = document.getElementsByClassName('delete-button');
    const buttonPressed = e => {
      deleteClient(e.target.id);
    }


    for (let button of buttons) {
      button.addEventListener('click', buttonPressed);
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
        location.assign('/overview');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const deleteClient = async id => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: 'http://localhost:3000/api/v1/clients/' + id,
    });
    $('#clientTable').data.reload();


    if (res.data.status === 'success') {
      showAlert('success', 'successfully deleted');
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
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const clientDataForm = document.querySelector('.form-client-data');
const clientTable = document.querySelector('.clientTable');

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

if (clientDataForm) {
  clientDataForm.addEventListener('submit', e => {
    e.preventDefault();
    // const form = new FormData();
    const companyName = document.getElementById('companyName').value;
    const customerNumber = document.getElementById('customerNumber').value;
    const email = document.getElementById('email').value;
    // form.append('companyName', document.getElementById('companyName').value)
    // form.append('customerNumber', document.getElementById('customerNumber').value)
    // form.append('email', document.getElementById('email').value)

    createClient({
      companyName,
      customerNumber,
      email,
    });
  });
}

if (clientTable) {
  showClients();
}



