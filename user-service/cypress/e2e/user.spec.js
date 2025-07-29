describe('User Service E2E Tests', () => {
  // Generar email único por timestamp para evitar usuario existente
  const timestamp = Date.now();
  const user = {
    name: 'E2E User',
    email: `e2euser+${timestamp}@example.com`,
    password: 'Password123!'
  };
  let token;

  it('Registers a new user and returns a token', () => {
    cy.request('POST', '/api/users/register', user)
      .then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('token');
        expect(response.body).to.have.property('_id');
        expect(response.body.email).to.equal(user.email);
        token = response.body.token;
      });
  });

  it('Logs in with the new user and validates the token', () => {
    cy.request('POST', '/api/users/login', { email: user.email, password: user.password })
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');
        token = response.body.token;
      });
  });

  it('Fetches the user profile with the token', () => {
    cy.request({
      method: 'GET',
      url: '/api/users/profile',
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('email', user.email);
      expect(response.body).to.have.property('name', user.name);
    });
  });
});
