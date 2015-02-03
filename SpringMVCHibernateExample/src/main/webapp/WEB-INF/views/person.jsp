<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ page session="false"%>
<%@ include file="ImportTableSorterJS.jsp"%>
<html>
<head>
<title>Person Page</title>
</head>
<body  id="pager-demo">
	<h1>Add a Person</h1>

	<c:url var="addAction" value="/person/add"></c:url>

	<form:form action="${addAction}" commandName="person">
		<table>
			<c:if test="${!empty person.name}">
				<tr>
					<td><form:label path="id">
							<spring:message text="ID" />
						</form:label></td>
					<td><form:input path="id" readonly="true" size="8"
							disabled="true" /> <form:hidden path="id" /></td>
				</tr>
			</c:if>
			<tr>
				<td><form:label path="name">
						<spring:message text="Name" />
					</form:label></td>
				<td><form:input path="name" /></td>
			</tr>
			<tr>
				<td><form:label path="country">
						<spring:message text="Country" />
					</form:label></td>
				<td><form:input path="country" /></td>
			</tr>
			<tr>
				<td colspan="2"><c:if test="${!empty person.name}">
						<input type="submit" value="<spring:message text="Edit Person"/>" />
					</c:if> <c:if test="${empty person.name}">
						<input type="submit" value="<spring:message text="Add Person"/>" />
					</c:if></td>
			</tr>
		</table>
	</form:form>
	<br>
	<h3>Persons List</h3>
	<div id="main">
	<div class="pager">
			Page: <select class="gotoPage"></select>
			<img src="./resources/tablesorter/images/first.png" class="first" alt="First" title="First page" />
			<img src="./resources/tablesorter/images/prev.png" class="prev" alt="Prev" title="Previous page" />
			<span class="pagedisplay"></span> <!-- this can be any element, including an input -->
			<img src="./resources/tablesorter/images/next.png" class="next" alt="Next" title="Next page" />
			<img src="./resources/tablesorter/images/last.png" class="last" alt="Last" title= "Last page" />
			<select class="pagesize">
				<option value="10">10</option>
				<option value="20">20</option>
				<option value="30">30</option>
				<option value="40">40</option>
			</select>
	</div>
	<c:if test="${!empty listPersons}">
		<table class="tablesorter">
			<thead>
				<tr>
					<th width="80">Person ID</th>
					<th width="120">Person Name</th>
					<th width="120">Person Country</th>
					<th width="60">Edit</th>
					<th width="60">Delete</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<th width="80">Person ID</th>
					<th width="120">Person Name</th>
					<th width="120">Person Country</th>
					<th width="60">Edit</th>
					<th width="60">Delete</th>
				</tr>
			</tfoot>
			<c:forEach items="${listPersons}" var="person">
				<tr>
					<td>${person.id}</td>
					<td>${person.name}</td>
					<td>${person.country}</td>
					<td><a href="<c:url value='/edit/${person.id}' />">Edit</a></td>
					<td><a href="<c:url value='/remove/${person.id}' />">Delete</a></td>
				</tr>
			</c:forEach>
		</table>
	</c:if>
	
	<div class="pager">
			Page: <select class="gotoPage"></select>
			<img src="./resources/tablesorter/images/first.png" class="first" alt="First" title="First page" />
			<img src="./resources/tablesorter/images/prev.png" class="prev" alt="Prev" title="Previous page" />
			<span class="pagedisplay"></span> <!-- this can be any element, including an input -->
			<img src="./resources/tablesorter/images/next.png" class="next" alt="Next" title="Next page" />
			<img src="./resources/tablesorter/images/last.png" class="last" alt="Last" title= "Last page" />
			<select class="pagesize">
				<option value="10">10</option>
				<option value="20">20</option>
				<option value="30">30</option>
				<option value="40">40</option>
			</select>
	</div>
	</div>
	<c:url value="/j_spring_security_logout" var="logoutUrl" />
	<h3>
		<a href="${logoutUrl}">Logout</a>
	</h3>		
	<div class="inline">
		<a href="listBooks" id="bookList">Go to Book List</a>
	</div>
</body>
</html>
