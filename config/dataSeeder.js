const mongoose = require('mongoose');
const { Author, Book } = require('./models');
const bcrypt = require('bcrypt');

const authorsData = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    phone_no: '123-456-7890',
    password: 'password123',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone_no: '987-654-3210',
    password: 'password456',
  },
];

const booksData = [
  {
    title: 'Book Title 1',
    likes: 50,
    author: null,
  },
  {
    title: 'Book Title 2',
    likes: 30,
    author: null,
  },
  {
    title: 'Book Title 3',
    likes: 70,
    author: null,
  },
];

const seedData = async () => {
  try {
    await Author.deleteMany({});
    await Book.deleteMany({});

    const authorsWithHashedPasswords = await Promise.all(
      authorsData.map(async (authorData) => {
        const hashedPassword = await bcrypt.hash(authorData.password, 10);
        return {
          ...authorData,
          password: hashedPassword,
        };
      })
    );

    await Author.create(authorsWithHashedPasswords);

    const booksWithAuthors = booksData.map((book, index) => ({
      ...book,
      author: createdAuthors[index % createdAuthors.length]._id,
    }));

    await Book.create(booksWithAuthors);

    console.log('Data seeded successfully!');
  } catch (err) {
    console.error('Error seeding data:', err.message);
  }
};

module.exports = seedData;
