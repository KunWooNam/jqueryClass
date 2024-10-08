package com.yedam.app;

import java.io.IOException;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class RestServlet
 */
@WebServlet("/JSONServlet")
public class JSONServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json"); //response(.getWriter)의 데이터 형식과 동일하게
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.getWriter().append("{\"userid\":\"scott\",\"username\":\"king\"}");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/plain");
		response.setHeader("Access-Control-Allow-Origin", "*");
		String requestData = request.getReader().lines().collect(Collectors.joining());
		System.out.println(requestData);
		response.getWriter().append("response:").append(requestData);
	}

}
