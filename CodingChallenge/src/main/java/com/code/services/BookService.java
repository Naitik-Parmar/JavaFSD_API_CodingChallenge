package com.code.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.code.Entity.Book;
import com.code.Repository.BookRepo;
import com.code.exception.BookNotFoundException;

@Service
public class BookService {

	@Autowired
	BookRepo repo;

	public Book add(Book b) {
		// TODO Auto-generated method stub
		Book b2 = repo.save(b);
		return b2;
	}

	public List<Book> get() {
		// TODO Auto-generated method stub
		List b = (List)repo.findAll();
		return b;
	}

	public Book removeB(long isbn) {
		// TODO Auto-generated method stub
        Book b = repo.findById(isbn).orElseThrow(() -> new BookNotFoundException("Book with ISBN " + isbn + " not found"));
		if(b==null) {
			return null;
		}
		else {
			repo.delete(b);
		}
		return b;
		
	}

	public String updateB(long isbn, String nm) {
		// TODO Auto-generated method stub
        Book b = repo.findById(isbn).orElseThrow(() -> new BookNotFoundException("Book with ISBN " + isbn + " not found"));
		if(b==null) {
			return "Not Found";
		}
		else {
			b.setTitle(nm);
			repo.save(b);
			return "Name Updated";
		}
	}

	public String getBByID(long isbn) {
		// TODO Auto-generated method stub
        Book b = repo.findById(isbn).orElseThrow(() -> new BookNotFoundException("Book with ISBN " + isbn + " not found"));
		if(b==null) {
			return "Not Found";
		}
		else {
			return "Book Found";
		}
	}
	
}
