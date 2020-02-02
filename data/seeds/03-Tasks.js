
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1, description: 'buy land', notes: 'at least 1 acre', completed: false, project_id: 1},
        {id: 2, description: 'make blueprint design', notes: 'must include bed, desk, kitchen, bathroom', completed: false, project_id: 1},
        {id: 3, description: 'order material', notes: 'trailer, wood, doors, windows', completed: false, project_id: 1},
        {id: 4, description: 'research', notes: 'find out the best way to build EV', completed: false, project_id: 2},
        {id: 5, description: 'buy old car', notes: 'must be lightweight and under $1,000', completed: false, project_id: 2},
        {id: 6, description: 'look for workshop', notes: 'must be able to fit car inside', completed: false, project_id: 2},
        {id: 7, description: 'build a rocket', notes: 'must be able to carry 10 people', completed: false, project_id: 3},
        {id: 8, description: 'build habitat station', notes: 'must support 10 people for 1 year', completed: false, project_id: 3},
        {id: 9, description: 'launch', notes: 'lift-off!!!', completed: false, project_id: 3}
      ]);
    });
};
