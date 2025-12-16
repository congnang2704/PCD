// src/models/Role.model.js
import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

// Model name = 'Role' (khớp với ref: 'Role'), collection = 'roles'
const Role = mongoose.models.Role || mongoose.model('Role', roleSchema, 'roles');
export default Role;
