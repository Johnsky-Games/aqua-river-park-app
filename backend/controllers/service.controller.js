// 📁 backend/controllers/service.controller.js

import db from '../config/db.js';

// ✅ Obtener todos los servicios
export const getAllServices = async (req, res) => {
    try {
        const [services] = await db.query('SELECT * FROM services');
        res.json(services);
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        res.status(500).json({ message: 'Error al obtener servicios' });
    }
};

// ✅ Obtener un servicio por ID
export const getServiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const [service] = await db.query('SELECT * FROM services WHERE id = ?', [id]);
        if (service.length === 0) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json(service[0]);
    } catch (error) {
        console.error('Error al obtener el servicio:', error);
        res.status(500).json({ message: 'Error al obtener el servicio' });
    }
};

// ✅ Crear un nuevo servicio
export const createService = async (req, res) => {
    const { title, description, price, duration, image_url, type } = req.body;
    try {
        await db.query(
            'INSERT INTO services (title, description, price, duration, image_url, type) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, price, duration, image_url, type]
        );
        res.status(201).json({ message: 'Servicio creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el servicio:', error);
        res.status(500).json({ message: 'Error al crear el servicio' });
    }
};

// ✅ Actualizar un servicio
export const updateService = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, duration, image_url, type } = req.body;
    try {
        await db.query(
            'UPDATE services SET title = ?, description = ?, price = ?, duration = ?, image_url = ?, type = ? WHERE id = ?',
            [title, description, price, duration, image_url, type, id]
        );
        res.json({ message: 'Servicio actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el servicio:', error);
        res.status(500).json({ message: 'Error al actualizar el servicio' });
    }
};

// ✅ Eliminar un servicio
export const deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM services WHERE id = ?', [id]);
        res.json({ message: 'Servicio eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el servicio:', error);
        res.status(500).json({ message: 'Error al eliminar el servicio' });
    }
};
