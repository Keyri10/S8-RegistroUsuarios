const API = 'http://localhost:3000/productos';

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  document.getElementById('form').addEventListener('submit', addProduct);
});

async function loadProducts() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    const tbody = document.querySelector('#productos tbody');
    tbody.innerHTML = '';
    data.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.id}</td>
        <td>${p.nombre}</td>
        <td>${Number(p.precio).toFixed(2)}</td>
        <td><button data-id="${p.id}" class="delete">Eliminar</button></td>
      `;
      tbody.appendChild(tr);
    });
    document.querySelectorAll('.delete').forEach(b => b.addEventListener('click', deleteProduct));
  } catch (err) {
    console.error(err);
    alert('Error cargando productos');
  }
}

async function addProduct(e) {
  e.preventDefault();
  const nombre = e.target.nombre.value.trim();
  const precio = e.target.precio.value;
  if (!nombre || precio === '') return alert('Ingrese nombre y precio');
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, precio })
    });
    if (!res.ok) {
      const err = await res.json();
      return alert(err.error || 'Error al crear');
    }
    e.target.reset();
    loadProducts();
  } catch (err) {
    console.error(err);
    alert('Error al hacer request');
  }
}

async function deleteProduct(e) {
  const id = e.target.dataset.id;
  if (!confirm('¿Eliminar producto?')) return;
  const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
  if (res.ok) loadProducts();
  else {
    const err = await res.json();
    alert(err.error || 'Error al eliminar');
  }
}
