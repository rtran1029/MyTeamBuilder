const { test, expect } = require('@jest/globals');
const Engineer = require('../lib/Engineer');

test('gets Engineer GitHub username', () => {
    const data = {
        name: "Richard",
        id: 1,
        email: "richardtran@gmail.com",
        username: 'rtran1029'
    };
    const engineer = new Engineer(data);

    expect(engineer.username).toBe('rtran1029');
});

test('gets Engineer role', () => {
    const data = {
        name: "Richard",
        id: 1,
        email: "richardtran@gmail.com",
        username: 'rtran1029'
    };
    const engineer = new Engineer(data);

    expect(engineer.role).toBe('Engineer');
});