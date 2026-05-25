const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  senderName: { type: String, required: true },
  senderRole: { type: String, default: 'employee' },
  receiverId: { type: String, required: true },
  receiverName: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  flagged: { type: Boolean, default: false },
  flagReason: { type: String, default: '' }
});

messageSchema.pre('save', function(next) {
  const urgentKeywords = ['urgent', 'down', 'broken', 'not working', 'complaint', 'angry', 'refund', 'cancel', 'outage', 'error', 'failed'];
  const text = this.text.toLowerCase();
  const isUrgent = urgentKeywords.some(k => text.includes(k));
  if (isUrgent) {
    this.flagged = true;
    this.flagReason = 'Contains urgent keyword';
  }
  next();
});

module.exports = mongoose.model('Message', messageSchema);
