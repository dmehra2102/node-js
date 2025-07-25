export function getList(addresses) {
  return `<!DOCTYPE html>
    <html>
      <head>
        <title>Address book</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <h1>Address book</h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>delete</th>
            <th>edit</th>
            </tr>
          </thead>
          <tbody>
            ${addresses.map(createRow).join("")}
          </tbody>
        </table>
        <a href="/new">create new data record</a>
      </body>
    </html>`;
}

function createRow(address) {
  return `<tr>
    <td>${address.id}</td>
    <td>${address.firstname}</td>
    <td>${address.lastname}</td>
    <td><a href="/delete/${address.id}">delete</a></td>
    <td><a href="/edit/${address.id}">edit</a></td>
  </tr>`;
}
