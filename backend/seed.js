require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Message = require('./models/Message');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await User.deleteMany({});
  await Message.deleteMany({});
  console.log('Cleared existing users and messages');

  const adminPass = await bcrypt.hash('admin123', 10);
  const empPass = await bcrypt.hash('emp123', 10);

  // Create Users
  const users = await User.insertMany([
    { name: 'Admin User', email: 'admin@company.com', password: adminPass, role: 'admin', department: 'Management' },
    { name: 'Karan Mehta', email: 'karan@company.com', password: empPass, role: 'employee', department: 'Sales' },
    { name: 'Priya Sharma', email: 'priya@company.com', password: empPass, role: 'employee', department: 'Accounts' },
    { name: 'Arjun Das', email: 'arjun@company.com', password: empPass, role: 'employee', department: 'Support' },
  ]);

  const karan = users.find(u => u.email === 'karan@company.com');
  const priya = users.find(u => u.email === 'priya@company.com');
  const arjun = users.find(u => u.email === 'arjun@company.com');

  // Generate dynamic relative dates
  const today = new Date();
  
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(today.getDate() - 2);

  // helper to adjust timestamp hours
  const setTime = (baseDate, hours, minutes) => {
    const d = new Date(baseDate);
    d.setHours(hours, minutes, 0, 0);
    return d;
  };

  const seedMessages = [
    // --- TODAY'S MESSAGES (Sales / Deals) ---
    {
      senderId: karan._id.toString(),
      senderName: karan.name,
      senderRole: karan.role,
      receiverId: 'client-1',
      receiverName: 'Rahul - TechCorp',
      text: 'Hello Rahul, I hope you are having a great week! Let me know if you checked the proposal.',
      timestamp: setTime(today, 10, 15)
    },
    {
      senderId: 'client-1',
      senderName: 'Rahul - TechCorp',
      senderRole: 'client',
      receiverId: karan._id.toString(),
      receiverName: karan.name,
      text: 'Yes Karan, I did review the Enterprise tier pricing. It looks a bit high for our current budget.',
      timestamp: setTime(today, 10, 22)
    },
    {
      senderId: karan._id.toString(),
      senderName: karan.name,
      senderRole: karan.role,
      receiverId: 'client-1',
      receiverName: 'Rahul - TechCorp',
      text: 'Understood. We can offer a special 15% discount if we proceed with a 2-year contract. Would that work for you?',
      timestamp: setTime(today, 10, 30)
    },
    {
      senderId: 'client-1',
      senderName: 'Rahul - TechCorp',
      senderRole: 'client',
      receiverId: karan._id.toString(),
      receiverName: karan.name,
      text: 'That sounds very interesting. Let me discuss this proposal with our finance team and get back to you by tomorrow. Can we schedule a quick call to finalize?',
      timestamp: setTime(today, 11, 0)
    },
    {
      senderId: karan._id.toString(),
      senderName: karan.name,
      senderRole: karan.role,
      receiverId: 'client-1',
      receiverName: 'Rahul - TechCorp',
      text: 'Yes, absolutely! Let us schedule it for 2 PM tomorrow. I will send a calendar invite.',
      timestamp: setTime(today, 11, 05)
    },

    // --- YESTERDAY'S MESSAGES (Accounts / Billing / Flagged) ---
    {
      senderId: priya._id.toString(),
      senderName: priya.name,
      senderRole: priya.role,
      receiverId: 'client-2',
      receiverName: 'Sarah - BloomMedia',
      text: 'Hi Sarah, just wanted to check if you received our latest invoice for the monthly renewal.',
      timestamp: setTime(yesterday, 14, 0)
    },
    {
      senderId: 'client-2',
      senderName: 'Sarah - BloomMedia',
      senderRole: 'client',
      receiverId: priya._id.toString(),
      receiverName: priya.name,
      text: 'Actually, I saw a major issue with our billing. It seems you charged us twice for the premium service. The dashboard first said the transaction failed, but then we got two successful charges on our statement!',
      timestamp: setTime(yesterday, 14, 15)
    },
    {
      senderId: priya._id.toString(),
      senderName: priya.name,
      senderRole: priya.role,
      receiverId: 'client-2',
      receiverName: 'Sarah - BloomMedia',
      text: 'I am extremely sorry for this inconvenience, Sarah! Let me double check with our billing gateway immediately.',
      timestamp: setTime(yesterday, 14, 20)
    },
    {
      senderId: 'client-2',
      senderName: 'Sarah - BloomMedia',
      senderRole: 'client',
      receiverId: priya._id.toString(),
      receiverName: priya.name,
      text: 'Please cancel our auto-renewal until this is resolved. Our manager is very angry about this billing error and wants a refund.',
      timestamp: setTime(yesterday, 14, 35)
    },
    {
      senderId: priya._id.toString(),
      senderName: priya.name,
      senderRole: priya.role,
      receiverId: 'client-2',
      receiverName: 'Sarah - BloomMedia',
      text: 'I understand completely. I have verified the duplicate payment and initiated a full refund of the second $199 charge back to your card. I have also paused the auto-renewal as requested. The refund should reflect in 3-5 business days.',
      timestamp: setTime(yesterday, 14, 50)
    },
    {
      senderId: 'client-2',
      senderName: 'Sarah - BloomMedia',
      senderRole: 'client',
      receiverId: priya._id.toString(),
      receiverName: priya.name,
      text: 'Thank you Priya. Please email me the refund confirmation receipt once it goes through.',
      timestamp: setTime(yesterday, 15, 0)
    },

    // --- TWO DAYS AGO MESSAGES (Support / Outage / Flagged) ---
    {
      senderId: arjun._id.toString(),
      senderName: arjun.name,
      senderRole: arjun.role,
      receiverId: 'client-3',
      receiverName: 'Alex - GreenEnergy',
      text: 'Hi Alex, how can I help you today? I noticed you opened a critical ticket.',
      timestamp: setTime(twoDaysAgo, 9, 30)
    },
    {
      senderId: 'client-3',
      senderName: 'Alex - GreenEnergy',
      senderRole: 'client',
      receiverId: arjun._id.toString(),
      receiverName: arjun.name,
      text: 'Hi Arjun, our admin dashboard is completely down! The API returns a 500 server error and it is not working at all. We have an outage, which is highly urgent since our operations are stalled!',
      timestamp: setTime(twoDaysAgo, 9, 35)
    },
    {
      senderId: arjun._id.toString(),
      senderName: arjun.name,
      senderRole: arjun.role,
      receiverId: 'client-3',
      receiverName: 'Alex - GreenEnergy',
      text: 'Oh no! I am incredibly sorry to hear that. I am flagging this to our core engineering team as we speak. Let me check the health status of your server node.',
      timestamp: setTime(twoDaysAgo, 9, 40)
    },
    {
      senderId: 'client-3',
      senderName: 'Alex - GreenEnergy',
      senderRole: 'client',
      receiverId: arjun._id.toString(),
      receiverName: arjun.name,
      text: 'Please tell them to hurry. The system is completely broken and we are losing customers. The page shows a timed out connection.',
      timestamp: setTime(twoDaysAgo, 9, 52)
    },
    {
      senderId: arjun._id.toString(),
      senderName: arjun.name,
      senderRole: arjun.role,
      receiverId: 'client-3',
      receiverName: 'Alex - GreenEnergy',
      text: 'Great news, Alex. The engineers identified a locked database connection on your node. They have cleared it and restarted the service. Everything is fully functional now. Can you please check if it works on your end?',
      timestamp: setTime(twoDaysAgo, 10, 10)
    },
    {
      senderId: 'client-3',
      senderName: 'Alex - GreenEnergy',
      senderRole: 'client',
      receiverId: arjun._id.toString(),
      receiverName: arjun.name,
      text: 'Excellent! Yes, I just logged in and it is working perfectly now. Thank you for resolving this so quickly, Arjun!',
      timestamp: setTime(twoDaysAgo, 10, 15)
    }
  ];

  // We save messages sequentially so pre/post save hooks trigger properly
  for (const msgData of seedMessages) {
    await Message.create(msgData);
  }
  console.log('Successfully seeded historical messages!');

  console.log('\nAccounts created:');
  console.log('ADMIN  → admin@company.com / admin123');
  console.log('EMPLOYEE → karan@company.com / emp123');
  console.log('EMPLOYEE → priya@company.com / emp123');
  console.log('EMPLOYEE → arjun@company.com / emp123');
  await mongoose.disconnect();
}

seed().catch(console.error);
