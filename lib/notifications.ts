const notifications = [
  "You have 8 new likes on your recent post! 👍",
  "New message from Sarah: 'Hey, how are you?' 💬",
  "Someone tagged you in a photo 📸",
  "Your story was viewed by 45 people 👀",
  "New friend request from John Smith ✨",
  "Your post was shared 5 times 🔄",
  "You have a new WhatsApp message 📱",
  "3 people commented on your photo 💭",
  "Your video reached 1000 views! 🎉",
  "New match on your dating profile 💝"
];

export const getRandomNotification = () => {
  return notifications[Math.floor(Math.random() * notifications.length)];
};