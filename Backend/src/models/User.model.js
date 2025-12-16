import mongoose from 'mongoose';

const { Schema, models, model } = mongoose;

const UserSchema = new Schema(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    avatar:   { type: String, default: '' },
    role_id:  { type: Schema.Types.ObjectId, ref: 'Role', required: true } // ← khớp Role.model
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default models.User || model('User', UserSchema);
