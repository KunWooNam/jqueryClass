package com.yedam.app;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class RestServlet
 */
@WebServlet("/MethodServlet")
public class MethodServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String userid = request.getParameter("userid");
		response.setContentType("text/plain");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.getWriter().append("response:").append(userid);
	}

	//client (form-data) -> multipart 설정 필요
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String postid = request.getParameter("postid");
		response.setContentType("text/plain");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.getWriter().append("response:").append(postid);
	}

}
