
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {id: 1, name: 'Conf Rm X', description: 'holds 50 people, near the library'},
        {id: 2, name: 'projector', description: 'portable'},
        {id: 3, name: 'dry erase board', description: 'on wheels, 4ft by 6ft'}
      ]);
    });
};
