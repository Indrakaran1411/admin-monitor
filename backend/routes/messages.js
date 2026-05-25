const router = require('express').Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');

router.get('/all', auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 }).limit(500);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/scan', auth, async (req, res) => {
  try {
    const { date, startDate, endDate } = req.query;
    let query = {};
    
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      query.timestamp = { $gte: start, $lte: end };
    } else if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        query.timestamp.$gte = start;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.timestamp.$lte = end;
      }
    }
    
    const messages = await Message.find(query).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/employee/:id', auth, async (req, res) => {
  try {
    const messages = await Message.find({ senderId: req.params.id }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/conversation/:empId/:clientId', auth, async (req, res) => {
  try {
    const msgs = await Message.find({
      $or: [
        { senderId: req.params.empId, receiverId: req.params.clientId },
        { senderId: req.params.clientId, receiverId: req.params.empId }
      ]
    }).sort({ timestamp: 1 });
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/flagged', auth, async (req, res) => {
  try {
    const msgs = await Message.find({ flagged: true }).sort({ timestamp: -1 });
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/summary/:empId', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const msgs = await Message.find({ senderId: req.params.empId, timestamp: { $gte: today } });
    const clients = [...new Set(msgs.map(m => m.receiverName))];
    const flagged = msgs.filter(m => m.flagged).length;
    const keywords = ['deal', 'discount', 'proposal', 'urgent', 'complaint', 'schedule', 'follow', 'agreement'];
    const topics = keywords.filter(k => msgs.some(m => m.text.toLowerCase().includes(k)));
    res.json({ totalMessages: msgs.length, clients, flaggedCount: flagged, topics, messages: msgs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
