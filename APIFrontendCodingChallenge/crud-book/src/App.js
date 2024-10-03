// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [signupEmail, setSignupEmail] = useState('');
//   const [signupPassword, setSignupPassword] = useState('');
//   const [name, setName] = useState('');
//   const [userRole, setUserRole] = useState('0'); // Admin = 0, User = 1
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [publicationYear, setPublicationYear] = useState('');
//   const [isbn, setIsbn] = useState(''); // Treating ISBN as long
//   const [newTitle, setNewTitle] = useState('');
//   const [books, setBooks] = useState([]);
//   const [fetchedBook, setFetchedBook] = useState(null);

//   // Fetch all books when the component loads after login
//   const fetchBooks = () => {
//     const token = localStorage.getItem('token');
//     axios
//       .get('http://localhost:9000/api/admin/getBooks', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setBooks(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching the books!', error);
//       });
//   };

//   // Handle login
//   const loginUser = (e) => {
//     e.preventDefault();
//     const loginData = { email, password };

//     axios
//       .post('http://localhost:9000/api/auth/login', loginData)
//       .then((response) => {
//         const token = response.data.jwt;
//         localStorage.setItem('token', token);
//         alert('Login successful!');
//         fetchBooks();
//       })
//       .catch((error) => {
//         console.error('Login failed!', error);
//         alert('Login failed! Please check your credentials.');
//       });
//   };

//   // Handle signup
//   const signupUser = (e) => {
//     e.preventDefault();
//     const signupData = {
//       email: signupEmail,
//       password: signupPassword,
//       name,
//       userRole: parseInt(userRole, 10),
//     };

//     axios
//       .post('http://localhost:9000/api/auth/signup', signupData)
//       .then(() => {
//         alert('Signup successful! You can now log in.');
//       })
//       .catch((error) => {
//         console.error('Signup failed!', error);
//         alert('Signup failed! Please try again.');
//       });
//   };

//   // Add a book
//   const addBook = (e) => {
//     e.preventDefault();
//     const book = { title, author, publicationYear: parseInt(publicationYear, 10) };
//     const token = localStorage.getItem('token');

//     axios
//       .post('http://localhost:9000/api/admin/addNewBook', book, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       })
//       .then(() => {
//         alert('Book added successfully');
//         fetchBooks();
//       })
//       .catch((error) => {
//         console.error('Error adding the book!', error);
//       });
//   };

//   // Update book title
//   const updateBook = (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     axios
//       .put(`http://localhost:9000/api/admin/updateBook/${isbn}/${newTitle}`, {}, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then(() => {
//         alert('Book updated successfully');
//         fetchBooks();
//       })
//       .catch((error) => {
//         console.error('Error updating the book!', error);
//       });
//   };

//   const getBookById = (e) => {
//     e.preventDefault();
    
//     const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
  
//     axios
//       .get(`http://localhost:9000/api/admin/getBookById/${isbn}`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//         },
//       })
//       .then((response) => {
//         if (response.status === 200) {
//           setFetchedBook(response.data);
//           alert('Book found!');
//         }
//       })
//       .catch((error) => {
//         if (error.response && error.response.status === 404) {
//           alert('Book not found!');
//         } else if (error.response && error.response.status === 403) {
//           alert('You are not authorized to access this resource.');
//         } else {
//           console.error('Error fetching the book!', error);
//         }
//       });
//   };
  

//   // Remove book
//   const removeBook = (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     axios
//       .delete(`http://localhost:9000/api/admin/removeBook/${isbn}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then(() => {
//         alert('Book removed successfully');
//         fetchBooks();
//       })
//       .catch((error) => {
//         console.error('Error removing the book!', error);
//       });
//   };

//   return (
//     <div>
//       <h1>Login & Signup</h1>

//       {/* Login Form */}
//       <h2>Login</h2>
//       <form onSubmit={loginUser}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>

//       {/* Signup Form */}
//       <h2>Signup</h2>
//       <form onSubmit={signupUser}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={signupEmail}
//           onChange={(e) => setSignupEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={signupPassword}
//           onChange={(e) => setSignupPassword(e.target.value)}
//           required
//         />
//         <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
//           <option value="0">Admin</option>
//           <option value="1">User</option>
//         </select>
//         <button type="submit">Signup</button>
//       </form>

//       {/* Book Management Section */}
//       <h1>Book Management</h1>

//       {/* Add Book */}
//       <h2>Add New Book</h2>
//       <form onSubmit={addBook}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Author"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Publication Year"
//           value={publicationYear}
//           onChange={(e) => setPublicationYear(e.target.value)}
//           required
//         />
//         <button type="submit">Add Book</button>
//       </form>

//       {/* Update Book Title */}
//       <h2>Update Book Title</h2>
//       <form onSubmit={updateBook}>
//         <input
//           type="number"
//           placeholder="ISBN"
//           value={isbn}
//           onChange={(e) => setIsbn(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="New Title"
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//           required
//         />
//         <button type="submit">Update Book</button>
//       </form>

//       {/* Remove Book */}
//       <h2>Remove Book</h2>
//       <form onSubmit={removeBook}>
//         <input
//           type="number"
//           placeholder="ISBN"
//           value={isbn}
//           onChange={(e) => setIsbn(e.target.value)}
//           required
//         />
//         <button type="submit">Remove Book</button>
//       </form>

//       {/* List of Books */}
//       <h2>Book List</h2>
//       <ul>
//         {books.map((book) => (
//           <li key={book.isbn}>
//             {book.title} by {book.author} (Published: {book.publicationYear})
//           </li>
//         ))}
//       </ul>

//       {/* Get Book by ISBN */}
//       <h2>Get Book by ISBN</h2>
//       <form onSubmit={getBookById}>
//         <input
//           type="number"
//           placeholder="Enter ISBN"
//           value={isbn}
//           onChange={(e) => setIsbn(e.target.value)}
//           required
//         />
//         <button type="submit">Get Book</button>
//       </form>
//       {fetchedBook && (
//         <div>
//           <h3>Book Details</h3>
//           <p>Title: {fetchedBook.title}</p>
//           <p>Author: {fetchedBook.author}</p>
//           <p>Publication Year: {fetchedBook.publicationYear}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Modal,
  Form,
  Header,
  List,
  Select,
  Input,
  Segment,
  Container,
  Grid,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'; // Import Semantic UI CSS
import './App.css'; // Import custom CSS for additional styling

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [name, setName] = useState('');
  const [userRole, setUserRole] = useState('0'); // Admin = 0, User = 1
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [isbn, setIsbn] = useState(''); // Treating ISBN as long
  const [newTitle, setNewTitle] = useState('');
  const [books, setBooks] = useState([]); // State to hold the list of books
  const [fetchedBook, setFetchedBook] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status
  const [openLoginModal, setOpenLoginModal] = useState(false); // State to control login modal
  const [openSignupModal, setOpenSignupModal] = useState(false); // State to control signup modal

  // Fetch all books when the component loads after login
  const fetchBooks = () => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:9000/api/admin/getBooks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching the books!', error);
      });
  };

  // Handle login
  const loginUser = (e) => {
    e.preventDefault();
    const loginData = { email, password };

    axios
      .post('http://localhost:9000/api/auth/login', loginData)
      .then((response) => {
        const token = response.data.jwt;
        localStorage.setItem('token', token);
        setIsLoggedIn(true); // Set logged in state
        setOpenLoginModal(false); // Close login modal
        alert('Login successful!');
        fetchBooks(); // Fetch books after login
      })
      .catch((error) => {
        console.error('Login failed!', error);
        alert('Login failed! Please check your credentials.');
      });
  };

  // Handle signup
  const signupUser = (e) => {
    e.preventDefault();
    const signupData = {
      email: signupEmail,
      password: signupPassword,
      name,
      userRole: parseInt(userRole, 10),
    };

    axios
      .post('http://localhost:9000/api/auth/signup', signupData)
      .then(() => {
        alert('Signup successful! You can now log in.');
        setOpenSignupModal(false); // Close signup modal
      })
      .catch((error) => {
        console.error('Signup failed!', error);
        alert('Signup failed! Please try again.');
      });
  };

  // Add a book
  const addBook = (e) => {
    e.preventDefault();
    const book = { title, author, publicationYear: parseInt(publicationYear, 10) };
    const token = localStorage.getItem('token');

    axios
      .post('http://localhost:9000/api/admin/addNewBook', book, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        alert('Book added successfully');
        fetchBooks(); // Fetch updated book list
      })
      .catch((error) => {
        console.error('Error adding the book!', error);
      });
  };

  // Update book title
  const updateBook = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios
      .put(`http://localhost:9000/api/admin/updateBook/${isbn}/${newTitle}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert('Book updated successfully');
        fetchBooks(); // Fetch updated book list
      })
      .catch((error) => {
        console.error('Error updating the book!', error);
      });
  };

  const getBookById = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Retrieve JWT token from local storage

    axios
      .get(`http://localhost:9000/api/admin/getBookById/${isbn}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setFetchedBook(response.data);
          alert('Book found!');
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert('Book not found!');
        } else if (error.response && error.response.status === 403) {
          alert('You are not authorized to access this resource.');
        } else {
          console.error('Error fetching the book!', error);
        }
      });
  };

  // Remove book
  const removeBook = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios
      .delete(`http://localhost:9000/api/admin/removeBook/${isbn}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert('Book removed successfully');
        fetchBooks(); // Fetch updated book list
      })
      .catch((error) => {
        console.error('Error removing the book!', error);
      });
  };

  return (
    <Container className="app-container">
      <Header as="h1" textAlign="center">Book Management</Header>

      <div className="button-container">
        <Button primary onClick={() => setOpenLoginModal(true)}>
          Login
        </Button>
        <Button secondary onClick={() => setOpenSignupModal(true)}>
          Signup
        </Button>
      </div>

      {/* Login Modal */}
      <Modal open={openLoginModal} onClose={() => setOpenLoginModal(false)}>
        <Header content="Login" />
        <Modal.Content>
          <Form onSubmit={loginUser}>
            <Form.Field>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Field>
            <Button type="submit" primary fluid>Login</Button>
          </Form>
        </Modal.Content>
      </Modal>

      {/* Signup Modal */}
      <Modal open={openSignupModal} onClose={() => setOpenSignupModal(false)}>
        <Header content="Signup" />
        <Modal.Content>
          <Form onSubmit={signupUser}>
            <Form.Field>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <Select
                placeholder="User Role"
                value={userRole}
                onChange={(e, { value }) => setUserRole(value)}
                options={[
                  { key: 0, text: 'Admin', value: '0' },
                  { key: 1, text: 'User', value: '1' },
                ]}
              />
            </Form.Field>
            <Button type="submit" secondary fluid>Signup</Button>
          </Form>
        </Modal.Content>
      </Modal>

      {/* Book Management Section */}
      {isLoggedIn && (
        <Segment>
          <Header as="h2" textAlign="center">Book Management</Header>

          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3">Add Book</Header>
                <Form onSubmit={addBook}>
                  <Form.Field>
                    <Input
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      placeholder="Author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      type="number"
                      placeholder="Publication Year"
                      value={publicationYear}
                      onChange={(e) => setPublicationYear(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Button type="submit" primary>Add Book</Button>
                </Form>
              </Grid.Column>

              <Grid.Column>
                <Header as="h3">Update Book</Header>
                <Form onSubmit={updateBook}>
                  <Form.Field>
                    <Input
                      type="number"
                      placeholder="ISBN"
                      value={isbn}
                      onChange={(e) => setIsbn(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      placeholder="New Title"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Button type="submit" primary>Update Book</Button>
                </Form>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Header as="h3">Remove Book</Header>
                <Form onSubmit={removeBook}>
                  <Form.Field>
                    <Input
                      type="number"
                      placeholder="ISBN"
                      value={isbn}
                      onChange={(e) => setIsbn(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Button type="submit" primary>Remove Book</Button>
                </Form>
              </Grid.Column>

              <Grid.Column>
                <Header as="h3">Fetch Book</Header>
                <Form onSubmit={getBookById}>
                  <Form.Field>
                    <Input
                      type="number"
                      placeholder="ISBN"
                      value={isbn}
                      onChange={(e) => setIsbn(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Button type="submit" primary>Get Book</Button>
                </Form>
                {/* {fetchedBook && (
                  <div>
                    <h4>Fetched Book:</h4>
                    <p>Title: {fetchedBook.title}</p>
                    <p>Author: {fetchedBook.author}</p>
                    <p>Publication Year: {fetchedBook.publicationYear}</p>
                    <p>ISBN: {fetchedBook.isbn}</p>
                  </div>
                )} */}
              </Grid.Column>
            </Grid.Row>
          </Grid>

          {/* Display Available Books */}
          <Header as="h3" style={{ color: "rgb(105, 175, 227)" }}>Available Books</Header>

          <List>
            {books.map((book) => (
              <List.Item key={book.isbn}>
                <List.Header>{book.title}</List.Header>
                <List.Description>
                  Author: {book.author}, Year: {book.publicationYear}
                </List.Description>
              </List.Item>
            ))}
          </List>
        </Segment>
      )}
    </Container>
  );
}

export default App;
