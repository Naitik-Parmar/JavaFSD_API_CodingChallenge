package com.code.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;

@Entity
public class Book {

	@Id
	@GeneratedValue
	private long isbn;
	
	@NotEmpty(message = "Title is mandatory")
	private String title;
	
	
	private String author;
	
	@Min(value = 1850, message = "Publication year should be no earlier than 1750")
	private int publicationYear;

	public long getIsbn() {
		return isbn;
	}

	public void setIsbn(long isbn) {
		this.isbn = isbn;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public int getPublicationYear() {
		return publicationYear;
	}

	public void setPublicationYear(int publicationYear) {
		this.publicationYear = publicationYear;
	}

	@Override
	public String toString() {
		return "Book [isbn=" + isbn + ", title=" + title + ", author=" + author + ", publicationYear=" + publicationYear
				+ "]";
	}

	public Book(long isbn, @NotEmpty(message = "Title is mandatory") String title, String author,
			@Min(value = 1850, message = "Publication year should be no earlier than 1750") int publicationYear) {
		super();
		this.isbn = isbn;
		this.title = title;
		this.author = author;
		this.publicationYear = publicationYear;
	}

	public Book() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
