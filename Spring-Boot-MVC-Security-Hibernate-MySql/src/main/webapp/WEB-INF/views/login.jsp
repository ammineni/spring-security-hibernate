<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<title>Login Form</title>
<style type="text/css">
.center {
   /*  margin-left: auto;
    margin-right: auto;
    width: 50%;
    background-color: #b0e0e6; */
}
</style>
</head>
<body>
	<%-- <center> --%>
	<div align="center">
		<h2>Login Here</h2>
		<div  style="text-align: center; padding: 30px; border: 1px solid green; width: 250px;">
			<form method="post"
				<%-- action="<c:url value='j_spring_security_check' />"> --%>
				action="<c:url value='login' />">

				<table>
					<tr>
						<td colspan="2" style="color: red">${message}</td>

					</tr>
					<tr>
						<td>User Name:</td>
						<td><input type="text" name="username" /></td>
					</tr>
					<tr>
						<td>Password:</td>
						<td><input type="password" name="password" /></td>
					</tr>
					<tr>
						<td> </td>
						<td><input type="submit" value="Login" /></td>

					</tr>
				</table>
			</form>
		</div>
	</div>
	<%-- </center> --%>
</body>
</html>
