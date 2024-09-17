package com.code.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.code.Entity.Book;

@Repository
public interface BookRepo extends JpaRepository<Book, Long>{	
	
}
