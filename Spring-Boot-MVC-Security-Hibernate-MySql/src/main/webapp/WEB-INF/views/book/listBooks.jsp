<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="../ImportTableSorterJS.jsp"%>
<!DOCTYPE html>
<html>
<head>
<title>List Of Books</title>

<link rel="stylesheet"
	href='<c:url value="/resources/css/pure-0.4.2.css"/>'>

<link rel="stylesheet"
	href='<c:url value="/resources/css/font-awesome-4.0.3/css/font-awesome.css"/>'>

<link rel="stylesheet"
	href='<c:url value="/resources/css/jquery-ui-1.10.4.custom.css"/>'>

<style type="text/css">
th {
	text-align: left
}
</style>


</head>

<body id="pager-demo">
<%-- 
	<div id="banner">
		<h1>List Of<em>Books</em></h1>			
		<h4><a href="user" id="user">Go to Persons Page</a></h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<h4><a href="${logoutUrl}">Logout</a></h4>	
		<c:url value="/j_spring_security_logout" var="logoutUrl" />
	</div> --%>
	
	<div id="banner">
		<div>
			<h1>List Of<em>Books</em></h1>
		</div>
		<div>
			<h2><a href="persons" id="persons">Go to Persons Page</a></h2>
		</div>
		<div>
			<%-- <c:url value="/j_spring_security_logout" var="logoutUrl" /> --%>
			<%-- <h3><a href="${logoutUrl}">Logout</a></h3> --%>/logout
			<h3><a href="./logout">Logout</a></h3>
		</div>
	</div>
	<div id="main" style="width: 95%; margin: 0 auto;">

		<div id="bookDialog" style="display: none;">
			<%@ include file="bookForm.jsp"%>
		</div>

			
		<!-- <button type="button">Add Rows</button>  --><button type="button" class="toggle">Disable Pager</button> <button type="button">Destroy Pager</button>
		<br><br>
		
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
		

		<button class="pure-button pure-button-primary" onclick="addBook()">
			<i class="fa fa-plus"></i> Add Book
		</button>
		<br>
		<!-- <table class="pure-table pure-table-bordered pure-table-striped"> -->
		<table class="tablesorter">
			<thead>
				<tr>
					<th width="4%">S.N</th>
					<th width="12%">Name</th>
					<th width="12%">Code</th>
					<th width="12%">Price</th>
					<th width="12%">Authors</th>
					<th width="12%">ISBN</th>
					<th width="12%">Publisher</th>
					<th width="12%">Published On</th>
					<th width="12%"></th>					
				</tr>
			</thead>
			<tfoot>
				<tr>
					<th width="4%">S.N</th>
					<th width="12%">Name</th>
					<th width="12%">Code</th>
					<th width="12%">Price</th>
					<th width="12%">Authors</th>
					<th width="12%">ISBN</th>
					<th width="12%">Publisher</th>
					<th width="12%">Published On</th>
					<th width="12%"></th>					
				</tr>
			</tfoot>
			<tbody>
				<c:forEach items="${bookList}" var="book" varStatus="loopCounter">
					<tr>
						<td><c:out value="${loopCounter.count}" /></td>
						<td><c:out value="${book.name}" /></td>
						<td><c:out value="${book.code}" /></td>
						<td><c:out value="${book.price}" /></td>
						<td><c:out value="${book.authors}" /></td>
						<td><c:out value="${book.isbn}" /></td>
						<td><c:out value="${book.publisher}" /></td>
						<td><c:out value="${book.publishedOn}" /></td>

						<td><nobr>
								<button class="pure-button pure-button-primary"
									onclick="editBook(${book.id});">

									<i class="fa fa-pencil"></i> Edit
								</button>

								<a class="pure-button pure-button-primary"
									onclick="return confirm('Are you sure you want to delete this book?');"
									href="delete/${book.id}"> <i class="fa fa-times"></i>Delete
								</a>

							</nobr></td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
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
</body>
</html>