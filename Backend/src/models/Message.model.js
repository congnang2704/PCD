import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: { type: String, enum: ['user','bot'], required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);
export default Message;
