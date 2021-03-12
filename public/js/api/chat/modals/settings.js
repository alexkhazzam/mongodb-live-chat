fetch('/security').then((response) => {
  response.text().then((data) => {
    console.log(data);
    if (data.clientEmail && data.clientFirstName && data.clientLastName) {
      const firstName = document.getElementById('security-item__first-name');
      const lastName = document.getElementById('security-item__last-name');
      const email = document.getElementById('security-item__email');

      firstName.value = data.clientFirstName;
      lastName.value = data.clientLastName;
      email.value = data.clientEmail;
    }
  });
});
