package com.code;

import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.code.Entity.Book;
import com.code.exception.BookNotFoundException;
import com.code.Repository.BookRepo;
import com.code.services.BookService;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(MockitoExtension.class)
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class BookServiceTest {

    @Mock
    private BookRepo bookRepo;

    @InjectMocks
    private BookService bookService;

    @Test
    void addBook_ShouldReturnSavedBook() {
        Book book = new Book(1L, "The Great Gatsby", "F. Scott Fitzgerald", 1925);
        when(bookRepo.save(book)).thenReturn(book);
        Book result = bookService.add(book);
        System.out.println("Saved Book: " + result);
    }

    @Test
    void getBooks_ShouldReturnAllBooks() {
        Book book1 = new Book(1L, "1984", "George Orwell", 1949);
        Book book2 = new Book(2L, "Brave New World", "Aldous Huxley", 1932);
        List<Book> books = Arrays.asList(book1, book2);
        when(bookRepo.findAll()).thenReturn(books);
        List<Book> result = bookService.get();
        System.out.println("All Books: " + result);
    }

    @Test
    void removeBook_ShouldReturnRemovedBookIfExists() {
        Book book = new Book(1L, "The Catcher in the Rye", "J.D. Salinger", 1951);
        when(bookRepo.findById(1L)).thenReturn(Optional.of(book));
        Book result = bookService.removeB(1L);
        System.out.println("Removed Book: " + result);
    }

    @Test
    void updateBookTitle_ShouldReturnUpdatedMessageIfBookExists() {
        Book book = new Book(1L, "Old Title", "Author", 1990);
        when(bookRepo.findById(1L)).thenReturn(Optional.of(book));
        String result = bookService.updateB(1L, "New Title");
        System.out.println("Update Result: " + result);
        System.out.println("Updated Book Title: " + book.getTitle());
    }

    @Test
    void getBookByID_ShouldReturnBookFoundIfExists() {
        Book book = new Book(1L, "Moby Dick", "Herman Melville", 1851);
        when(bookRepo.findById(1L)).thenReturn(Optional.of(book));
        String result = bookService.getBByID(1L);
        System.out.println("Get Book Result: " + result);
    }

   
}
