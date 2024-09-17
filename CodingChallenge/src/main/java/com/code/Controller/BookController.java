package com.code.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.code.Entity.Book;
import com.code.services.BookService;

@RestController
@RequestMapping("/api/admin")
public class BookController {

    @Autowired
    BookService bookService;
    
    @PostMapping("/addNewBook")
    public Book addNewBook(@RequestBody Book b) {
        Book b2 = bookService.add(b);
        return b2;
    }
    
    @GetMapping("/getBooks")
    public List<Book> getBooks(){
    	List<Book> books = bookService.get();
    	return books;
    }
    
    @DeleteMapping("/removeBook/{isbn}")
    public Book removeBook(@PathVariable long isbn) {
    	Book b = bookService.removeB(isbn);
    	return b;
    }
    
    @PutMapping("/updateBook/{isbn}/{nm}")
    public String updateBook(@PathVariable long isbn, @PathVariable String nm) {
    	String r = bookService.updateB(isbn,nm);
    	return r;
    }
    
    @GetMapping("/getBookById/{isbn}")
    public String getBookById(@PathVariable long isbn) {
    	String r = bookService.getBByID(isbn);
    	return r;
    }
}
