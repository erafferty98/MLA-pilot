describe('Exercise API', () => {
  let id;

  it('Add a new exercise', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5300/exercises/add',
      body: {
        username: 'testuser',
        exerciseType: 'Running',
        description: 'Running 5km',
        duration: 30,
        date: new Date()
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Exercise added!');
      id = response.body._id; 
    });
  });

  it('Add a new squat exercise', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5300/exercises/add',
      body: {
        username: 'testuser',
        exerciseType: 'Gym',
        exerciseSubcategory: 'Squat',
        description: 'Legs',
        duration: 20,
        sets: 3,
        reps: 12,
        weightLifted: 100, 
        date: new Date()
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Exercise added!');
      // Optionally, store the ID if needed for later
    });
  });

  it('Retrieve all exercises', () => {
    cy.request('http://localhost:5300/exercises').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length.greaterThan(0);
    });
  });
});
