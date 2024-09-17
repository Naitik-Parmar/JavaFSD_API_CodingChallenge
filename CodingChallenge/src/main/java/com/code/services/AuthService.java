package com.code.services;

import com.code.dto.SignupRequest;
import com.code.Entity.User;
import com.code.dto.UserDTO;



public interface AuthService {
	
	UserDTO createUser(SignupRequest signupRequest);
	
	boolean hasCustomerWithEmail(String Email);

}
