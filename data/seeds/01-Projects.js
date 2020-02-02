
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, name: 'build tiny house', description: 'take up less space, own less junk', completed: false },
        {id: 2, name: 'build electric car', description: 'save the planet, run quietly, no smog', completed: false},
        {id: 3, name: 'travel to mars', description: 'what an exciting adventure!', completed: false}
      ]);
    });
};
