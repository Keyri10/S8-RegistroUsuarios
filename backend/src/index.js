const fastify = require('fastify')({ logger: true });
require('dotenv').config();
const pool = require('./db');

fastify.register(require('@fastify/cors'), { origin: true });

// POST /productos
fastify.post('/productos', async (req, reply) => {
  const { nombre, precio } = req.body || {};
  if (!nombre || precio === undefined) {
    return reply.code(400).send({ error: 'Faltan datos (nombre, precio)' });
  }
  const res = await pool.query(
    'INSERT INTO productos(nombre, precio) VALUES($1, $2) RETURNING *',
    [nombre, precio]
  );
  return reply.code(201).send(res.rows[0]);
});

// GET /productos
fastify.get('/productos', async () => {
  const res = await pool.query('SELECT * FROM productos ORDER BY id');
  return res.rows;
});

// DELETE /productos/:id
fastify.delete('/productos/:id', async (req, reply) => {
  const { id } = req.params;
  const res = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
  if (res.rowCount === 0) return reply.code(404).send({ error: 'No encontrado' });
  return { deleted: res.rows[0] };
});

const start = async () => {
  try {
    const port = process.env.BACKEND_PORT ? Number(process.env.BACKEND_PORT) : 3000;
    await fastify.listen({ port, host: '0.0.0.0' });
    fastify.log.info(`Servidor en http://0.0.0.0:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
