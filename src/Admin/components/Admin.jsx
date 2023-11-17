export default function Admin() {
    const handleLogout = () => {
        fetch('http://localhost:3001/logout', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': '*', 
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
           window.location.reload();
        })
        .catch(error => {
        });
    }

    return (
        <div>
            <button onClick={handleLogout}>Cerrar sesión</button>
            <h1>Admin</h1>
        </div>
    )
}